/** The row of actions above the report: its time frame, the saved reports, its schedule, the text and the export. */

import { downloadsOf } from '../builder/service/widget-specs.js';
import { h, onChange, replaceChildren } from '../dom.js';
import '../kit/inputs.js';
import { generateText } from '../model/ai.js';
import { exportFileName } from '../model/exports.js';
import { plural } from '../model/format.js';
import { PERIODS } from '../model/periods.js';
import { describeSchedule } from '../model/schedule.js';
import {
  approveAllBlocks, countApproved, countDrafts, finishGenerating, loadReport, newReport, removeAllBlocks,
  setInstructions, setPeriod, startGenerating,
} from '../state.js';
import { ask } from './dialog.js';
import { mockExport } from './export.js';
import { openInstructions } from './instructions.js';
import { openSchedule } from './schedule.js';
import { showToast } from './toast.js';

/** How long the "AI" takes at least to write the text; the text itself is made from templates. */
const WRITING_MS = 1400;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const periodLabel = id => PERIODS.find(period => period.id === id).label;

/** The menu of the time frames, with a tick at the one of the report. */
function periodItems(store) {
  const { periodId } = store.get();
  return PERIODS.map(period => ({
    text: period.label,
    checked: period.id === periodId,
    onSelect: () => store.update(state => setPeriod(state, period.id)),
  }));
}

/** The menu of the saved reports: a new report, and the saved ones, with a tick at the one that is open. */
function savedItems(store) {
  const state = store.get();
  const open = state.name.trim();
  return [
    { text: 'New report', onSelect: () => store.update(newReport) },
    ...(state.saved.length > 0 ? [{ component: 'hr' }] : []),
    ...state.saved.map(report => ({
      text: report.name,
      checked: report.name === open,
      onSelect: () => {
        store.update(current => loadReport(current, report.id));
        showToast(`Opened “${report.name}”`);
      },
    })),
  ];
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
    showToast('The text could not be written. Try again.', { tone: 'error' });
  }
}

async function exportPdf(store) {
  const drafts = countDrafts(store.get().ai);
  if (drafts > 0) {
    const choice = await ask({
      title: 'Some generated text is not approved',
      text: `${plural(drafts, 'text block')} still ${drafts === 1 ? 'waits' : 'wait'} for your approval. `
        + 'Text that is not approved cannot go into the report.',
      confirm: 'Approve all and export',
      reject: 'Export without it',
    });
    if (choice === 'confirm') store.update(approveAllBlocks);
    else if (choice !== 'reject') return;
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

/** The menu of the export; an item that cannot be used says in its text what it needs. */
function exportItems(store) {
  const { widgets } = store.get().template;
  const kinds = new Set(widgets.flatMap(widget => downloadsOf(widget.widgetTypeId)));
  const empty = widgets.length === 0;
  return [
    {
      text: empty ? 'PDF report (add a widget first)' : 'PDF report',
      disabled: empty,
      onSelect: () => exportPdf(store),
    },
    {
      text: kinds.has('csv') ? 'CSV data' : 'CSV data (needs a table widget)',
      disabled: !kinds.has('csv'),
      onSelect: () => exportFiles(store, 'csv'),
    },
    {
      text: kinds.has('png') ? 'PNG images' : 'PNG images (needs a line chart, bar chart or gauge)',
      disabled: !kinds.has('png'),
      onSelect: () => exportFiles(store, 'png'),
    },
  ];
}

/** A button that opens a menu, as OpenRemote's menu bar does. The item that is chosen runs its onSelect. */
function menuButton(title) {
  const bar = h('or-vaadin-menu-bar', { theme: 'dropdown-indicators', title });
  bar.addEventListener('item-selected', event => event.detail.value.onSelect?.());
  return {
    bar,
    show: (label, items) => { bar.items = [{ text: label, children: items }]; },
  };
}

export function mountToolbar(root, store) {
  const periodMenu = menuButton('Time frame of the report');
  const savedMenu = menuButton('Reports that were saved');
  const exportMenu = menuButton('Download the report');
  // A disabled button does not react to the pointer, so its explanation is the title of the element around it
  const scheduleButton = h('or-vaadin-button', { onclick: () => openSchedule(store) });
  const scheduleTip = h('span', { class: 'tip' }, scheduleButton);
  const generateButton = h('or-vaadin-button', {
    onclick: () => openInstructions(store, input => generate(store, input)),
  });
  const generateTip = h('span', { class: 'tip' }, generateButton);
  replaceChildren(root, periodMenu.bar, savedMenu.bar, scheduleTip, generateTip, exportMenu.bar);

  // The menus are made again only when what they show changes, not at every letter typed in the name
  const drawPeriod = onChange(state => state.periodId, state => periodMenu.show(periodLabel(state.periodId),
    periodItems(store)));
  const savedKey = state => `${state.saved.map(report => `${report.id}:${report.name}`)}#${
    state.saved.find(report => report.name === state.name.trim())?.id}`;
  const drawSaved = onChange(savedKey, () => savedMenu.show('Saved reports', savedItems(store)));
  const exportKey = state => state.template.widgets.map(widget => widget.widgetTypeId).join();
  const drawExport = onChange(exportKey, () => exportMenu.show('Export', exportItems(store)));

  const scheduleOf = state => (state.schedule?.enabled ? describeSchedule(state.schedule) : '');
  const buttonsKey = state => `${state.ai?.status}|${state.template.widgets.length === 0}|${scheduleOf(state)}`;
  const drawButtons = onChange(buttonsKey, state => {
    const status = state.ai?.status;
    const empty = state.template.widgets.length === 0;
    const scheduled = scheduleOf(state);
    scheduleButton.disabled = empty;
    scheduleButton.setAttribute('theme', scheduled ? 'success' : '');
    scheduleButton.textContent = scheduled ? 'Scheduled' : 'Schedule';
    scheduleTip.title = empty ? 'Add at least one widget first' : scheduled || 'Send this report automatically';
    generateButton.disabled = empty || status === 'loading';
    generateButton.textContent = status === 'loading'
      ? 'Writing text…'
      : status === 'ready' ? 'Regenerate text' : 'Generate text';
    generateTip.title = empty
      ? 'Add at least one widget first'
      : 'Tell the AI what this report shows and what to look out for';
  });

  function render(state) {
    drawPeriod(state);
    drawSaved(state);
    drawExport(state);
    drawButtons(state);
  }

  render(store.get());
  store.subscribe(render);
}
