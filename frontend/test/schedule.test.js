import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  addRecipients, availableFormats, describeDelivery, describeSchedule, monthDayLabel, newSchedule, nextRuns,
  scheduleProblem,
} from '../js/model/schedule.js';

process.env.TZ = 'UTC';

const weekly = (weekdays, time = '08:00') => ({ ...newSchedule(), frequency: 'weekly', weekdays, time });
const monthly = (dayOfMonth, time = '08:00') => ({ ...newSchedule(), frequency: 'monthly', dayOfMonth, time });
const daily = (time = '08:00') => ({ ...newSchedule(), frequency: 'daily', time });

/** The runs as 'YYYY-MM-DD HH:MM' in UTC, which is the time zone of these tests. */
const stamps = runs => runs.map(run => run.toISOString().slice(0, 16).replace('T', ' '));

// Sunday 4 October 2026, 15:30
const NOW = new Date('2026-10-04T15:30:00Z');

test('a new schedule is on, weekly on Monday at 08:00, for a PDF, and has nobody to send to yet', () => {
  assert.deepEqual(newSchedule(), {
    enabled: true, frequency: 'weekly', weekdays: [1], dayOfMonth: 1, time: '08:00', recipients: [], formats: ['pdf'],
  });
  assert.notEqual(newSchedule().weekdays, newSchedule().weekdays, 'every schedule has lists of its own');
});

test('a schedule says in words when it runs', () => {
  assert.equal(describeSchedule(daily('06:30')), 'Every day at 06:30');
  assert.equal(describeSchedule(weekly([1])), 'Every Monday at 08:00');
  assert.equal(describeSchedule(weekly([5, 1, 3])), 'Every Monday, Wednesday and Friday at 08:00');
  assert.equal(describeSchedule(weekly([4, 0], '17:00')), 'Every Thursday and Sunday at 17:00');
  assert.equal(describeSchedule(weekly([0, 1, 2, 3, 4, 5, 6])), 'Every day at 08:00');
  assert.equal(describeSchedule(monthly(1)), 'On the 1st of every month at 08:00');
  assert.equal(describeSchedule(monthly(22)), 'On the 22nd of every month at 08:00');
  assert.equal(describeSchedule(monthly('last')), 'On the last day of every month at 08:00');
});

test('the days of the month are written with their ordinal', () => {
  const labels = [1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 28, 'last'].map(monthDayLabel);

  assert.deepEqual(labels,
    ['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '23rd', '28th', 'Last day']);
});

test('the next runs of a daily schedule start today when the time has not passed', () => {
  assert.deepEqual(stamps(nextRuns(daily('18:00'), NOW)), ['2026-10-04 18:00', '2026-10-05 18:00', '2026-10-06 18:00']);
  assert.deepEqual(stamps(nextRuns(daily('08:00'), NOW)), ['2026-10-05 08:00', '2026-10-06 08:00', '2026-10-07 08:00']);
});

test('a run at this very moment is not a next run', () => {
  assert.deepEqual(stamps(nextRuns(daily('15:30'), NOW, 1)), ['2026-10-05 15:30']);
});

test('the next runs of a weekly schedule are on the chosen days, in date order', () => {
  assert.deepEqual(stamps(nextRuns(weekly([1]), NOW)), ['2026-10-05 08:00', '2026-10-12 08:00', '2026-10-19 08:00']);
  assert.deepEqual(stamps(nextRuns(weekly([5, 1]), NOW, 4)),
    ['2026-10-05 08:00', '2026-10-09 08:00', '2026-10-12 08:00', '2026-10-16 08:00']);
});

test('the next runs of a monthly schedule are on the chosen day, also over the end of a year', () => {
  assert.deepEqual(stamps(nextRuns(monthly(15), NOW)), ['2026-10-15 08:00', '2026-11-15 08:00', '2026-12-15 08:00']);
  assert.deepEqual(stamps(nextRuns(monthly(1), new Date('2026-11-20T10:00:00Z'))),
    ['2026-12-01 08:00', '2027-01-01 08:00', '2027-02-01 08:00']);
});

test('the last day of the month is the 28th in February and the 31st in March', () => {
  assert.deepEqual(stamps(nextRuns(monthly('last'), new Date('2027-01-31T12:00:00Z'))),
    ['2027-02-28 08:00', '2027-03-31 08:00', '2027-04-30 08:00']);
  assert.deepEqual(stamps(nextRuns(monthly('last'), new Date('2028-02-10T12:00:00Z'), 1)), ['2028-02-29 08:00']);
});

test('a schedule without a day never runs', () => {
  assert.deepEqual(nextRuns(weekly([]), NOW), []);
});

test('the formats of a report depend on its widgets: a PDF always, a CSV or PNG when a widget gives one', () => {
  const widgets = types => types.map(widgetTypeId => ({ widgetTypeId }));

  assert.deepEqual(availableFormats(widgets(['kpi', 'image'])), ['pdf']);
  assert.deepEqual(availableFormats(widgets(['table'])), ['pdf', 'csv']);
  assert.deepEqual(availableFormats(widgets(['gauge', 'table', 'linechart'])), ['pdf', 'csv', 'png']);
});

test('what is sent, and to how many, is said in words', () => {
  const two = ['a@example.com', 'b@example.com'];

  assert.equal(describeDelivery({ formats: ['pdf'], recipients: two.slice(0, 1) }), 'PDF file to 1 recipient');
  assert.equal(describeDelivery({ formats: ['png', 'pdf'], recipients: two }), 'PDF and PNG files to 2 recipients');
  assert.equal(describeDelivery({ formats: ['png', 'csv', 'pdf'], recipients: two }),
    'PDF, CSV and PNG files to 2 recipients');
});

test('an address has a name, an @ and a domain with a dot', () => {
  const { recipients, rejected } = addRecipients([],
    'anna.k@example.com ops+reports@plant.example.org anna anna@example anna@@example.com');

  assert.deepEqual(recipients, ['anna.k@example.com', 'ops+reports@plant.example.org']);
  assert.deepEqual(rejected, ['anna', 'anna@example', 'anna@@example.com']);
});

test('addresses are taken from a text with spaces, commas or semicolons, and doubles are left out', () => {
  const first = addRecipients([], 'anna@example.com, bob@example.com; ANNA@example.com');
  assert.deepEqual(first, { recipients: ['anna@example.com', 'bob@example.com'], rejected: [] });

  const second = addRecipients(first.recipients, 'bob@example.com carol@example.com not-an-address');
  assert.deepEqual(second.recipients, ['anna@example.com', 'bob@example.com', 'carol@example.com']);
  assert.deepEqual(second.rejected, ['not-an-address']);

  assert.deepEqual(addRecipients(['anna@example.com'], '  '), { recipients: ['anna@example.com'], rejected: [] });
});

test('a schedule can only be saved with a time, a day, a recipient and a file', () => {
  const ready = { ...weekly([1]), recipients: ['ops@example.com'] };
  assert.equal(scheduleProblem(ready), null);

  assert.equal(scheduleProblem({ ...ready, time: '' }), 'Set the time of day.');
  assert.equal(scheduleProblem({ ...ready, weekdays: [] }), 'Choose at least one day of the week.');
  assert.equal(scheduleProblem({ ...ready, recipients: [] }), 'Add at least one recipient.');
  assert.equal(scheduleProblem({ ...ready, formats: [] }), 'Choose at least one file to send.');
  assert.equal(scheduleProblem({ ...ready, frequency: 'daily', weekdays: [] }), null, 'daily needs no weekday');
});
