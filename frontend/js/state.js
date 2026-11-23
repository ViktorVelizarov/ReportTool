/**
 * The report setup and everything that changes it. The actions are pure: they return the new state, or the same state
 * when nothing changes. The setup of a report is its name, its time frame, the template of its widgets, the layout
 * and settings that the dashboard builder edits (see builder/), what the author told the AI about it, and its
 * schedule, if it has one. That is what is saved; the saved reports themselves are kept by the report service (see
 * data/saved-reports.js and ui/saved-reports.js), and the state knows which one is open, what they are called, and what
 * the open report was when it was last saved, opened or started, to tell whether it has changes that are not saved.
 */

import { DashboardService } from './builder/service/dashboard-service.js';
import { objectsEqual } from './data/util.js';
import { newInstructions } from './model/instructions.js';
import { PERIODS } from './model/periods.js';

const UNTITLED = 'Untitled report';

/** A deep copy without undefined values, which is how a template is saved; the builder keeps changing its own copy. */
export const jsonCopy = value => JSON.parse(JSON.stringify(value));

export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    update(change) {
      const next = change(state);
      if (next === state) return;
      state = next;
      listeners.forEach(listener => listener(state));
    },
    subscribe(listener) {
      listeners.add(listener);
    },
  };
}

/**
 * The state with the report as it is now as its baseline: the report as it was last saved, opened or started, which is
 * what its changes are measured against (see hasUnsavedChanges). The baseline is a copy of its own, so nothing that
 * changes the template in place can change it.
 */
function withBaseline(state, report = reportOf(state)) {
  return { ...state, baseline: jsonCopy(report) };
}

/** The studio opens with an empty report that is not saved, and does not know the saved reports yet. */
export function initialState(asOf = Date.now()) {
  return withBaseline({
    name: UNTITLED,
    periodId: PERIODS[0].id,
    template: DashboardService.newTemplate(),
    instructions: newInstructions(), // the answers to the questions of model/instructions.js, saved with the report
    schedule: null, // null | the schedule of model/schedule.js, which is saved with the report
    reportId: undefined, // the id of the saved report that is open; undefined for a report that was never saved
    editMode: true,
    selectedId: undefined, // the id of the widget that is selected in the builder
    // null | { status: 'loading', run, previous } | { status: 'ready', blocks: { id: { text, state } } }
    ai: null,
    textRuns: 0, // how often text was asked for: the number of the last run
    saved: null, // null | [{ id, name, updatedAt }]: the saved reports of the realm, null while they are not known
    asOf,
  });
}

// --- Report setup. Changing what a report shows invalidates the generated text. ---

/** What the generated text is about: the widgets with their settings, but not where they are on the page. */
const contentOf = template => template.widgets.map(({ id, displayName, widgetTypeId, widgetConfig }) =>
  ({ id, displayName, widgetTypeId, widgetConfig }));

/** The new template of the report, from the dashboard builder. A selected widget that is gone is deselected. */
export function setTemplate(state, template) {
  const next = jsonCopy(template);
  if (objectsEqual(state.template, next)) return state;
  const changed = !objectsEqual(contentOf(state.template), contentOf(next));
  const selected = next.widgets.some(widget => widget.id === state.selectedId);
  return {
    ...state, template: next, selectedId: selected ? state.selectedId : undefined, ai: changed ? null : state.ai,
  };
}

/** A new widget, as the builder makes it when a widget type is dropped on the page; it is selected. */
export function addWidget(state, widget) {
  const added = setTemplate(state, { ...state.template, widgets: [...state.template.widgets, widget] });
  return { ...added, selectedId: widget.id };
}

export const removeWidget = (state, id) =>
  setTemplate(state, { ...state.template, widgets: state.template.widgets.filter(widget => widget.id !== id) });

/** The name and settings of a widget, as the settings of the builder have changed them. */
export const updateWidget = (state, { id, displayName, widgetConfig }) => setTemplate(state, {
  ...state.template,
  widgets: state.template.widgets.map(widget => (widget.id === id ? { ...widget, displayName, widgetConfig } : widget)),
});

/** Selects the widget with the id, or no widget when there is no such widget. */
export function selectWidget(state, id) {
  const selectedId = state.template.widgets.find(widget => widget.id === id)?.id;
  return selectedId === state.selectedId ? state : { ...state, selectedId };
}

export function setPeriod(state, periodId) {
  if (!PERIODS.some(period => period.id === periodId) || periodId === state.periodId) return state;
  return { ...state, periodId, ai: null };
}

export const setName = (state, name) => (name === state.name ? state : { ...state, name });

/** Switches between editing the report and seeing it as it is; no widget is selected when it is not edited. */
export const setEditMode = (state, editMode) =>
  (editMode === state.editMode ? state : { ...state, editMode, selectedId: editMode ? state.selectedId : undefined });

/**
 * What the author told the AI about the report, kept without the spaces around the answers. It does not change what
 * the report shows, and it stays when the report changes: it is for the author to correct.
 */
export function setInstructions(state, instructions) {
  const next = { subject: instructions.subject.trim(), focus: instructions.focus.trim() };
  return objectsEqual(state.instructions, next) ? state : { ...state, instructions: next };
}

/** The schedule of the report, or no schedule with null. It does not change what the report shows. */
export function setSchedule(state, schedule) {
  const next = schedule && jsonCopy(schedule);
  return objectsEqual(state.schedule, next) ? state : { ...state, schedule: next };
}

/** An empty report, in the time frame that was chosen. It is not a saved report until it is saved. */
export const newReport = state => withBaseline({
  ...state,
  reportId: undefined,
  name: UNTITLED,
  template: DashboardService.newTemplate(),
  instructions: newInstructions(),
  schedule: null,
  selectedId: undefined,
  ai: null,
  editMode: true,
});

// --- Saved reports ---

/** The saved reports of the realm, as the service lists them; null when they could not be read. */
export const setSavedReports = (state, saved) => ({ ...state, saved });

/** The report as it is saved: its setup, and not what is only on the page (the selection, the mode, the text). */
export const reportOf = state => ({
  name: state.name.trim() || UNTITLED,
  periodId: state.periodId,
  template: state.template,
  instructions: state.instructions,
  schedule: state.schedule,
});

/**
 * The report that is open was saved as the saved report with the id, so saving it again replaces that report. The
 * report is the one that was sent to the service (see reportOf): a change that was made while it was being saved is not
 * in it, so that change is still not saved.
 */
export function reportSaved(state, id, report) {
  if (id === state.reportId && objectsEqual(report, state.baseline)) return state;
  return withBaseline({ ...state, reportId: id }, report);
}

/**
 * Opens a saved report in place of the report that is open. The report is made for the moment asOf, and its time frame
 * is relative to it (the last 30 days, say), so a report that is opened later shows the days before that day.
 */
export function loadReport(state, report, asOf) {
  return withBaseline({
    ...state,
    reportId: report.id,
    name: report.name,
    periodId: report.periodId,
    template: jsonCopy(report.template),
    instructions: { ...report.instructions },
    schedule: report.schedule && jsonCopy(report.schedule),
    selectedId: undefined,
    ai: null,
    asOf,
  });
}

/**
 * Whether the report has changes that are not saved: it is not what it was when it was last saved, opened or started,
 * and Save could keep it, which it cannot when it has no widget. The generated text is no part of it, as Save does not
 * keep that.
 */
export const hasUnsavedChanges = state =>
  state.template.widgets.length > 0 && !objectsEqual(reportOf(state), state.baseline);

// --- Generated text ---

/**
 * Text is being written for the report. Every run has a number (ai.run), so that an answer can be told from the
 * answer of another run. The text that was on the page is kept (ai.previous) for when this run fails.
 */
export function startGenerating(state) {
  const run = state.textRuns + 1;
  const previous = state.ai?.status === 'loading' ? state.ai.previous : state.ai;
  return { ...state, textRuns: run, ai: { status: 'loading', run, previous } };
}

/** Whether the run with the number is the one that is writing now: the report did not change, and no run followed. */
const isWriting = (state, run) => state.ai?.status === 'loading' && state.ai.run === run;

/**
 * The text that the run wrote becomes blocks for the author to review, in the order that the report has them: the
 * introduction, the findings, a description of each widget (the block desc:<widget id>) and the conclusion. The text is
 * { introduction, findings, descriptions: { widget id: text }, conclusion }. The text of a run that is not writing any
 * more is dropped: the report changed while it was being written, or it is the answer of an earlier run.
 */
export function finishGenerating(state, run, text) {
  if (!isWriting(state, run)) return state;
  const draft = written => ({ text: written, state: 'draft' });
  const blocks = { introduction: draft(text.introduction), findings: draft(text.findings) };
  for (const [widgetId, description] of Object.entries(text.descriptions)) {
    blocks[`desc:${widgetId}`] = draft(description);
  }
  blocks.conclusion = draft(text.conclusion);
  return { ...state, ai: { status: 'ready', blocks } };
}

/**
 * The run could not write its text: the text that was on the page before it is back, with its edits and approvals, and
 * there is no text when there was none. A run that is not writing any more changes nothing.
 */
export const failGenerating = (state, run) => (isWriting(state, run) ? { ...state, ai: state.ai.previous } : state);

/**
 * Applies change(block, id) to every block; a block it turns into null is removed, and without blocks there is no
 * text.
 */
function changeBlocks(state, change) {
  if (state.ai?.status !== 'ready') return state;
  const blocks = Object.fromEntries(
    Object.entries(state.ai.blocks).map(([id, block]) => [id, change(block, id)]).filter(([, block]) => block));
  return { ...state, ai: Object.keys(blocks).length ? { ...state.ai, blocks } : null };
}

export const approveBlock = (state, id) =>
  changeBlocks(state, (block, blockId) => (blockId === id ? { ...block, state: 'approved' } : block));
export const approveAllBlocks = state => changeBlocks(state, block => ({ ...block, state: 'approved' }));
export const removeBlock = (state, id) => changeBlocks(state, (block, blockId) => (blockId === id ? null : block));
export const removeAllBlocks = state => (state.ai ? { ...state, ai: null } : state);
export const editBlock = (state, id, text) =>
  changeBlocks(state, (block, blockId) => (blockId === id ? { ...block, text, state: 'draft' } : block));

function countBlocks(ai, state) {
  if (ai?.status !== 'ready') return 0;
  return Object.values(ai.blocks).filter(block => block.state === state).length;
}

/** How many generated text blocks still wait for the author's approval. */
export const countDrafts = ai => countBlocks(ai, 'draft');

/** How many generated text blocks the author approved; only these go into an export. */
export const countApproved = ai => countBlocks(ai, 'approved');
