/** The bar above the report: its name, editing or previewing, the time frame, saved reports, text and export. */

import { downloadsOf } from '../builder/service/widget-specs.js';
import { h, onChange, replaceChildren } from '../dom.js';
import { generateText } from '../model/ai.js';
import { exportFileName } from '../model/exports.js';
import { plural } from '../model/format.js';
import { PERIODS } from '../model/periods.js';
import { describeSchedule } from '../model/schedule.js';
import {
  approveAllBlocks, countApproved, countDrafts, finishGenerating, loadReport, newReport, removeAllBlocks, saveReport,
  setEditMode, setInstructions, setName, setPeriod, startGenerating,
} from '../state.js';
import { ask } from './dialog.js';
import { mockExport } from './export.js';
import { icon } from './icons.js';
import { openInstructions } from './instructions.js';
import { menuButton } from './menu.js';
import { openSchedule } from './schedule.js';
import { showToast } from './toast.js';

/** How long the "AI" takes at least to write the text; the text itself is made from templates. */
const WRITING_MS = 1400;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const periodLabel = id => PERIODS.find(period => period.id === id).label;

function savedItems(store) {
  const state = store.get();
  return [
    {
      label: 'New report',
      hint: 'Start from an empty page',
      icon: 'plus',
      onSelect: () => store.update(newReport),
    },
    ...state.saved.map(report => ({
      label: report.name,
      hint: [periodLabel(report.periodId), plural(report.template.widgets.length, 'widget'),
        report.schedule?.enabled && 'Scheduled'].filter(Boolean).join(' · '),
      icon: 'file-document-outline',
      checked: report.name === state.name.trim(),
      onSelect: () => {
        store.update(current => loadReport(current, report.id));
        showToast(`Opened “${report.name}”`);
      },
    })),
  ];
}

/** Saves the report under its name, which replaces a saved report with the same name. */
export function saveCurrent(store) {
  if (!store.get().template.widgets.length) return;
  const before = store.get().saved.length;
  store.update(saveReport);
  const state = store.get();
  const name = state.name.trim() || 'Untitled report';
  showToast(`${state.saved.length > before ? 'Saved' : 'Updated'} “${name}”`, { tone: 'success' });
}

/** Has the text written for the figures of the report, after the author instructed the AI; the author reviews it. */
async function generate(store, { instructions, report }) {
  store.update(state => startGenerating(setInstructions(state, instructions)));
  try {
    const text = generateText(report);
    await wait(WRITING_MS);
    store.update(state => finishGenerating(state, text));
  } catch (error) {
    console.error(error);
    store.update(removeAllBlocks);
    showToast('The text could not be written. Try again.', { tone: 'warning' });
  }
}

async function exportPdf(store) {
  const drafts = countDrafts(store.get().ai);
  if (drafts > 0) {
    const choice = await ask({
      title: 'Some generated text is not approved',
      text: `${plural(drafts, 'text block')} still ${drafts === 1 ? 'waits' : 'wait'} for your approval. `
        + 'Text that is not approved cannot go into the report.',
      actions: [
        { label: 'Cancel', value: 'cancel' },
        { label: 'Export without it', value: 'without' },
        { label: 'Approve all and export', value: 'approve', primary: true },
      ],
    });
    if (choice === 'approve') store.update(approveAllBlocks);
    else if (choice !== 'without') return;
  }
  const state = store.get();
  mockExport(exportFileName(state.name, state.asOf, 'pdf'),
    ` with ${plural(state.template.widgets.length, 'widget')} and `
    + `${plural(countApproved(state.ai), 'approved text block')}`);
}

function exportFiles(store, kind) {
  const state = store.get();
  const count = state.template.widgets.filter(widget => downloadsOf(widget.widgetTypeId).includes(kind)).length;
  const extension = count === 1 ? kind : 'zip';
  mockExport(exportFileName(state.name, state.asOf, extension, kind === 'png' ? 'charts' : 'data'),
    ` with ${plural(count, kind === 'png' ? 'image' : 'table')}`);
}

function exportItems(store) {
  const { widgets } = store.get().template;
  const kinds = new Set(widgets.flatMap(widget => downloadsOf(widget.widgetTypeId)));
  const empty = widgets.length === 0;
  return [
    {
      label: 'PDF report',
      hint: empty ? 'Add at least one widget' : 'The widgets and the approved text',
      icon: 'file-pdf-box',
      disabled: empty,
      onSelect: () => exportPdf(store),
    },
    {
      label: 'CSV data',
      hint: kinds.has('csv') ? 'The data of the table widgets' : 'Needs a table widget',
      icon: 'table-large',
      disabled: !kinds.has('csv'),
      onSelect: () => exportFiles(store, 'csv'),
    },
    {
      label: 'PNG images',
      hint: kinds.has('png') ? 'One image for each chart and gauge' : 'Needs a line chart, bar chart or gauge',
      icon: 'image-outline',
      disabled: !kinds.has('png'),
      onSelect: () => exportFiles(store, 'png'),
    },
  ];
}

export function mountToolbar(root, store) {
  const name = h('input', {
    type: 'text',
    class: 'name-input',
    maxlength: 80,
    placeholder: 'Report name',
    'aria-label': 'Report name',
    oninput: event => store.update(state => setName(state, event.target.value)),
  });
  const modes = [[true, 'Edit', 'pencil'], [false, 'Preview', 'eye-outline']].map(([editMode, label, iconName]) =>
    h('button', {
      type: 'button',
      class: 'segment',
      'aria-pressed': 'false',
      onclick: () => store.update(state => setEditMode(state, editMode)),
    }, icon(iconName, 16), label));
  const period = h('select', {
    class: 'select period-select',
    'aria-label': 'Time frame',
    title: 'Time frame of the report',
    onchange: event => store.update(state => setPeriod(state, event.target.value)),
  }, PERIODS.map(item => h('option', { value: item.id }, item.label)));
  const saveButton = h('button', { type: 'button', class: 'btn', onclick: () => saveCurrent(store) },
    icon('content-save-outline'), 'Save');
  const scheduleButton = h('button', { type: 'button', class: 'btn', onclick: () => openSchedule(store) });
  const generateButton = h('button', {
    type: 'button',
    class: 'btn primary',
    onclick: () => openInstructions(store, input => generate(store, input)),
  });
  replaceChildren(root,
    name,
    h('div', { class: 'toolbar-actions' },
      h('div', { class: 'segmented', role: 'group', 'aria-label': 'Mode' }, modes),
      period,
      menuButton({ label: 'Saved reports', iconName: 'folder-outline', items: () => savedItems(store) }),
      saveButton,
      scheduleButton,
      h('div', { class: 'toolbar-group' },
        h('span', { class: 'divider', 'aria-hidden': 'true' }),
        generateButton,
        menuButton({ label: 'Export', iconName: 'download', items: () => exportItems(store) }))));

  const scheduleOf = state => (state.schedule?.enabled ? describeSchedule(state.schedule) : '');
  const buttonsKey = state => `${state.ai?.status}|${state.template.widgets.length === 0}|${scheduleOf(state)}`;
  const drawButtons = onChange(buttonsKey, state => {
    const status = state.ai?.status;
    const empty = state.template.widgets.length === 0;
    const scheduled = scheduleOf(state);
    saveButton.disabled = empty;
    scheduleButton.disabled = empty;
    scheduleButton.title = empty ? 'Add at least one widget first' : scheduled || 'Send this report automatically';
    scheduleButton.classList.toggle('scheduled', Boolean(scheduled));
    replaceChildren(scheduleButton, icon('calendar-clock'), scheduled ? 'Scheduled' : 'Schedule');
    generateButton.disabled = empty || status === 'loading';
    generateButton.title = empty
      ? 'Add at least one widget first'
      : 'Tell the AI what this report shows and what to look out for';
    generateButton.classList.toggle('busy', status === 'loading');
    replaceChildren(generateButton, icon('creation'),
      status === 'loading' ? 'Writing text…' : status === 'ready' ? 'Regenerate text' : 'Generate text');
  });

  function render(state) {
    if (name.value !== state.name) name.value = state.name;
    period.value = state.periodId;
    modes.forEach((button, index) => button.setAttribute('aria-pressed', String(state.editMode === (index === 0))));
    drawButtons(state);
  }

  render(store.get());
  store.subscribe(render);
}
