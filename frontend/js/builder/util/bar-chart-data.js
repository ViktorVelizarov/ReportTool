/*
 * The numbers behind the bars of the bar chart: the intervals the bars stand for and the methods that make one value of
 * the data points in an interval. After what OpenRemote's or-attribute-barchart does.
 */

import { DAY } from '../../model/time.js';

/** The methods that make one value of the data points in an interval, by the key in the attribute settings. */
export const BAR_METHODS = {
  methodAvgAttributes: values => values.reduce((sum, value) => sum + value, 0) / values.length,
  methodCountAttributes: values => values.length,
  methodDifferenceAttributes: values => values.at(-1) - values[0],
  methodMaxAttributes: values => Math.max(...values),
  methodMedianAttributes: values => {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  },
  methodMinAttributes: values => Math.min(...values),
  methodModeAttributes: values => {
    const counts = new Map();
    values.forEach(value => counts.set(value, (counts.get(value) ?? 0) + 1));
    return [...counts].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0];
  },
  methodSumAttributes: values => values.reduce((sum, value) => sum + value, 0),
};

const MONDAY_OFFSET = 4 * DAY; // the epoch is a Thursday

/** The start of the interval that a moment is in; weeks start on Monday, months and years follow the calendar. */
export function bucketStart(timestamp, interval) {
  switch (interval.unit) {
    case 'week': return Math.floor((timestamp - MONDAY_OFFSET) / interval.millis) * interval.millis + MONDAY_OFFSET;
    case 'month': { const date = new Date(timestamp); return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1); }
    case 'year': return Date.UTC(new Date(timestamp).getUTCFullYear(), 0, 1);
    default: return Math.floor(timestamp / interval.millis) * interval.millis;
  }
}

/** The start of the interval after the one that starts at start. */
export function nextBucket(start, interval) {
  if (interval.unit === 'month') {
    const date = new Date(start);
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
  }
  if (interval.unit === 'year') return Date.UTC(new Date(start).getUTCFullYear() + 1, 0, 1);
  return start + interval.millis;
}

/** The label of a bar on the axis, as short as the interval allows. */
export function bucketLabel(start, interval, rangeMs) {
  const date = new Date(start);
  const options = {
    minute: rangeMs > 2 * DAY ? { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }
      : { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
    hour: rangeMs > 2 * DAY ? { day: 'numeric', month: 'short', hour: '2-digit', hourCycle: 'h23' }
      : { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
    day: { day: 'numeric', month: 'short' },
    week: { day: 'numeric', month: 'short' },
    month: { month: 'short', year: 'numeric' },
    year: { year: 'numeric' },
  }[interval.unit];
  return date.toLocaleString('en-GB', { ...options, timeZone: 'UTC' });
}

/** The keys of the methods, in the order of the method dialog. */
export const BAR_METHOD_KEYS = Object.keys(BAR_METHODS);
