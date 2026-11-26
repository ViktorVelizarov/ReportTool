/** The time frames of a report: presets only, relative to the date the report is made. */

import { DAY, HOUR } from './time.js';

export const PERIODS = [
  { id: 'last7', label: 'Last 7 days' },
  { id: 'last30', label: 'Last 30 days' },
  { id: 'last90', label: 'Last 90 days' },
  { id: 'lastMonth', label: 'Last calendar month' },
  { id: 'lastQuarter', label: 'Last calendar quarter' },
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

/** The range [from, to] in milliseconds of the same length that ends right before the given range starts. */
export function previousRange([from, to]) {
  return [from - (to - from) - 1, from - 1];
}
