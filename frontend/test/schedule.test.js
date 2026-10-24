import assert from 'node:assert/strict';
import { test } from 'node:test';

import { HOUR } from '../js/model/time.js';
import {
  addRecipients, availableFormats, chosenEvent, defaultEvent, describeDelivery, describeSchedule, fillPlaceholders,
  newSchedule, nextRuns, PLACEHOLDERS, scheduleProblem,
} from '../js/model/schedule.js';

process.env.TZ = 'UTC';

// Sunday 4 October 2026, 15:30
const NOW = new Date('2026-10-04T15:30:00Z');

/** A schedule that makes the report at the start (UTC) and repeats by the rule, the way the scheduler writes it. */
const repeating = (recurrence, start = '2026-10-01T08:00:00Z') => ({
  ...newSchedule(NOW),
  event: { start: Date.parse(start), end: Date.parse(start) + HOUR, recurrence },
});
const once = start => ({ ...newSchedule(NOW), event: { start: Date.parse(start), end: Date.parse(start) + HOUR } });

/** The runs as 'YYYY-MM-DD HH:MM' in UTC, which is the time zone of these tests. */
const stamps = runs => runs.map(run => run.toISOString().slice(0, 16).replace('T', ' '));

test('a new schedule is on, every Monday at 08:00 from tomorrow, for a PDF, with no admin or recipients', () => {
  assert.deepEqual(newSchedule(NOW), {
    enabled: true,
    event: {
      start: Date.parse('2026-10-05T08:00:00Z'),
      end: Date.parse('2026-10-05T09:00:00Z'),
      recurrence: 'FREQ=WEEKLY;BYDAY=MO',
    },
    admin: '',
    recipients: [],
    subject: '{report}: {period}',
    message: 'Hello,\n\nattached is the {report} for {period}.\n\nThis email was sent automatically by Report Studio.',
    formats: ['pdf'],
  });
  assert.notEqual(newSchedule().recipients, newSchedule().recipients, 'every schedule has lists of its own');
  assert.notEqual(newSchedule().event, newSchedule().event);
});

test('"not scheduled" is the event of the coming morning, and the scheduler gives it back as no event', () => {
  assert.deepEqual(defaultEvent(NOW),
    { start: Date.parse('2026-10-05T08:00:00Z'), end: Date.parse('2026-10-05T08:30:00Z') });
  const early = defaultEvent(new Date('2026-10-04T06:15:00Z'));
  assert.deepEqual(early, { start: Date.parse('2026-10-04T08:00:00Z'), end: Date.parse('2026-10-04T08:30:00Z') });
  assert.deepEqual(defaultEvent(new Date('2026-10-04T08:00:00Z')).start, Date.parse('2026-10-05T08:00:00Z'),
    'at 08:00 sharp the morning has begun');
  assert.equal(chosenEvent({ ...defaultEvent(NOW), recurrence: undefined }, NOW), null);

  const later = once('2026-10-09T08:00:00Z').event;
  assert.equal(chosenEvent(later, NOW), later);
  const weekly = newSchedule(NOW).event;
  assert.equal(chosenEvent(weekly, NOW), weekly);
});

test('a repeat of a new schedule that is changed into a single time is an event, not "not scheduled"', () => {
  const { start, end } = newSchedule(NOW).event;

  assert.deepEqual(chosenEvent({ start, end }, NOW), { start, end });
});

test('a schedule says in words when it runs', () => {
  const says = recurrence => describeSchedule(repeating(recurrence));

  assert.equal(describeSchedule({ event: null }), 'Not scheduled');
  assert.equal(says('FREQ=DAILY'), 'Every day at 08:00');
  assert.equal(says('FREQ=DAILY;INTERVAL=2'), 'Every 2 days at 08:00');
  assert.equal(says('FREQ=WEEKLY;BYDAY=MO'), 'Every week on Monday at 08:00');
  assert.equal(says('FREQ=WEEKLY;BYDAY=MO,WE'), 'Every week on Monday, Wednesday at 08:00');
  assert.equal(says('FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'), 'Every weekday at 08:00');
  assert.equal(says('FREQ=MONTHLY;BYMONTHDAY=1,15'), 'Every month on the 1st and 15th at 08:00');
  assert.equal(says('FREQ=YEARLY'), 'Every year at 08:00');
  assert.equal(describeSchedule(once('2026-10-09T17:30:00Z')), 'Once on 9 Oct 2026 at 17:30');
});

test('the end of a schedule is said after the time', () => {
  assert.equal(describeSchedule(repeating('FREQ=WEEKLY;BYDAY=MO;COUNT=5')),
    'Every week on Monday at 08:00 for 5 times');
  assert.equal(describeSchedule(repeating('FREQ=DAILY;UNTIL=20261231T225900')),
    'Every day at 08:00 until 31 Dec 2026');
});

test('the next runs of a daily schedule start today when the time has not passed', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=DAILY', '2026-10-01T18:00:00Z'), NOW)),
    ['2026-10-04 18:00', '2026-10-05 18:00', '2026-10-06 18:00']);
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=DAILY'), NOW)),
    ['2026-10-05 08:00', '2026-10-06 08:00', '2026-10-07 08:00']);
});

test('a run at this very moment is not a next run', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=DAILY', '2026-10-01T15:30:00Z'), NOW, 1)), ['2026-10-05 15:30']);
});

test('a schedule does not run before its start', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=DAILY', '2026-10-10T08:00:00Z'), NOW, 2)),
    ['2026-10-10 08:00', '2026-10-11 08:00']);
});

test('the next runs of a weekly schedule are on the chosen days, in date order', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=WEEKLY;BYDAY=MO'), NOW)),
    ['2026-10-05 08:00', '2026-10-12 08:00', '2026-10-19 08:00']);
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=WEEKLY;BYDAY=FR,MO'), NOW, 4)),
    ['2026-10-05 08:00', '2026-10-09 08:00', '2026-10-12 08:00', '2026-10-16 08:00']);
});

test('every other week is counted from the week of the start', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=WEEKLY;INTERVAL=2;BYDAY=MO', '2026-10-05T08:00:00Z'), NOW)),
    ['2026-10-05 08:00', '2026-10-19 08:00', '2026-11-02 08:00']);
});

test('the next runs of a monthly schedule are on the chosen days, also over the end of a year', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=MONTHLY;BYMONTHDAY=15'), NOW)),
    ['2026-10-15 08:00', '2026-11-15 08:00', '2026-12-15 08:00']);
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=MONTHLY;BYMONTHDAY=1,15'), new Date('2026-12-20T10:00:00Z'))),
    ['2027-01-01 08:00', '2027-01-15 08:00', '2027-02-01 08:00']);
});

test('a month that does not have the chosen day is skipped', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=MONTHLY;BYMONTHDAY=31'), NOW)),
    ['2026-10-31 08:00', '2026-12-31 08:00', '2027-01-31 08:00']);
});

test('a schedule that repeats a number of times ends after the last one', () => {
  assert.deepEqual(stamps(nextRuns(repeating('FREQ=DAILY;COUNT=3', '2026-10-03T08:00:00Z'), NOW)),
    ['2026-10-05 08:00']);
  assert.deepEqual(nextRuns(repeating('FREQ=DAILY;COUNT=2'), NOW), []);
});

test('a schedule that repeats until a moment ends then, on that moment included', () => {
  const until = repeating('FREQ=DAILY;UNTIL=20261007T080000');

  assert.deepEqual(stamps(nextRuns(until, NOW, 5)), ['2026-10-05 08:00', '2026-10-06 08:00', '2026-10-07 08:00']);
});

test('a schedule that runs once runs at its start, if that is to come', () => {
  assert.deepEqual(stamps(nextRuns(once('2026-10-09T08:00:00Z'), NOW)), ['2026-10-09 08:00']);
  assert.deepEqual(nextRuns(once('2026-10-02T08:00:00Z'), NOW), []);
  assert.deepEqual(nextRuns({ event: null }, NOW), []);
});

test('the times of a schedule are those of the wall clock, also when summer time ends', () => {
  process.env.TZ = 'Europe/Amsterdam';
  try {
    const start = new Date(2026, 9, 5, 8).getTime();
    const weekly = { ...newSchedule(), event: { start, end: start + HOUR, recurrence: 'FREQ=WEEKLY;BYDAY=MO' } };
    const runs = nextRuns(weekly, new Date(2026, 9, 14, 12), 3);

    assert.deepEqual(runs.map(run => [run.getDate(), run.getHours(), run.getDay()]),
      [[19, 8, 1], [26, 8, 1], [2, 8, 1]]);
    assert.deepEqual(stamps(runs), ['2026-10-19 06:00', '2026-10-26 07:00', '2026-11-02 07:00']);

    const untilNewYear = { ...weekly, event: { ...weekly.event, recurrence: 'FREQ=DAILY;UNTIL=20261231T225900' } };
    assert.deepEqual(nextRuns(untilNewYear, new Date(2026, 11, 30, 12), 5).map(run => run.getDate()), [31],
      'the last moment is 23:59 on the wall clock of the 31st');
  } finally {
    process.env.TZ = 'UTC';
  }
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

test('a schedule can only be saved with a time to come, a report admin, a recipient, a subject and a file', () => {
  const ready = { ...repeating('FREQ=WEEKLY;BYDAY=MO'), admin: 'admin@example.com', recipients: ['ops@example.com'] };
  assert.equal(scheduleProblem(ready, NOW), null);

  assert.equal(scheduleProblem({ ...ready, event: null }, NOW), 'Choose when the report is made.');
  assert.equal(scheduleProblem({ ...ready, event: once('2026-10-02T08:00:00Z').event }, NOW),
    'No report is made after now: the schedule has ended.');
  assert.equal(scheduleProblem({ ...ready, event: repeating('FREQ=DAILY;COUNT=2').event }, NOW),
    'No report is made after now: the schedule has ended.');
  assert.equal(scheduleProblem({ ...ready, admin: '' }, NOW), 'Enter the email address of the report admin.');
  assert.equal(scheduleProblem({ ...ready, admin: 'admin@example' }, NOW),
    'admin@example is not a valid email address for the report admin.');
  assert.equal(scheduleProblem({ ...ready, recipients: [] }, NOW), 'Add at least one recipient.');
  assert.equal(scheduleProblem({ ...ready, subject: '  ' }, NOW), 'Write a subject for the email.');
  assert.equal(scheduleProblem({ ...ready, formats: [] }, NOW), 'Choose at least one file to send.');
  assert.equal(scheduleProblem({ ...ready, message: '' }, NOW), null, 'the message may be empty');
});

const REPORT_MADE = {
  name: 'Irrigation report',
  period: { start: new Date('2026-09-28T00:00:00Z'), end: new Date('2026-10-04T23:59:59Z') },
  run: new Date('2026-10-05T08:00:00Z'),
};

test('the placeholders of the email are filled in for the report that is made', () => {
  assert.equal(fillPlaceholders('{report}: {period}', REPORT_MADE), 'Irrigation report: 28 Sept – 4 Oct 2026');
  assert.equal(fillPlaceholders('Made {date}: {report}, {report}!', REPORT_MADE),
    'Made 5 Oct 2026: Irrigation report, Irrigation report!');
  const untouched = '{unknown} {constructor} {} {report';
  assert.equal(fillPlaceholders(untouched, REPORT_MADE), untouched);
  assert.equal(fillPlaceholders('', REPORT_MADE), '');
});

test('every placeholder that can be inserted is filled in, and the first email uses only those', () => {
  for (const { id } of PLACEHOLDERS) {
    assert.notEqual(fillPlaceholders(`{${id}}`, REPORT_MADE), `{${id}}`, id);
  }
  const { subject, message } = newSchedule();
  const used = [...`${subject}${message}`.matchAll(/\{(\w+)\}/g)].map(match => match[1]);
  assert.ok(used.length > 0 && used.every(id => PLACEHOLDERS.some(placeholder => placeholder.id === id)));
});
