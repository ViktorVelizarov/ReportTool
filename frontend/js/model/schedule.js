/**
 * The schedule of a report: when the studio makes the report by itself, who is reminded to check it (the report admin),
 * and who gets it, with what subject, message and files. When is an event of OpenRemote's calendar, { start, end,
 * recurrence }, the format that the manager's scheduler edits: start is the first time the report is made, end is when
 * that occurrence ends (which a report does not need) and recurrence is the rule (RFC 5545) that repeats it. The times
 * are those of the browser's time zone. Nothing runs yet; this is what the dialog shows and what the service will need
 * to know.
 */

import { RRule } from '../../vendor/rrule.js';
import { downloadsOf } from '../builder/service/widget-specs.js';
import { formatDate, formatRange, formatTime, plural } from './format.js';
import { HOUR } from './time.js';

/** What a scheduled report can contain; a CSV or PNG file needs a widget that can be downloaded as one. */
export const FORMATS = [
  { id: 'pdf', label: 'PDF report', needs: null },
  { id: 'csv', label: 'CSV data', needs: 'Needs a table widget' },
  { id: 'png', label: 'PNG images', needs: 'Needs a line chart, bar chart or gauge' },
];

/** What can be put into the subject and the message of the email; each is filled in for the report that is made. */
export const PLACEHOLDERS = [
  { id: 'report', label: 'Report name' },
  { id: 'period', label: 'Period' },
  { id: 'date', label: 'Date' },
];

export const SUBJECT_MAX_LENGTH = 150;
export const MESSAGE_MAX_LENGTH = 1000;

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

/** The hour of the day at which a new schedule makes the report. */
const REPORT_HOUR = 8;

/** The start of the coming morning: this morning when it is before 08:00, else tomorrow's. */
function comingMorning(now) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), REPORT_HOUR);
  return today > now ? today : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, REPORT_HOUR);
}

/**
 * The event that stands for "not scheduled": the coming morning, for half an hour. A new schedule has an event of an
 * hour, so that a repeat that is changed into a single time, which keeps its start and its end, is not taken for it.
 */
export function defaultEvent(now = new Date()) {
  const start = comingMorning(now).getTime();
  return { start, end: start + HOUR / 2 };
}

export function newSchedule(now = new Date()) {
  const start = comingMorning(now).getTime();
  return {
    enabled: true,
    event: { start, end: start + HOUR, recurrence: 'FREQ=WEEKLY;BYDAY=MO' },
    admin: '',
    recipients: [],
    subject: '{report}: {period}',
    message: 'Hello,\n\nattached is the {report} for {period}.\n\nThis email was sent automatically by Report Studio.',
    formats: ['pdf'],
  };
}

/** The event that the scheduler gives back, as the event of a schedule: null when it is the one for "not scheduled". */
export function chosenEvent(event, now = new Date()) {
  const none = defaultEvent(now);
  return !event.recurrence && event.start === none.start && event.end === none.end ? null : event;
}

/**
 * The text of the email with {report}, {period} and {date} filled in for the report that is made at run: the name of
 * the report, the period it covers ({ start, end }) and the date it is made. Other braces stay as they are.
 */
export function fillPlaceholders(text, { name, period, run }) {
  const values = { report: name, period: formatRange(period.start, period.end), date: formatDate(run) };
  return text.replace(/\{(\w+)\}/g, (match, id) => (Object.hasOwn(values, id) ? values[id] : match));
}

/** The ids of the formats that a report with these widgets can be sent as. */
export function availableFormats(widgets) {
  const downloads = new Set(widgets.flatMap(widget => downloadsOf(widget.widgetTypeId)));
  return FORMATS.filter(format => !format.needs || downloads.has(format.id)).map(format => format.id);
}

export const isEmail = text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

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

/**
 * A date as the rules count with it: its time on the wall clock of the browser's time zone, written as UTC. The rule
 * "every Monday at 08:00" is about the clock of the wall, also when summer time starts.
 */
const onWallClock = date => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
  date.getMinutes(), date.getSeconds()));

/** The reverse of onWallClock: the date that a wall clock time written as UTC stands for. */
const fromWallClock = date => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(),
  date.getUTCMinutes(), date.getUTCSeconds());

/**
 * The rule of a repeating event, with the first time of the event, and without its end when withEnd is false. The
 * scheduler writes the end (UNTIL) as the UTC time of the moment that was chosen, without the Z.
 */
function ruleOf(event, withEnd = true) {
  const { until, count, ...options } = RRule.parseString(event.recurrence);
  const end = withEnd ? { ...(count && { count }), ...(until && { until: onWallClock(until) }) } : {};
  return new RRule({ ...options, ...end, dtstart: onWallClock(new Date(event.start)) });
}

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

/** "Every week on Monday at 08:00", "Every day at 08:00 until 31 Dec 2026" or "Once on 5 Oct 2026 at 08:00". */
export function describeSchedule({ event }) {
  if (!event) return 'Not scheduled';
  const start = new Date(event.start);
  const time = formatTime(start);
  if (!event.recurrence) return `Once on ${formatDate(start)} at ${time}`;
  const { count, until } = RRule.parseString(event.recurrence);
  const end = (count && ` for ${plural(count, 'time')}`) || (until && ` until ${formatDate(until)}`) || '';
  return `${capitalize(ruleOf(event, false).toText())} at ${time}${end}`;
}

/** "PDF and CSV files to 2 recipients". */
export function describeDelivery({ formats, recipients }) {
  const names = FORMATS.filter(({ id }) => formats.includes(id)).map(({ id }) => id.toUpperCase());
  const joined = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
  return `${joined} ${names.length > 1 ? 'files' : 'file'} to ${plural(recipients.length, 'recipient')}`;
}

/** The next moments after `from` at which the schedule makes the report, at most `count`. */
export function nextRuns({ event }, from, count = 3) {
  if (!event) return [];
  const start = new Date(event.start);
  if (!event.recurrence) return start > from ? [start] : [];
  const rule = ruleOf(event);
  const runs = [];
  for (let next = rule.after(onWallClock(from)); next && runs.length < count; next = rule.after(next)) {
    runs.push(fromWallClock(next));
  }
  return runs;
}

/** What stops the schedule from being saved, or null. `now` is the moment that has to be before a report is made. */
export function scheduleProblem(schedule, now = new Date()) {
  if (!schedule.event) return 'Choose when the report is made.';
  if (nextRuns(schedule, now, 1).length === 0) return 'No report is made after now: the schedule has ended.';
  if (!schedule.admin) return 'Enter the email address of the report admin.';
  if (!isEmail(schedule.admin)) return `${schedule.admin} is not a valid email address for the report admin.`;
  if (schedule.recipients.length === 0) return 'Add at least one recipient.';
  if (!schedule.subject.trim()) return 'Write a subject for the email.';
  if (schedule.formats.length === 0) return 'Choose at least one file to send.';
  return null;
}
