/** The time frames of a report: presets only, relative to the date the report is made. */

import { DAY, HOUR, SECOND } from './time.js';

/** The labels are short, as the select of the toolbar is: the last month and the last quarter are calendar ones. */
export const PERIODS = [
  { id: 'last7', label: 'Last 7 days' },
  { id: 'last30', label: 'Last 30 days' },
  { id: 'last90', label: 'Last 90 days' },
  { id: 'lastMonth', label: 'Last month' },
  { id: 'lastQuarter', label: 'Last quarter' },
];

function bounds(id, now) {
  const year = now.getFullYear();
  const month = now.getMonth();
  switch (id) {
    case 'lastMonth':
      return [new Date(year, month - 1, 1), new Date(new Date(year, month, 1).getTime() - 1)];
    case 'lastQuarter': {
      const quarterStart = Math.floor(month / 3) * 3;
      return [new Date(year, quarterStart - 3, 1), new Date(new Date(year, quarterStart, 1).getTime() - 1)];
    }
    default: {
      const days = { last7: 7, last30: 30, last90: 90 }[id];
      if (!days) throw new Error(`Unknown period: ${id}`);
      const end = new Date(Math.floor(now.getTime() / HOUR) * HOUR);
      return [new Date(end.getTime() - days * DAY), end];
    }
  }
}

/** The window for a preset, as of now: { id, label, start, end }. */
export function resolvePeriod(id, now = new Date()) {
  const [start, end] = bounds(id, now);
  return { id, label: PERIODS.find(period => period.id === id).label, start, end };
}

/** Whether a moment is the first moment of a calendar month, in the time zone of the browser. */
function startsMonth(at) {
  const date = new Date(at);
  return at === new Date(date.getFullYear(), date.getMonth(), 1).getTime();
}

/**
 * The range [from, to] in milliseconds that ends right before the given range starts, to compare it with. A range of
 * whole calendar months, as the last month and the last quarter are, has the same number of calendar months before it:
 * September before October, however long each is and wherever summer time ends. Any other range has one of the same
 * length before it. A range ends at its last millisecond (a calendar month) or at the moment the next one starts (the
 * last 7 days, which end on the hour); its length in whole seconds is the same for both, so the range before starts at
 * the same time of day as the range, and a range that starts at midnight has one before it that starts at midnight too.
 */
export function previousRange([from, to]) {
  if (startsMonth(from) && startsMonth(to + 1)) {
    const [start, next] = [new Date(from), new Date(to + 1)];
    const months = (next.getFullYear() - start.getFullYear()) * 12 + next.getMonth() - start.getMonth();
    return [new Date(start.getFullYear(), start.getMonth() - months, 1).getTime(), from - 1];
  }
  const length = Math.round((to - from) / SECOND) * SECOND;
  return [from - length, from - 1];
}
