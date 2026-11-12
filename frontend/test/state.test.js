import assert from 'node:assert/strict';
import { test } from 'node:test';

import { newSchedule } from '../js/model/schedule.js';
import {
  addWidget, approveAllBlocks, approveBlock, countApproved, countDrafts, createStore, editBlock, finishGenerating,
  hasUnsavedChanges, initialState, jsonCopy, loadReport, newReport, removeAllBlocks, removeBlock, removeWidget,
  reportOf, reportSaved, selectWidget, setEditMode, setInstructions, setName, setPeriod, setSavedReports, setSchedule,
  setTemplate, startGenerating, updateWidget,
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

/** The state after the page saved its report as the saved report with the id. */
const afterSave = (state, id = 'report-1') => reportSaved(state, id, reportOf(state));

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

test('the studio opens with an empty report that is not saved, and does not know the saved reports yet', () => {
  const state = initialState(NOW);

  assert.equal(state.name, 'Untitled report');
  assert.equal(state.periodId, 'last7');
  assert.deepEqual(state.template.widgets, []);
  assert.equal(state.template.columns, 12);
  assert.equal(state.editMode, true);
  assert.equal(state.selectedId, undefined);
  assert.equal(state.ai, null);
  assert.deepEqual(state.instructions, { subject: '', focus: '' });
  assert.equal(state.schedule, null);
  assert.equal(state.reportId, undefined);
  assert.equal(state.saved, null);
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

test('a new report is empty, is not a saved report and keeps the time frame', () => {
  const state = newReport(setEditMode(setPeriod(afterSave(withText()), 'last30'), false));

  assert.equal(state.name, 'Untitled report');
  assert.deepEqual(state.template.widgets, []);
  assert.equal(state.template.columns, 12);
  assert.equal(state.periodId, 'last30');
  assert.equal(state.reportId, undefined);
  assert.equal(state.editMode, true);
  assert.equal(state.ai, null);
});

// --- saved reports ---

/** A saved report as the page gets it from the service (see data/saved-reports.js). */
const savedAs = (state, id = 'report-1') => ({ id, ...jsonCopy(reportOf(state)) });

test('a report is saved as its setup, under its name without the spaces around it', () => {
  const state = setName(withReport(), '  Irrigation  ');

  const report = reportOf(state);

  assert.deepEqual(Object.keys(report), ['name', 'periodId', 'template', 'instructions', 'schedule']);
  assert.deepEqual([report.name, report.periodId], ['Irrigation', 'last7']);
  assert.deepEqual(report.template, state.template);
  assert.deepEqual(report.instructions, { subject: '', focus: '' });
  assert.equal(report.schedule, null);
  assert.equal(reportOf(setName(state, ' ')).name, 'Untitled report');
});

test('what is only on the page is not saved: the selection, the mode and the generated text', () => {
  const state = setEditMode(selectWidget(withText(), 'irrigation-1'), false);

  assert.deepEqual(reportOf(state), reportOf(withReport()));
});

test('the saved reports of the realm are kept, and none is kept when they could not be read', () => {
  const saved = [{ id: 'report-1', name: 'Weekly', updatedAt: NOW }];

  const known = setSavedReports(initialState(NOW), saved);

  assert.equal(known.saved, saved);
  assert.equal(setSavedReports(known, null).saved, null);
});

test('a report that is saved is the report that is open from then on, and saving it again changes nothing', () => {
  const state = withReport();

  const saved = afterSave(state);

  assert.equal(saved.reportId, 'report-1');
  assert.equal(saved.template, state.template, 'saving does not change what the report shows');
  assert.equal(afterSave(saved), saved);
  assert.equal(afterSave(saved, 'report-2').reportId, 'report-2');
});

test('opening a saved report shows its widgets and time frame, with no text and nothing selected', () => {
  const report = savedAs(setPeriod(setName(withReport(), 'Quarterly irrigation'), 'lastQuarter'));
  const state = selectWidget(finishGenerating(startGenerating(removeWidget(withReport(), 'irrigation-8')), TEXT),
    'irrigation-1');

  const opened = loadReport(state, report, NOW + 1);

  assert.equal(opened.reportId, 'report-1');
  assert.equal(opened.name, 'Quarterly irrigation');
  assert.equal(opened.periodId, 'lastQuarter');
  assert.equal(opened.template.widgets.length, 8);
  assert.deepEqual(opened.template, report.template);
  assert.notEqual(opened.template, report.template, 'the report keeps a copy of its own');
  assert.equal(opened.selectedId, undefined);
  assert.equal(opened.ai, null);
});

test('a saved report is made for the moment it is opened at, not for the one it was saved at', () => {
  const report = savedAs(setPeriod(withReport(), 'last30'));
  const aMonthLater = NOW + 31 * 24 * 3_600_000;

  const opened = loadReport(initialState(NOW), report, aMonthLater);

  assert.equal(opened.asOf, aMonthLater);
  assert.equal(opened.periodId, 'last30', 'the time frame is relative, so it is still the last 30 days');
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
  const scheduled = setSchedule(setName(withReport(), 'Weekly'), SCHEDULE);
  const report = savedAs(scheduled);
  assert.deepEqual(report.schedule, SCHEDULE);

  const empty = newReport(scheduled);
  assert.equal(empty.schedule, null);
  const opened = loadReport(empty, report, NOW);
  assert.deepEqual(opened.schedule, SCHEDULE);
  assert.notEqual(opened.schedule, report.schedule, 'the state keeps a copy of its own');

  const removed = setSchedule(scheduled, null);
  assert.equal(reportOf(removed).schedule, null);
  assert.equal(loadReport(scheduled, savedAs(removed), NOW).schedule, null);
});

// --- the instructions for the AI ---

const INSTRUCTIONS = { subject: '  The irrigation of the greenhouse.  ', focus: 'A tank level below 200 l.\n' };
const ANSWERS = { subject: 'The irrigation of the greenhouse.', focus: 'A tank level below 200 l.' };

test('instructions are kept without the spaces around the answers, and the same ones change nothing', () => {
  const state = withText();

  const instructed = setInstructions(state, INSTRUCTIONS);

  assert.deepEqual(instructed.instructions, ANSWERS);
  assert.equal(instructed.ai, state.ai, 'the generated text stays');
  assert.equal(setInstructions(instructed, ANSWERS), instructed);
  assert.equal(setInstructions(instructed, INSTRUCTIONS), instructed);
});

test('instructions stay when the report changes, for the author to correct', () => {
  const state = setInstructions(withReport(), INSTRUCTIONS);
  const renamed = changeWidget(state, 'irrigation-1', widget => { widget.displayName = 'Flow'; });

  const changed = setPeriod(setTemplate(state, renamed), 'last30');

  assert.equal(changed.instructions, state.instructions);
});

test('instructions are saved with the report, opened with it, and gone from a new report', () => {
  const instructed = setInstructions(setName(withReport(), 'Weekly'), INSTRUCTIONS);
  const report = savedAs(instructed);
  assert.deepEqual(report.instructions, ANSWERS);

  const empty = newReport(instructed);
  assert.deepEqual(empty.instructions, { subject: '', focus: '' });
  const opened = loadReport(empty, report, NOW);
  assert.deepEqual(opened.instructions, ANSWERS);
  assert.notEqual(opened.instructions, report.instructions, 'the state keeps a copy of its own');

  const other = { subject: 'Other.', focus: 'Other too.' };
  assert.deepEqual(reportOf(setInstructions(instructed, other)).instructions, other);
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

// --- changes that are not saved ---

/** A saved report that is open and was not changed since. */
const opened = () => loadReport(initialState(NOW), savedAs(withReport()), NOW);

test('a report has no unsaved changes while it is as it was opened or started: empty, new or opened', () => {
  assert.equal(hasUnsavedChanges(initialState(NOW)), false);
  assert.equal(hasUnsavedChanges(newReport(withReport())), false);
  assert.equal(hasUnsavedChanges(opened()), false);
});

test('a report that was built and never saved has unsaved changes', () => {
  assert.equal(hasUnsavedChanges(withReport()), true);
});

test('a change to what Save keeps is an unsaved change: name, time frame, widgets, answers and schedule', () => {
  const state = opened();
  const changes = {
    'the name': setName(state, 'Quarterly irrigation'),
    'the time frame': setPeriod(state, 'last30'),
    'where a widget is': setTemplate(state, changeWidget(state, 'irrigation-1', widget => { widget.gridItem.y = 20; })),
    'the settings of a widget': setTemplate(state,
      changeWidget(state, 'irrigation-2', widget => { widget.widgetConfig.max = 2000; })),
    'a removed widget': removeWidget(state, 'irrigation-8'),
    'the answers for the AI': setInstructions(state, INSTRUCTIONS),
    'the schedule': setSchedule(state, SCHEDULE),
  };

  for (const [what, changed] of Object.entries(changes)) {
    assert.equal(hasUnsavedChanges(changed), true, what);
  }
});

test('what Save does not keep is no unsaved change: the generated text, the selection and the mode', () => {
  const state = opened();

  const changed = setEditMode(selectWidget(finishGenerating(startGenerating(state), TEXT), 'irrigation-1'), false);

  assert.equal(hasUnsavedChanges(changed), false);
  assert.equal(hasUnsavedChanges(setSavedReports(state, [])), false);
});

test('a change that is undone is no change, and the spaces around the name are not one', () => {
  const state = opened();
  const moved = setTemplate(state, changeWidget(state, 'irrigation-1', widget => { widget.gridItem.y = 20; }));

  assert.equal(hasUnsavedChanges(setName(setName(state, 'Other'), state.name)), false);
  assert.equal(hasUnsavedChanges(setTemplate(moved, state.template)), false);
  assert.equal(hasUnsavedChanges(setName(state, `  ${state.name}  `)), false, 'Save keeps the name without them');
});

test('a report that is saved has no unsaved changes, until it is changed again', () => {
  const saved = afterSave(withReport());

  assert.equal(hasUnsavedChanges(saved), false);
  assert.equal(hasUnsavedChanges(setPeriod(saved, 'last30')), true);
});

test('a change that is made while the report is being saved is not saved by it', () => {
  const state = withReport();
  const sent = reportOf(state);
  const changedMeanwhile = setName(state, 'Renamed while saving');

  const saved = reportSaved(changedMeanwhile, 'report-1', sent);

  assert.equal(saved.name, 'Renamed while saving');
  assert.equal(hasUnsavedChanges(saved), true);
  assert.equal(hasUnsavedChanges(setName(saved, state.name)), false, 'it is what was saved again');
});

test('a report without a widget has nothing that Save could keep, so it has no unsaved changes', () => {
  let emptied = opened();
  for (const { id } of emptied.template.widgets) emptied = removeWidget(emptied, id);

  assert.equal(hasUnsavedChanges(emptied), false);
  assert.equal(hasUnsavedChanges(setName(setPeriod(initialState(NOW), 'last30'), 'Draft')), false);
});

test('the report that was saved is a copy of its own: a template that is changed in place is changed', () => {
  const state = opened();

  state.template.widgets[0].displayName = 'Changed in place';

  assert.equal(hasUnsavedChanges(state), true);
});
