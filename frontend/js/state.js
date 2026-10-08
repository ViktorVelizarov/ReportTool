/**
 * The report setup and everything that changes it. The actions are pure: they return the new state, or the same state
 * when nothing changes. The setup of a report is its name, its time frame, the template of its widgets, the layout
 * and settings that the dashboard builder edits (see builder/), and its schedule, if it has one.
 */

import { DashboardService } from './builder/service/dashboard-service.js';
import { objectsEqual } from './data/util.js';
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

/** The studio opens with an empty report, for the first time frame, and with no saved reports. */
export function initialState(asOf = Date.now()) {
  return {
    name: UNTITLED,
    periodId: PERIODS[0].id,
    template: DashboardService.newTemplate(),
    schedule: null, // null | the schedule of model/schedule.js, which is saved with the report
    editMode: true,
    selectedId: undefined, // the id of the widget that is selected in the builder
    ai: null, // null | { status: 'loading' } | { status: 'ready', blocks: { id: { text, state } } }
    saved: [],
    asOf,
  };
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

/** The schedule of the report, or no schedule with null. It does not change what the report shows. */
export function setSchedule(state, schedule) {
  const next = schedule && jsonCopy(schedule);
  return objectsEqual(state.schedule, next) ? state : { ...state, schedule: next };
}

/** An empty report, in the time frame that was chosen. */
export const newReport = state => ({
  ...state,
  name: UNTITLED,
  template: DashboardService.newTemplate(),
  schedule: null,
  selectedId: undefined,
  ai: null,
  editMode: true,
});

// --- Saved reports ---

export function saveReport(state) {
  const name = state.name.trim() || UNTITLED;
  const existing = state.saved.find(report => report.name === name);
  const report = {
    id: existing?.id ?? `saved-${state.saved.length + 1}`,
    name,
    periodId: state.periodId,
    template: jsonCopy(state.template),
    schedule: state.schedule && jsonCopy(state.schedule),
  };
  const saved = existing ? state.saved.map(item => (item === existing ? report : item)) : [...state.saved, report];
  return { ...state, saved };
}

export function loadReport(state, id) {
  const report = state.saved.find(item => item.id === id);
  if (!report) return state;
  return {
    ...state,
    name: report.name,
    periodId: report.periodId,
    template: jsonCopy(report.template),
    schedule: report.schedule && jsonCopy(report.schedule),
    selectedId: undefined,
    ai: null,
  };
}

// --- Generated text ---

export const startGenerating = state => ({ ...state, ai: { status: 'loading' } });

export function finishGenerating(state, text) {
  if (state.ai?.status !== 'loading') return state; // the report changed while the text was being written
  const blocks = {
    summary: { text: text.summary, state: 'draft' },
    findings: { text: text.findings, state: 'draft' },
  };
  for (const [widgetId, description] of Object.entries(text.descriptions)) {
    blocks[`desc:${widgetId}`] = { text: description, state: 'draft' };
  }
  return { ...state, ai: { status: 'ready', blocks } };
}

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
