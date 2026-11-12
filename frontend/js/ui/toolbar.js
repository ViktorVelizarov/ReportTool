/** The bar above the report: its name, editing or previewing, the time frame, saved reports, text and export. */

import { downloadsOf } from '../builder/service/widget-specs.js';
import { ReportContext } from '../data/report-context.js';
import { h, onChange, replaceChildren } from '../dom.js';
import '../kit/inputs.js';
import { generateText } from '../model/ai.js';
import { exportFileName, pdfRequest } from '../model/exports.js';
import { plural } from '../model/format.js';
import { PERIODS } from '../model/periods.js';
import { describeSchedule } from '../model/schedule.js';
import {
  approveAllBlocks, countApproved, countDrafts, finishGenerating, removeAllBlocks, setEditMode, setInstructions,
  setName, setPeriod, startGenerating,
} from '../state.js';
import { ask } from './dialog.js';
import { downloadPdf, mockExport } from './export.js';
import { icon } from './icons.js';
import { openInstructions } from './instructions.js';
import { previewWidth } from './paper.js';
import { chooseSavedReport, saveCurrent, savedReportItems } from './saved-reports.js';
import { openSchedule } from './schedule.js';
import { showToast } from './toast.js';

/** How long the "AI" takes at least to write the text; the text itself is made from templates. */
const WRITING_MS = 1400;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

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

/** Whether the service is making a PDF, which the page asks for one at a time. */
let makingPdf = false;

/** Exports the report as a PDF; changed() is called when the service starts and when it stops making it. */
async function exportPdf(store, changed) {
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
  makingPdf = true;
  changed();
  try {
    await downloadPdf(exportFileName(state.name, state.asOf, 'pdf'),
      pdfRequest(state, ReportContext.realm, previewWidth()),
      ` with ${plural(state.template.widgets.length, 'widget')} and `
      + `${plural(countApproved(state.ai), 'approved text block')}`);
  } finally {
    makingPdf = false;
    changed();
  }
}

function exportFiles(store, kind) {
  const state = store.get();
  const count = state.template.widgets.filter(widget => downloadsOf(widget.widgetTypeId).includes(kind)).length;
  const extension = count === 1 ? kind : 'zip';
  mockExport(exportFileName(state.name, state.asOf, extension, kind === 'png' ? 'charts' : 'data'),
    ` with ${plural(count, kind === 'png' ? 'image' : 'table')}`);
}

/** The list of the export; an item that cannot be used says in its text what it needs. */
function exportItems(store, changed) {
  const { widgets } = store.get().template;
  const kinds = new Set(widgets.flatMap(widget => downloadsOf(widget.widgetTypeId)));
  const empty = widgets.length === 0;
  return [
    {
      text: empty ? 'PDF report (add a widget first)' : makingPdf ? 'PDF report (being made…)' : 'PDF report',
      disabled: empty || makingPdf,
      onSelect: () => exportPdf(store, changed),
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

/** A button that opens a list, as the menu bar of OpenRemote's library does. The item that is chosen runs its onSelect. */
function libraryMenu(title) {
  const bar = h('or-vaadin-menu-bar', { theme: 'dropdown-indicators', title });
  bar.addEventListener('item-selected', event => event.detail.value.onSelect?.());
  return { bar, show: (text, items) => { bar.items = [{ text, children: items }]; } };
}

/**
 * A button of OpenRemote's library, with the explanation as the title of a span around it: a disabled button does not
 * react to the pointer, so it cannot show a title itself.
 */
function libraryButton(props) {
  const button = h('or-vaadin-button', props);
  return { button, tip: h('span', { class: 'tip' }, button) };
}

/** moment() gives the moment that a saved report is made for when it is opened. */
export function mountToolbar(root, store, moment) {
  // The field of OpenRemote's library, as the name of an asset is edited in the manager: the label above a filled field
  const name = h('or-vaadin-text-field', {
    class: 'name-field',
    label: 'Report name',
    maxlength: 80,
    oninput: event => store.update(state => setName(state, event.target.value)),
  });
  // One button for the other mode, as the manager's asset header has one for modify and view
  const modeButton = h('or-vaadin-button', { onclick: () => store.update(state => setEditMode(state, !state.editMode)) });
  const periodSelect = h('or-vaadin-select', {
    class: 'toolbar-select',
    label: 'Time frame',
    title: 'Time frame of the report',
    onchange: event => store.update(state => setPeriod(state, event.target.value)),
  });
  periodSelect.items = PERIODS.map(period => ({ label: period.label, value: period.id }));
  const savedSelect = h('or-vaadin-select', {
    class: 'toolbar-select',
    label: 'Saved reports',
    placeholder: 'Open a saved report',
  });
  const saveButton = h('or-vaadin-button', { onclick: () => saveCurrent(store) },
    icon('content-save-outline', 18, 'prefix'), 'Save');
  const { button: scheduleButton, tip: scheduleTip } = libraryButton({ onclick: () => openSchedule(store) });
  const { button: generateButton, tip: generateTip } = libraryButton({
    theme: 'primary',
    onclick: () => openInstructions(store, input => generate(store, input)),
  });
  const exportMenu = libraryMenu('Download the report');
  replaceChildren(root,
    name,
    h('div', { class: 'toolbar-actions' },
      modeButton, periodSelect, savedSelect, saveButton, scheduleTip, generateTip, exportMenu.bar));

  // The select of the saved reports shows the saved report that is open; what is chosen is done, and then it shows
  // again what is open, also when nothing could be done
  const showSaved = state => {
    savedSelect.items = savedReportItems(state.saved);
    savedSelect.value = state.reportId ?? '';
  };
  savedSelect.addEventListener('change', async () => {
    await chooseSavedReport(store, savedSelect.value, moment);
    showSaved(store.get());
  });

  // The lists are made again only when what they show changes, not at every letter typed in the name
  const savedKey = state => `${state.saved?.map(report => `${report.id}:${report.name}`)}#${state.reportId}`;
  const drawSaved = onChange(savedKey, showSaved);
  const exportKey = state => state.template.widgets.map(widget => widget.widgetTypeId).join();
  const showExport = () => exportMenu.show('Export', exportItems(store, showExport));
  const drawExport = onChange(exportKey, showExport);

  const scheduleOf = state => (state.schedule?.enabled ? describeSchedule(state.schedule) : '');
  const buttonsKey = state => `${state.ai?.status}|${state.template.widgets.length === 0}|${scheduleOf(state)}`;
  const drawButtons = onChange(buttonsKey, state => {
    const status = state.ai?.status;
    const empty = state.template.widgets.length === 0;
    const scheduled = scheduleOf(state);
    saveButton.disabled = empty;
    scheduleButton.disabled = empty;
    scheduleButton.setAttribute('theme', scheduled ? 'success' : '');
    scheduleTip.title = empty ? 'Add at least one widget first' : scheduled || 'Send this report automatically';
    replaceChildren(scheduleButton, icon('calendar-clock', 18, 'prefix'), scheduled ? 'Scheduled' : 'Schedule');
    generateButton.disabled = empty || status === 'loading';
    generateTip.title = empty
      ? 'Add at least one widget first'
      : 'Tell the AI what this report shows and what to look out for';
    generateButton.classList.toggle('busy', status === 'loading');
    replaceChildren(generateButton, icon('creation', 18, 'prefix'),
      status === 'loading' ? 'Writing text…' : status === 'ready' ? 'Regenerate text' : 'Generate text');
  });
  const drawMode = onChange(state => state.editMode, ({ editMode }) => {
    modeButton.setAttribute('theme', editMode ? 'primary contrast' : 'primary');
    replaceChildren(modeButton, icon(editMode ? 'eye-outline' : 'pencil', 18, 'prefix'), editMode ? 'Preview' : 'Edit');
  });

  function render(state) {
    if (name.value !== state.name) name.value = state.name;
    if (periodSelect.value !== state.periodId) periodSelect.value = state.periodId;
    drawSaved(state);
    drawExport(state);
    drawMode(state);
    drawButtons(state);
  }

  render(store.get());
  store.subscribe(render);
}
