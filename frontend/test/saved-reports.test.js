import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

import { ReportContext } from '../js/data/report-context.js';
import { SavedReports } from '../js/data/saved-reports.js';
import { ServiceClient } from '../js/data/service-client.js';
import { resolvePeriod } from '../js/model/periods.js';
import { newSchedule } from '../js/model/schedule.js';
import { DAY } from '../js/model/time.js';
import {
  initialState, jsonCopy, loadReport, removeWidget, reportOf, reportSaved, setInstructions, setName, setPeriod,
  setSchedule, setTemplate,
} from '../js/state.js';
import { REPORT } from './helpers/report.js';
import { installFakeService, NOW, REALM } from './helpers/service.js';

process.env.TZ = 'UTC';

let calls;

beforeEach(() => {
  calls = installFakeService();
  ReportContext.realm = REALM;
});

/** The state with the test report open, as if the author had built it. */
const withReport = () =>
  setTemplate({ ...initialState(NOW), name: REPORT.name, periodId: REPORT.periodId }, REPORT.template);

/** Saves the state as a new report, opens it again, and gives the state with it open, as the page does. */
async function saveAndOpen(state) {
  const saved = await SavedReports.add(reportOf(state));
  return loadReport(reportSaved(state, saved.id), await SavedReports.open(saved.id), state.asOf);
}

test('the saved reports of the realm are asked from the service, by the realm of the report', async () => {
  assert.deepEqual(await SavedReports.list(), []);

  ReportContext.realm = undefined;
  await SavedReports.list();

  assert.deepEqual(calls, ['/reports?realm=manufacturer', '/reports']);
});

// --- AC1: a report is saved under a name, appears in the list, and can be opened ---

test('a saved report is in the list by its name, and opens with everything it was saved with', async () => {
  const schedule = { ...newSchedule(), recipients: ['ops@example.com'] };
  const state = setSchedule(setInstructions(withReport(), { subject: 'The irrigation.', focus: 'Low tanks.' }),
    schedule);

  const saved = await SavedReports.add(reportOf(state));

  assert.deepEqual(calls, ['POST /reports?realm=manufacturer']);
  assert.equal(saved.name, 'Irrigation report');
  assert.deepEqual(await SavedReports.list(), [saved]);
  assert.deepEqual(await SavedReports.open(saved.id), { id: saved.id, ...jsonCopy(reportOf(state)) });
});

test('a report that is opened is the report that is open, with its widgets, time frame and name', async () => {
  const state = setPeriod(setName(withReport(), 'Quarterly irrigation'), 'lastQuarter');

  const opened = await saveAndOpen(state);

  assert.equal(opened.name, 'Quarterly irrigation');
  assert.equal(opened.periodId, 'lastQuarter');
  assert.deepEqual(opened.template, jsonCopy(state.template));
  assert.ok(opened.reportId);
});

test('the saved reports of one realm are not those of another', async () => {
  await SavedReports.add(reportOf(withReport()));

  ReportContext.realm = 'smartcity';
  assert.deepEqual(await SavedReports.list(), []);

  assert.deepEqual(calls.slice(1), ['/reports?realm=smartcity']);
});

// --- AC2: a relative time frame is made for the new days ---

test('a saved report keeps its time frame as a relative one and no dates', async () => {
  const opened = await SavedReports.open((await SavedReports.add(reportOf(setPeriod(withReport(), 'last30')))).id);

  assert.equal(opened.periodId, 'last30');
  assert.deepEqual(Object.keys(opened), ['id', 'name', 'periodId', 'template', 'instructions', 'schedule']);
});

test('opened a month later, a report with the last 30 days is made for the 30 days before that day', async () => {
  const state = setPeriod(withReport(), 'last30');
  const saved = await SavedReports.add(reportOf(state));
  const aMonthLater = NOW + 31 * DAY;

  const opened = loadReport(initialState(NOW), await SavedReports.open(saved.id), aMonthLater);

  const before = resolvePeriod(state.periodId, new Date(state.asOf));
  const after = resolvePeriod(opened.periodId, new Date(opened.asOf));
  assert.equal(after.start.getTime() - before.start.getTime(), 31 * DAY);
  assert.equal(after.end.getTime() - before.end.getTime(), 31 * DAY);
  assert.equal(after.end.getTime() - after.start.getTime(), 30 * DAY, 'it is still the last 30 days');
});

test('a calendar month is the one before the day it is opened on', async () => {
  const state = setPeriod(withReport(), 'lastMonth');
  const saved = await SavedReports.add(reportOf(state));

  const inOctober = loadReport(state, await SavedReports.open(saved.id), Date.parse('2026-10-15T12:00:00Z'));
  const inNovember = loadReport(state, await SavedReports.open(saved.id), Date.parse('2026-11-15T12:00:00Z'));

  assert.equal(resolvePeriod(inOctober.periodId, new Date(inOctober.asOf)).start.getMonth(), 8, 'September');
  assert.equal(resolvePeriod(inNovember.periodId, new Date(inNovember.asOf)).start.getMonth(), 9, 'October');
});

// --- AC3: an opened report that is saved again is updated, not duplicated ---

test('a report that is opened and saved again after a change is replaced and not duplicated', async () => {
  const opened = await saveAndOpen(withReport());
  const changed = removeWidget(opened, 'irrigation-1');
  calls.length = 0;

  const saved = await SavedReports.replace(changed.reportId, reportOf(changed));

  assert.deepEqual(calls, [`PUT /reports/${opened.reportId}?realm=manufacturer`]);
  assert.equal(saved.id, opened.reportId);
  assert.equal((await SavedReports.list()).length, 1);
  assert.equal((await SavedReports.open(opened.reportId)).template.widgets.length, 7);
});

test('a report that is renamed and saved is the same saved report with a new name', async () => {
  const opened = await saveAndOpen(withReport());
  const renamed = setName(opened, 'Quarterly irrigation');

  const saved = await SavedReports.replace(renamed.reportId, reportOf(renamed));

  assert.equal(saved.id, opened.reportId);
  assert.deepEqual((await SavedReports.list()).map(report => report.name), ['Quarterly irrigation']);
});

test('a new report with the name of a saved report is refused, whatever the case and the spaces', async () => {
  const opened = await saveAndOpen(withReport());

  await assert.rejects(SavedReports.add(reportOf(setName(initialState(NOW), 'irrigation REPORT'))),
    error => error.status === 409);
  await assert.rejects(SavedReports.add({ ...reportOf(withReport()), name: ' Irrigation report ' }),
    error => error.status === 409);
  assert.deepEqual((await SavedReports.list()).map(report => report.id), [opened.reportId]);
});

test('a saved report that is renamed to the name of another one is refused', async () => {
  const first = await saveAndOpen(withReport());
  const second = await saveAndOpen(setName(withReport(), 'Other'));

  await assert.rejects(SavedReports.replace(second.reportId, reportOf(setName(second, 'IRRIGATION report'))),
    error => error.status === 409 && error.message === 'a report with this name exists already');
  assert.deepEqual((await SavedReports.list()).map(report => report.name), ['Irrigation report', 'Other']);
  assert.notEqual(first.reportId, second.reportId);
});

test('a saved report that is not there is an error with the status of the service', async () => {
  await assert.rejects(SavedReports.open('no-such-report'), error => error.status === 404);
  await assert.rejects(SavedReports.replace('no-such-report', reportOf(withReport())), error => error.status === 404);
  assert.deepEqual(await SavedReports.list(), [], 'saving over a report that is not there does not make one');
});

test('the id of a report is a part of the address as it is, also when it holds a slash', async () => {
  await assert.rejects(SavedReports.open('a/b'), error => error.status === 404);

  assert.deepEqual(calls, ['/reports/a%2Fb?realm=manufacturer']);
});

// --- what the service gives ---

/** Makes the service answer with the JSON. */
function serviceGives(json) {
  ServiceClient.fetch = async () => ({ ok: true, status: 200, json: async () => structuredClone(json) });
}

const SAVED = { id: 'report-1', name: 'Weekly', periodId: 'last7', template: { widgets: [] } };

test('a saved report that lacks answers for the AI or a schedule gets none, as one of another version', async () => {
  serviceGives(SAVED);
  assert.deepEqual(await SavedReports.open('report-1'), {
    ...SAVED, instructions: { subject: '', focus: '' }, schedule: null,
  });

  serviceGives({ ...SAVED, instructions: { subject: 5, focus: 'Low tanks' }, schedule: ['daily'] });
  const opened = await SavedReports.open('report-1');
  assert.deepEqual(opened.instructions, { subject: '', focus: 'Low tanks' });
  assert.equal(opened.schedule, null);

  const schedule = newSchedule();
  serviceGives({ ...SAVED, instructions: null, schedule });
  assert.deepEqual((await SavedReports.open('report-1')).schedule, schedule);
});

test('what is not a report that the page can show is refused, so that it cannot break the page', async () => {
  for (const json of [
    null, [], {}, { ...SAVED, id: 1 }, { ...SAVED, name: undefined }, { ...SAVED, periodId: 'last99' },
    { ...SAVED, periodId: undefined }, { ...SAVED, template: null }, { ...SAVED, template: {} },
    { ...SAVED, template: { widgets: {} } },
  ]) {
    serviceGives(json);
    await assert.rejects(SavedReports.open('report-1'), /The saved report is not valid/, JSON.stringify(json));
  }
});
