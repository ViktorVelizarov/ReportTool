/** Figures computed from data points: [{ x: timestamp, y: value }], oldest first. */

import { DAY } from './time.js';

export function summarize(points) {
  if (!points.length) return null;
  let min = points[0];
  let max = points[0];
  let sum = 0;
  for (const point of points) {
    sum += point.y;
    if (point.y < min.y) min = point;
    if (point.y > max.y) max = point;
  }
  const latest = points.at(-1);
  return {
    count: points.length,
    mean: sum / points.length,
    min: min.y, minAt: min.x,
    max: max.y, maxAt: max.x,
    first: points[0].y,
    latest: latest.y, latestAt: latest.x,
  };
}

/** Change from previous to current in percent, or null when there is nothing to compare with. */
export function percentChange(current, previous) {
  if (previous == null || previous === 0) return null;
  return (current - previous) / Math.abs(previous) * 100;
}

/** The number with a plus sign when it is above zero; a zero is never negative. */
const signed = number => `${number > 0 ? '+' : ''}${number || 0}`;

/**
 * The change from the first to the latest data point as OpenRemote's KPI card (or-attribute-card) shows it under its
 * value: the difference as a whole number ("+3", "-2", "0"), or with asPercentage as a whole percentage of the first
 * value ("+12%"). The card shows 0% when one of the two values is 0, and so does this.
 */
export function cardChange({ first, latest }, asPercentage) {
  if (!asPercentage) return signed(Math.round(latest - first));
  return `${signed(first && latest ? Math.round((latest - first) / first * 100) : 0)}%`;
}

// --- What else the data points of a time frame say, for the prompt of the AI ---

/** How many standard deviations from the average a measurement is when it is outside the usual range. */
export const UNUSUAL_DEVIATIONS = 3;

/** A pause between two measurements is a time without data when it is this many times the usual pause, or more. */
const GAP_FACTOR = 3;

/** The fewest measurements that a usual range is worked out from. */
const MIN_FOR_RANGE = 10;

/** The fewest measurements in a row with the same value that count as a value that did not change. */
const MIN_UNCHANGED = 6;

/** The fewest measurements in an hour of the day or in a day that an average of it is taken from. */
const MIN_IN_GROUP = 2;

/** The halves of a time frame differ when their averages are this many standard deviations apart, or more. */
const TREND_DEVIATIONS = 0.5;

const average = values => values.reduce((sum, value) => sum + value, 0) / values.length;

function standardDeviation(values, mean) {
  return Math.sqrt(average(values.map(value => (value - mean) ** 2)));
}

function median(values) {
  const sorted = values.toSorted((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

/** The usual time between two measurements in a row: the median. Null with fewer than two measurements. */
function usualPause(points) {
  const pauses = points.slice(1).map((point, index) => point.x - points[index].x);
  return pauses.length ? median(pauses) : null;
}

/**
 * How long each measurement stands: until the next one, the last one until the end of the time frame. A measurement
 * stands at most as long as a pause that is not yet a time without data.
 */
function standingTimes(points, end, pause) {
  const longest = GAP_FACTOR * pause;
  return points.map((point, index) => {
    const next = index + 1 < points.length ? points[index + 1].x : Math.max(end, point.x);
    return Math.min(next - point.x, longest);
  });
}

/**
 * The biggest rise and the biggest drop between two measurements in a row: { change, from, to }, or null. Two
 * measurements with a time without data between them are not compared: what changed between them was not sudden.
 */
function biggestSteps(points, pause) {
  const longest = pause ? GAP_FACTOR * pause : Infinity;
  let rise = null;
  let drop = null;
  for (let index = 1; index < points.length; index++) {
    if (points[index].x - points[index - 1].x >= longest) continue;
    const step = { change: points[index].y - points[index - 1].y, from: points[index - 1].x, to: points[index].x };
    if (step.change > 0 && (!rise || step.change > rise.change)) rise = step;
    if (step.change < 0 && (!drop || step.change < drop.change)) drop = step;
  }
  return { rise, drop };
}

/**
 * The averages of the first and the second half of the time frame, and the trend that they make: rising, falling, or
 * steady when they are less than TREND_DEVIATIONS standard deviations apart. Null without two measurements in each
 * half.
 */
function trendOf(points, [from, to], deviation) {
  const middle = from + (to - from) / 2;
  const first = points.filter(point => point.x < middle).map(point => point.y);
  const second = points.filter(point => point.x >= middle).map(point => point.y);
  if (first.length < 2 || second.length < 2) return null;
  const firstHalf = average(first);
  const secondHalf = average(second);
  const steady = deviation === 0 || Math.abs(secondHalf - firstHalf) < TREND_DEVIATIONS * deviation;
  return { direction: steady ? 'steady' : secondHalf > firstHalf ? 'rising' : 'falling', firstHalf, secondHalf };
}

function groupBy(points, keyOf) {
  const groups = new Map();
  for (const point of points) {
    const key = keyOf(point.x);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(point.y);
  }
  return groups;
}

/**
 * The groups with the highest and the lowest average: { highest: { key, mean }, lowest }. A group of one measurement
 * has no average to speak of and is left out. Null when fewer than two groups are left.
 */
function extremesOf(groups) {
  const means = [...groups].filter(([, values]) => values.length >= MIN_IN_GROUP)
    .map(([key, values]) => ({ key, mean: average(values) }));
  if (means.length < 2) return null;
  const byMean = means.toSorted((a, b) => a.mean - b.mean || a.key - b.key);
  return { highest: byMean.at(-1), lowest: byMean[0] };
}

/**
 * The hours of the day (0 to 23, in the time zone of the browser) with the highest and the lowest average. Only when
 * the measurements span two days or more, so that each hour can come more than once.
 */
function byHourOfDay(points) {
  if (points.at(-1).x - points[0].x < 2 * DAY) return null;
  return extremesOf(groupBy(points, at => new Date(at).getHours()));
}

const startOfDay = at => {
  const date = new Date(at);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

const startOfNextDay = start => {
  const date = new Date(start);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
};

/**
 * The whole days (the start of the day, in the time zone of the browser) with the highest and the lowest average. A
 * day that the time frame covers only in part is left out: its average would be that of some hours only.
 */
function byWholeDay(points, [from, to]) {
  const whole = points.filter(point => {
    const start = startOfDay(point.x);
    return start >= from && startOfNextDay(start) - 1 <= to;
  });
  return whole.length ? extremesOf(groupBy(whole, startOfDay)) : null;
}

/**
 * The usual range of the values, their average plus or minus UNUSUAL_DEVIATIONS standard deviations, and the
 * measurements outside it: how many, how long they stood in all, and the longest stretch of them in a row (from its
 * first to its last measurement). Null with too few measurements, or when all values are the same.
 */
function unusualOf(points, standing, mean, deviation) {
  if (points.length < MIN_FOR_RANGE || deviation === 0) return null;
  const low = mean - UNUSUAL_DEVIATIONS * deviation;
  const high = mean + UNUSUAL_DEVIATIONS * deviation;
  let count = 0;
  let time = 0;
  let longest = null;
  let run = null;
  points.forEach((point, index) => {
    if (point.y >= low && point.y <= high) {
      run = null;
      return;
    }
    count += 1;
    time += standing[index];
    run = run
      ? { ...run, to: point.x, count: run.count + 1, time: run.time + standing[index] }
      : { from: point.x, to: point.x, count: 1, time: standing[index] };
    if (!longest || run.time > longest.time) longest = run;
  });
  return { low, high, count, total: points.length, time, longest };
}

/**
 * The longest time without measurements, also at the start and at the end of the time frame: { from, to, duration },
 * or null when no pause is GAP_FACTOR times the usual pause or longer.
 */
function longestGap(points, [from, to], pause) {
  if (!pause) return null;
  const times = [Math.min(from, points[0].x), ...points.map(point => point.x), Math.max(to, points.at(-1).x)];
  let longest = null;
  for (let index = 1; index < times.length; index++) {
    const duration = times[index] - times[index - 1];
    if (!longest || duration > longest.duration) longest = { from: times[index - 1], to: times[index], duration };
  }
  return longest.duration >= GAP_FACTOR * pause ? longest : null;
}

/** The longest stretch of measurements in a row with the same value: { value, from, to, count }, or null. */
function longestUnchanged(points) {
  let longest = null;
  let start = 0;
  for (let index = 1; index <= points.length; index++) {
    if (index < points.length && points[index].y === points[start].y) continue;
    const count = index - start;
    if (count >= MIN_UNCHANGED && (!longest || count > longest.count)) {
      longest = { value: points[start].y, from: points[start].x, to: points[index - 1].x, count };
    }
    start = index;
  }
  return longest;
}

/**
 * What else the data points of a time frame [from, to] say, for the prompt of the AI: the biggest rise and drop between
 * two measurements in a row (rise, drop), the trend from the first half of the time frame to the second, the hours of
 * the day and the whole days with the highest and the lowest average (byHour, byDay), the usual range and the
 * measurements outside it (unusual), the longest time without measurements (gap) and the longest stretch with the same
 * value (unchanged). Each is null when there is too little data for it, or nothing to say. Null without data points.
 */
export function analyze(points, range) {
  if (!points.length) return null;
  const values = points.map(point => point.y);
  const mean = average(values);
  const deviation = standardDeviation(values, mean);
  const pause = usualPause(points);
  return {
    ...biggestSteps(points, pause),
    trend: trendOf(points, range, deviation),
    byHour: byHourOfDay(points),
    byDay: byWholeDay(points, range),
    unusual: unusualOf(points, standingTimes(points, range[1], pause ?? 0), mean, deviation),
    gap: longestGap(points, range, pause),
    unchanged: longestUnchanged(points),
  };
}
