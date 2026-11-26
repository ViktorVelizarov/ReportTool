/** Figures computed from data points: [{ x: timestamp, y: value }], oldest first. */

import { HOUR } from './time.js';

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
  const mean = sum / points.length;
  return {
    count: points.length,
    mean,
    deviation: standardDeviation(points.map(point => point.y), mean),
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

/** A figure changed notably from the time before when it moved this many standard deviations of the time itself. */
const NOTABLE_DEVIATIONS = 0.5;

/**
 * Which figures of a time (see summarize) changed notably from the time just before, as { mean, min, max }: the
 * average when it moved NOTABLE_DEVIATIONS standard deviations of the time or more, the lowest when it lies that far
 * below the lowest of the time before, and the highest when it lies that far above its highest. In a time in which the
 * value never changed, any change counts.
 */
export function notableChanges(current, previous) {
  const reach = NOTABLE_DEVIATIONS * current.deviation;
  const notable = change => change > 0 && change >= reach;
  return {
    mean: notable(Math.abs(current.mean - previous.mean)),
    min: notable(previous.min - current.min),
    max: notable(current.max - previous.max),
  };
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

/** A pause between two measurements is a time without data when it is this many times the usual pause, or more. */
const GAP_FACTOR = 3;

/** The fewest measurements in a row with the same value that count as a value that did not change. */
const MIN_UNCHANGED = 6;

/**
 * A time without measurements, or in which the value stayed the same, is far longer than usual when it lasts this many
 * times as long as the longest one on a normal day, or longer.
 */
const FAR_LONGER_TIMES = 3;

/** The fewest measurements in a day that an average of it is taken from. */
const MIN_IN_DAY = 2;

/** The fewest whole days that are compared with each other to find the days that stand out. */
const MIN_DAYS = 4;

/**
 * How far outside a normal day (the range in which the middle half of the days lie) the average of a day must lie to
 * stand out, in widths of that range: 3 is what Tukey called "far out".
 */
const STAND_OUT_WIDTHS = 3;

/**
 * The least that the average of a day must differ from the middle day to stand out, in standard deviations of all
 * measurements, so that a small difference does not count when the other days are all much the same.
 */
const STAND_OUT_DEVIATIONS = 0.25;

/** A day has few measurements when it has less than this share of the usual number of measurements in a day. */
const FEW_MEASUREMENTS = 0.75;

/** The halves of a time frame differ when their averages are this many standard deviations apart, or more. */
const TREND_DEVIATIONS = 0.5;

/** The fewest measurements that a level change is looked for in. */
const MIN_FOR_LEVEL = 10;

/** The least share of the measurements on each side of a level change. */
const LEVEL_SIDE = 0.15;

/** A level change leaves at most this share of the scatter that a straight line through the measurements leaves. */
const LEVEL_FIT = 0.5;

/** A level change is at least this many times the scatter that is left around its two levels. */
const LEVEL_SIZE = 3;

const average = values => values.reduce((sum, value) => sum + value, 0) / values.length;

function standardDeviation(values, mean) {
  return Math.sqrt(average(values.map(value => (value - mean) ** 2)));
}

/**
 * The value at the share (0 to 1) of values sorted from low to high, between the two values it falls between: 0.5
 * gives the median, 0.25 and 0.75 the first and the third quartile.
 */
function quantile(sorted, share) {
  const position = (sorted.length - 1) * share;
  const below = Math.floor(position);
  return sorted[below] + (sorted[Math.ceil(position)] - sorted[below]) * (position - below);
}

const median = values => quantile(values.toSorted((a, b) => a - b), 0.5);

/** The usual time between two measurements in a row: the median. Null with fewer than two measurements. */
function usualPause(points) {
  const pauses = points.slice(1).map((point, index) => point.x - points[index].x);
  return pauses.length ? median(pauses) : null;
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

/** The scatter that the best straight line through the measurements leaves: the sum of the squared distances to it. */
function straightLineScatter(points) {
  const times = points.map(point => (point.x - points[0].x) / HOUR);
  const values = points.map(point => point.y);
  const [meanTime, meanValue] = [average(times), average(values)];
  let timeSquares = 0;
  let products = 0;
  let valueSquares = 0;
  times.forEach((time, index) => {
    timeSquares += (time - meanTime) ** 2;
    products += (time - meanTime) * (values[index] - meanValue);
    valueSquares += (values[index] - meanValue) ** 2;
  });
  return timeSquares ? valueSquares - products ** 2 / timeSquares : valueSquares;
}

/**
 * A moment from which the value stayed at another level: { at, before, after }, with the averages before and after it,
 * or null. Of the moments with at least LEVEL_SIDE of the measurements on each side, the one whose two averages leave
 * the least scatter is taken. It is a level change when that scatter is at most LEVEL_FIT of what a straight line
 * leaves, so that a slow drift or the ups and downs of a day are none, and when the change is at least LEVEL_SIZE times
 * the scatter that is left (as a standard deviation), so that a small shift is none.
 */
function levelChange(points) {
  const count = points.length;
  if (count < MIN_FOR_LEVEL) return null;
  const sums = [0];
  const squares = [0];
  for (const { y } of points) {
    sums.push(sums.at(-1) + y);
    squares.push(squares.at(-1) + y ** 2);
  }
  /** The sum of the squared distances of the values from first up to last to their average. */
  const scatter = (first, last) => squares[last] - squares[first] - (sums[last] - sums[first]) ** 2 / (last - first);
  const side = Math.ceil(LEVEL_SIDE * count);
  let best = null;
  for (let split = side; split <= count - side; split++) {
    const left = Math.max(0, scatter(0, split) + scatter(split, count));
    if (!best || left < best.left) best = { split, left };
  }
  const line = straightLineScatter(points);
  if (line <= 0 || best.left > LEVEL_FIT * line) return null;
  const before = sums[best.split] / best.split;
  const after = (sums[count] - sums[best.split]) / (count - best.split);
  return Math.abs(after - before) >= LEVEL_SIZE * Math.sqrt(best.left / count)
    ? { at: points[best.split].x, before, after } : null;
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

const startOfDay = at => {
  const date = new Date(at);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

const startOfNextDay = start => {
  const date = new Date(start);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
};

/**
 * The whole days whose average stands out from that of a normal day: { normal: { low, high }, below, above,
 * usualCount }, or null when no day stands out or there are fewer than MIN_DAYS whole days to compare. A day is keyed
 * by its start, in the time zone of the browser; a day that the time frame covers only in part is left out, as its
 * average would be that of some hours only, and so is a day with fewer than MIN_IN_DAY measurements. A normal day is
 * the range in which the middle half of the days' averages lie, from the first to the third quartile. A day stands out
 * when its average lies more than STAND_OUT_WIDTHS times the width of that range below or above it, and differs from
 * the median day by more than STAND_OUT_DEVIATIONS standard deviations of all measurements. Because the range comes
 * from the middle days, a few days far out do not hide each other. below and above list those days, the furthest out
 * first, as { key, mean, count, few }: few when the day has fewer than FEW_MEASUREMENTS of the usual number of
 * measurements in a day (usualCount, the median), as a day with a time without measurements has.
 */
function daysThatStandOut(points, [from, to], deviation) {
  const whole = points.filter(point => {
    const start = startOfDay(point.x);
    return start >= from && startOfNextDay(start) - 1 <= to;
  });
  const days = [...groupBy(whole, startOfDay)].filter(([, values]) => values.length >= MIN_IN_DAY)
    .map(([key, values]) => ({ key, mean: average(values), count: values.length }));
  if (days.length < MIN_DAYS) return null;
  const means = days.map(day => day.mean).toSorted((a, b) => a - b);
  const [low, middle, high] = [0.25, 0.5, 0.75].map(share => quantile(means, share));
  const reach = STAND_OUT_WIDTHS * (high - low);
  const usualCount = median(days.map(day => day.count));
  const outside = isOutside => days
    .filter(day => isOutside(day.mean) && Math.abs(day.mean - middle) > STAND_OUT_DEVIATIONS * deviation)
    .toSorted((a, b) => Math.abs(b.mean - middle) - Math.abs(a.mean - middle))
    .map(day => ({ ...day, few: day.count < FEW_MEASUREMENTS * usualCount }));
  const below = outside(mean => mean < low - reach);
  const above = outside(mean => mean > high + reach);
  return below.length || above.length ? { normal: { low, high }, below, above, usualCount } : null;
}

/**
 * How long the longest of some spans of time ({ from, to }) is on a normal day: the median, over the whole days of the
 * time frame [from, to], of the longest span that starts in each day. Null with fewer than MIN_DAYS whole days, as
 * there is then no normal day to compare with.
 */
function usualLongestInDay(spans, [from, to]) {
  const longestPerDay = new Map();
  for (const span of spans) {
    const day = startOfDay(span.from);
    if (day < from || startOfNextDay(day) - 1 > to) continue;
    longestPerDay.set(day, Math.max(longestPerDay.get(day) ?? 0, span.to - span.from));
  }
  return longestPerDay.size < MIN_DAYS ? null : median([...longestPerDay.values()]);
}

/**
 * The longest time without measurements, also at the start and at the end of the time frame, when it is far longer
 * than usual: { from, to, duration, usual }, or null. It is far longer than usual when it is GAP_FACTOR times the usual
 * pause or longer and, when the time frame has a normal day to compare with, FAR_LONGER_TIMES times the longest time
 * without measurements on a normal day (usual, see usualLongestInDay) or longer, so that a pause that comes every
 * night does not count. usual is null without a normal day.
 */
function longestGap(points, range, pause) {
  if (!pause) return null;
  const [from, to] = range;
  const times = [Math.min(from, points[0].x), ...points.map(point => point.x), Math.max(to, points.at(-1).x)];
  const gaps = times.slice(1).map((time, index) => ({ from: times[index], to: time, duration: time - times[index] }));
  const longest = gaps.reduce((best, gap) => (gap.duration > best.duration ? gap : best));
  const usual = usualLongestInDay(gaps, range);
  const farLonger = longest.duration >= GAP_FACTOR * pause
    && (usual == null || longest.duration >= FAR_LONGER_TIMES * usual);
  return farLonger ? { ...longest, usual } : null;
}

/** The stretches of measurements in a row with the same value, oldest first: [{ value, from, to, count }]. */
function sameValueStretches(points) {
  const stretches = [];
  let start = 0;
  for (let index = 1; index <= points.length; index++) {
    if (index < points.length && points[index].y === points[start].y) continue;
    stretches.push({ value: points[start].y, from: points[start].x, to: points[index - 1].x, count: index - start });
    start = index;
  }
  return stretches;
}

/**
 * The longest time in which the value did not change, when it is far longer than usual: { value, from, to, count,
 * usual }, or null. It is the longest stretch of at least MIN_UNCHANGED measurements in a row with the same value.
 * usual is how long the value stays the same on a normal day (see usualLongestInDay; 0 when it changes at every
 * measurement). The stretch stands out when it lasts FAR_LONGER_TIMES times as long as usual, or longer. Null without
 * a normal day to compare with.
 */
function unchangedFarLongerThanUsual(points, range) {
  const stretches = sameValueStretches(points);
  const longest = stretches.filter(stretch => stretch.count >= MIN_UNCHANGED)
    .reduce((best, stretch) => (!best || stretch.to - stretch.from > best.to - best.from ? stretch : best), null);
  if (!longest) return null;
  const usual = usualLongestInDay(stretches, range);
  return usual != null && longest.to - longest.from >= FAR_LONGER_TIMES * usual ? { ...longest, usual } : null;
}

/**
 * What else the data points of a time frame [from, to] say, for the prompt of the AI: the biggest rise and drop between
 * two measurements in a row (rise, drop), a moment from which the value stayed at another level (level), the trend
 * from the first half of the time frame to the second, the whole days that stand out from a normal day (days), and the
 * longest time without measurements (gap) and the longest stretch with the same value (unchanged), each when it is far
 * longer than usual. Each is null when there is too little data for it, or nothing to say. Null without data points.
 */
export function analyze(points, range) {
  if (!points.length) return null;
  const values = points.map(point => point.y);
  const mean = average(values);
  const deviation = standardDeviation(values, mean);
  const pause = usualPause(points);
  return {
    ...biggestSteps(points, pause),
    level: levelChange(points),
    trend: trendOf(points, range, deviation),
    days: daysThatStandOut(points, range, deviation),
    gap: longestGap(points, range, pause),
    unchanged: unchangedFarLongerThanUsual(points, range),
  };
}
