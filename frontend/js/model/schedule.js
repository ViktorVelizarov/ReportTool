/**
 * The schedule of a report: when the studio makes the report by itself, and who gets it. The times are those of the
 * browser's time zone. Nothing runs yet; this is what the dialog shows and what the service will need to know.
 */

import { downloadsOf } from '../builder/service/widget-specs.js';
import { plural } from './format.js';

export const FREQUENCIES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
];

/** Monday first; day is the number that Date.getDay() gives. */
export const WEEKDAYS = [
  { day: 1, short: 'Mon', name: 'Monday' },
  { day: 2, short: 'Tue', name: 'Tuesday' },
  { day: 3, short: 'Wed', name: 'Wednesday' },
  { day: 4, short: 'Thu', name: 'Thursday' },
  { day: 5, short: 'Fri', name: 'Friday' },
  { day: 6, short: 'Sat', name: 'Saturday' },
  { day: 0, short: 'Sun', name: 'Sunday' },
];

/** What a scheduled report can contain; a CSV or PNG file needs a widget that can be downloaded as one. */
export const FORMATS = [
  { id: 'pdf', label: 'PDF report', needs: null },
  { id: 'csv', label: 'CSV data', needs: 'Needs a table widget' },
  { id: 'png', label: 'PNG images', needs: 'Needs a line chart, bar chart or gauge' },
];

/** The days of a month that can be chosen: not the 29th to the 31st, which not every month has, but 'last'. */
export const MONTH_DAYS = [...Array.from({ length: 28 }, (_, index) => index + 1), 'last'];

/** The longest a search for the next run goes on; a schedule that never runs, such as no weekday, finds nothing. */
const SEARCH_DAYS = 400;

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const newSchedule = () => ({
  enabled: true,
  frequency: 'weekly',
  weekdays: [1],
  dayOfMonth: 1,
  time: '08:00',
  recipients: [],
  formats: ['pdf'],
});

/** The ids of the formats that a report with these widgets can be sent as. */
export function availableFormats(widgets) {
  const downloads = new Set(widgets.flatMap(widget => downloadsOf(widget.widgetTypeId)));
  return FORMATS.filter(format => !format.needs || downloads.has(format.id)).map(format => format.id);
}

const isEmail = text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

/**
 * Adds the addresses in the text, which are separated by spaces, commas or semicolons, to the recipients. Returns the
 * new recipients, without doubles (the case does not count), and the parts of the text that are not an address.
 */
export function addRecipients(recipients, text) {
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  const result = [...recipients];
  for (const address of parts.filter(isEmail)) {
    if (!result.some(known => known.toLowerCase() === address.toLowerCase())) result.push(address);
  }
  return { recipients: result, rejected: parts.filter(part => !isEmail(part)) };
}

/** What stops the schedule from being saved, or null. */
export function scheduleProblem(schedule) {
  if (!/^\d{2}:\d{2}$/.test(schedule.time)) return 'Set the time of day.';
  if (schedule.frequency === 'weekly' && schedule.weekdays.length === 0) return 'Choose at least one day of the week.';
  if (schedule.recipients.length === 0) return 'Add at least one recipient.';
  if (schedule.formats.length === 0) return 'Choose at least one file to send.';
  return null;
}

const ordinal = number => {
  const suffix = [11, 12, 13].includes(number % 100) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] ?? 'th');
  return `${number}${suffix}`;
};

const joinNames = names => (names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0]);

/** The label of a day in the list of days of a month: '1st', '2nd', ... 'Last day'. */
export const monthDayLabel = day => (day === 'last' ? 'Last day' : ordinal(day));

/** "Every Monday and Thursday at 08:00". */
export function describeSchedule({ frequency, weekdays, dayOfMonth, time }) {
  if (frequency === 'daily' || (frequency === 'weekly' && weekdays.length === WEEKDAYS.length)) {
    return `Every day at ${time}`;
  }
  if (frequency === 'weekly') {
    const names = WEEKDAYS.filter(({ day }) => weekdays.includes(day)).map(({ name }) => name);
    return `Every ${joinNames(names)} at ${time}`;
  }
  const day = dayOfMonth === 'last' ? 'the last day' : `the ${ordinal(dayOfMonth)}`;
  return `On ${day} of every month at ${time}`;
}

/** "PDF and CSV files to 2 recipients". */
export function describeDelivery({ formats, recipients }) {
  const names = FORMATS.filter(({ id }) => formats.includes(id)).map(({ id }) => id.toUpperCase());
  return `${joinNames(names)} ${names.length > 1 ? 'files' : 'file'} to ${plural(recipients.length, 'recipient')}`;
}

function runsOn({ frequency, weekdays, dayOfMonth }, date) {
  switch (frequency) {
    case 'daily':
      return true;
    case 'weekly':
      return weekdays.includes(date.getDay());
    case 'monthly':
      return date.getDate() === (dayOfMonth === 'last'
        ? new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        : dayOfMonth);
    default:
      throw new Error(`Unknown frequency: ${frequency}`);
  }
}

/** The next moments after `from` at which the schedule makes the report, at most `count`. */
export function nextRuns(schedule, from, count = 3) {
  const [hour, minute] = schedule.time.split(':').map(Number);
  const runs = [];
  for (let offset = 0; runs.length < count && offset <= SEARCH_DAYS; offset++) {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    if (!runsOn(schedule, date)) continue;
    const run = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
    if (run > from) runs.push(run);
  }
  return runs;
}
