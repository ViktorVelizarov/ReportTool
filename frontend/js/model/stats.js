/** Figures computed from data points: [{ x: timestamp, y: value }], oldest first. */

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

/** A pause between two measurements is a time without data when it is this many times the usual pause, or more. */
const GAP_FACTOR = 3;

/** The fewest measurements in a row with the same value that count as a value that did not change. */
const MIN_UNCHANGED = 6;

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
 * two measurements in a row (rise, drop), the trend from the first half of the time frame to the second, the whole days
 * that stand out from a normal day (days), the longest time without measurements (gap) and the longest stretch with the
 * same value (unchanged). Each is null when there is too little data for it, or nothing to say. Null without data
 * points.
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
    days: daysThatStandOut(points, range, deviation),
    gap: longestGap(points, range, pause),
    unchanged: longestUnchanged(points),
  };
}
