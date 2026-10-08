import assert from 'node:assert/strict';
import { test } from 'node:test';

import { newSchedule } from '../js/model/schedule.js';
import {
  addWidget, approveAllBlocks, approveBlock, countApproved, countDrafts, createStore, editBlock, finishGenerating,
  initialState, jsonCopy, loadReport, newReport, removeAllBlocks, removeBlock, removeWidget, saveReport, selectWidget,
  setEditMode, setName, setPeriod, setSchedule, setTemplate, startGenerating, updateWidget,
} from '../js/state.js';
import { REPORT } from './helpers/report.js';

const NOW = Date.parse('2026-10-04T15:30:00Z');

const TEXT = {
  summary: 'Summary.',
  findings: 'Findings.',
  descriptions: { 'irrigation-1': 'About the flow.', 'irrigation-2': 'About the tank.' },
};

/** The state with the test report open, as if the user had built it. */
const withReport = () =>
  setTemplate({ ...initialState(NOW), name: REPORT.name, periodId: REPORT.periodId }, REPORT.template);

/** The state with the test report open and generated text that is ready. */
const withText = () => finishGenerating(startGenerating(withReport()), TEXT);

/** The template of the state with one widget changed. */
function changeWidget(state, id, change) {
  const template = jsonCopy(state.template);
  change(template.widgets.find(widget => widget.id === id));
  return template;
}

test('the store tells its listeners about a new state, and only then', () => {
  const store = createStore({ value: 1 });
  const seen = [];
  store.subscribe(state => seen.push(state.value));

  store.update(state => ({ value: state.value + 1 }));
  store.update(state => state);

  assert.deepEqual(seen, [2]);
  assert.equal(store.get().value, 2);
});

test('the studio opens with an empty report, in edit mode, with no saved reports', () => {
  const state = initialState(NOW);

  assert.equal(state.name, 'Untitled report');
  assert.equal(state.periodId, 'last7');
  assert.deepEqual(state.template.widgets, []);
  assert.equal(state.template.columns, 12);
  assert.equal(state.editMode, true);
  assert.equal(state.selectedId, undefined);
  assert.equal(state.ai, null);
  assert.equal(state.schedule, null);
  assert.deepEqual(state.saved, []);
  assert.equal(state.asOf, NOW);
  assert.notEqual(initialState(NOW).template.id, state.template.id, 'every report has a template of its own');
});

// --- the template ---

test('a template from the builder is copied, and the same template changes nothing', () => {
  const state = withReport();
  const template = changeWidget(state, 'irrigation-1', widget => { widget.gridItem.x = 4; });

  const next = setTemplate(state, template);
  template.widgets[0].gridItem.x = 9;

  assert.equal(next.template.widgets[0].gridItem.x, 4);
  assert.equal(setTemplate(next, jsonCopy(next.template)), next);
});

test('moving a widget keeps the text, changing what it shows discards it', () => {
  const state = withText();

  const moved = setTemplate(state, changeWidget(state, 'irrigation-1', widget => { widget.gridItem.y = 20; }));
  assert.equal(moved.ai, state.ai);

  const renamed = setTemplate(state, changeWidget(state, 'irrigation-1', widget => { widget.displayName = 'Flow'; }));
  assert.equal(renamed.ai, null);

  const reconfigured = setTemplate(state,
    changeWidget(state, 'irrigation-2', widget => { widget.widgetConfig.max = 2000; }));
  assert.equal(reconfigured.ai, null);
});

test('a dropped widget is added and selected', () => {
  const widget = {
    ...jsonCopy(withReport().template.widgets[3]), id: 'new', gridItem: { id: 'new', x: 0, y: 30, w: 3, h: 2 },
  };

  const state = addWidget(withText(), widget);

  assert.equal(state.template.widgets.length, 9);
  assert.equal(state.selectedId, 'new');
  assert.equal(state.ai, null);
});

test('a removed widget is deselected, and removing nothing changes nothing', () => {
  const state = selectWidget(withReport(), 'irrigation-2');

  const removed = removeWidget(state, 'irrigation-2');

  assert.equal(removed.template.widgets.length, 7);
  assert.equal(removed.selectedId, undefined);
  assert.equal(removeWidget(removed, 'irrigation-2'), removed);
  assert.equal(removeWidget(removed, undefined), removed);
});

test('the settings change the name and config of a widget, but not where it is', () => {
  const state = withReport();
  const fromSettings = jsonCopy(state.template.widgets[1]);
  fromSettings.displayName = 'Water in the tank';
  fromSettings.widgetConfig.decimals = 2;
  fromSettings.gridItem.x = 0; // the settings had the widget from before it was moved

  const next = updateWidget(state, fromSettings);

  const widget = next.template.widgets[1];
  assert.equal(widget.displayName, 'Water in the tank');
  assert.equal(widget.widgetConfig.decimals, 2);
  assert.equal(widget.gridItem.x, 8);
});

test('only a widget of the report can be selected', () => {
  const state = withReport();

  assert.equal(selectWidget(state, 'irrigation-3').selectedId, 'irrigation-3');
  assert.equal(selectWidget(state, 'no-such-widget').selectedId, undefined);
  assert.equal(selectWidget(state, undefined), state);
});

test('a new time frame discards the text; an unknown or the same one changes nothing', () => {
  const state = withText();

  const next = setPeriod(state, 'lastQuarter');

  assert.equal(next.periodId, 'lastQuarter');
  assert.equal(next.ai, null);
  assert.equal(setPeriod(state, 'nextCentury'), state);
  assert.equal(setPeriod(state, 'last7'), state);
});

test('the name changes, and the preview has no selected widget', () => {
  const state = selectWidget(withReport(), 'irrigation-1');

  assert.equal(setName(state, 'Irrigation').name, 'Irrigation');
  assert.equal(setName(state, state.name), state);

  const preview = setEditMode(state, false);
  assert.equal(preview.editMode, false);
  assert.equal(preview.selectedId, undefined);
  assert.equal(setEditMode(preview, false), preview);
});

test('a new report is empty and keeps the time frame', () => {
  const state = newReport(setEditMode(setPeriod(withText(), 'last30'), false));

  assert.equal(state.name, 'Untitled report');
  assert.deepEqual(state.template.widgets, []);
  assert.equal(state.template.columns, 12);
  assert.equal(state.periodId, 'last30');
  assert.equal(state.editMode, true);
  assert.equal(state.ai, null);
});

// --- saved reports ---

test('saving adds a report, or replaces the one with the same name', () => {
  const state = setName(withReport(), '  Irrigation  ');

  const saved = saveReport(state);
  assert.equal(saved.saved.length, 1);
  const report = saved.saved.at(-1);
  assert.deepEqual([report.id, report.name, report.periodId], ['saved-1', 'Irrigation', 'last7']);

  const again = saveReport(setPeriod(saved, 'last30'));
  assert.equal(again.saved.length, 1);
  assert.equal(again.saved.at(-1).periodId, 'last30');
  assert.equal(again.saved.at(-1).id, 'saved-1');

  const other = saveReport(setName(again, 'Other'));
  assert.deepEqual(other.saved.map(item => item.id), ['saved-1', 'saved-2']);

  assert.equal(saveReport(setName(state, ' ')).saved.at(-1).name, 'Untitled report');
});

test('a saved report keeps its own copy of the template', () => {
  const state = saveReport(withReport());
  const saved = state.saved.at(-1);

  const changed = removeWidget(state, 'irrigation-1');

  assert.equal(changed.saved.at(-1).template.widgets.length, 8);
  assert.notEqual(saved.template, state.template);
});

test('opening a saved report shows its widgets and time frame, with no text and nothing selected', () => {
  const saved = saveReport(setPeriod(setName(withReport(), 'Quarterly irrigation'), 'lastQuarter'));
  const state = selectWidget(finishGenerating(startGenerating(removeWidget(saved, 'irrigation-8')), TEXT),
    'irrigation-1');

  const opened = loadReport(state, 'saved-1');

  assert.equal(opened.name, 'Quarterly irrigation');
  assert.equal(opened.periodId, 'lastQuarter');
  assert.equal(opened.template.widgets.length, 8);
  assert.deepEqual(opened.template, jsonCopy(saved.saved[0].template));
  assert.notEqual(opened.template, saved.saved[0].template);
  assert.equal(opened.selectedId, undefined);
  assert.equal(opened.ai, null);
  assert.equal(loadReport(state, 'no-such-report'), state);
});

// --- the schedule ---

const SCHEDULE = { ...newSchedule(), recipients: ['ops@example.com'] };

test('a schedule is set and removed without touching what the report shows', () => {
  const state = withText();

  const scheduled = setSchedule(state, SCHEDULE);

  assert.deepEqual(scheduled.schedule, SCHEDULE);
  assert.notEqual(scheduled.schedule, SCHEDULE, 'the state keeps a copy of its own');
  assert.equal(scheduled.template, state.template);
  assert.equal(scheduled.ai, state.ai, 'the generated text stays');
  assert.equal(setSchedule(scheduled, jsonCopy(SCHEDULE)), scheduled);
  assert.equal(setSchedule(scheduled, null).schedule, null);
  assert.equal(setSchedule(state, null), state);
});

test('a schedule is saved with the report, opened with it, and gone from a new report', () => {
  const saved = saveReport(setSchedule(setName(withReport(), 'Weekly'), SCHEDULE));
  assert.deepEqual(saved.saved[0].schedule, SCHEDULE);
  assert.notEqual(saved.saved[0].schedule, saved.schedule, 'a saved report keeps a copy of its own');

  const empty = newReport(saved);
  assert.equal(empty.schedule, null);
  assert.deepEqual(loadReport(empty, 'saved-1').schedule, SCHEDULE);

  const removed = saveReport(setSchedule(saved, null));
  assert.equal(removed.saved[0].schedule, null);
  assert.equal(loadReport(newReport(removed), 'saved-1').schedule, null);
});

// --- generated text ---

test('generated text arrives as drafts: a summary, findings and a description per widget', () => {
  const state = withText();

  assert.equal(state.ai.status, 'ready');
  assert.deepEqual(Object.keys(state.ai.blocks), ['summary', 'findings', 'desc:irrigation-1', 'desc:irrigation-2']);
  assert.equal(state.ai.blocks['desc:irrigation-1'].text, 'About the flow.');
  assert.equal(countDrafts(state.ai), 4);
  assert.equal(countApproved(state.ai), 0);
});

test('text for a report that changed while it was written is dropped', () => {
  const writing = startGenerating(withReport());
  const changed = setPeriod(writing, 'last30');

  assert.equal(finishGenerating(changed, TEXT), changed);
  assert.equal(countDrafts(writing.ai), 0);
});

test('blocks are approved, edited and removed; without blocks there is no text', () => {
  let state = approveBlock(withText(), 'summary');
  assert.equal(state.ai.blocks.summary.state, 'approved');

  state = editBlock(state, 'summary', 'New summary.');
  assert.deepEqual(state.ai.blocks.summary, { text: 'New summary.', state: 'draft' });

  state = removeBlock(state, 'findings');
  assert.equal(state.ai.blocks.findings, undefined);

  state = approveAllBlocks(state);
  assert.equal(countApproved(state.ai), 3);
  assert.equal(countDrafts(state.ai), 0);

  for (const id of Object.keys(state.ai.blocks)) state = removeBlock(state, id);
  assert.equal(state.ai, null);
  assert.equal(removeAllBlocks(state), state);
  assert.equal(removeAllBlocks(withText()).ai, null);
});
