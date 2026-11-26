/**
 * What two widgets show that the prompt gives as they show it: the bars of a bar chart, with the interval and the
 * methods that OpenRemote's bar chart (or-attribute-barchart) uses, and the scale of a gauge with its coloured zones,
 * as OpenRemote's gauge (or-gauge) draws them. Pure: report.js fetches the bars with what this says.
 *
 * The choice of the interval is that of or-attribute-barchart 1.32.2 (_getInterval), the zones are those of or-gauge
 * 1.32.2. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { BarChartInterval, hasRef } from '../builder/util/chart-helpers.js';
import { HOUR } from './time.js';

/** The methods of the bars, by their setting in the config of the widget, in the order that the chart draws them. */
const BAR_METHODS = [
  ['methodAvgAttributes', 'AVG'],
  ['methodCountAttributes', 'COUNT'],
  ['methodDifferenceAttributes', 'DIFFERENCE'],
  ['methodMaxAttributes', 'MAX'],
  ['methodMedianAttributes', 'MEDIAN'],
  ['methodMinAttributes', 'MIN'],
  ['methodModeAttributes', 'MODE'],
  ['methodSumAttributes', 'SUM'],
];

/** The formulas of the bars of an attribute (AVG, MAX, ...): one set of bars each, none when no method is chosen. */
export function barFormulas(attributeSettings, ref) {
  return BAR_METHODS.filter(([setting]) => hasRef(attributeSettings?.[setting], ref)).map(([, formula]) => formula);
}

/** How many hours a month and a year last for the bar chart, which counts them as moment.js does. */
const MONTH_HOURS = 730.485;

/** The intervals that the author can choose, with how many hours they last; "auto" stands for one minute here. */
const INTERVALS = new Map([
  [BarChartInterval.AUTO, { steps: 1, unit: 'MINUTE', hours: 1 / 60 }],
  [BarChartInterval.ONE_MINUTE, { steps: 1, unit: 'MINUTE', hours: 1 / 60 }],
  [BarChartInterval.FIVE_MINUTES, { steps: 5, unit: 'MINUTE', hours: 5 / 60 }],
  [BarChartInterval.FIFTEEN_MINUTES, { steps: 15, unit: 'MINUTE', hours: 15 / 60 }],
  [BarChartInterval.THIRTY_MINUTES, { steps: 30, unit: 'MINUTE', hours: 30 / 60 }],
  [BarChartInterval.ONE_HOUR, { steps: 1, unit: 'HOUR', hours: 1 }],
  [BarChartInterval.ONE_DAY, { steps: 1, unit: 'DAY', hours: 24 }],
  [BarChartInterval.ONE_WEEK, { steps: 1, unit: 'WEEK', hours: 7 * 24 }],
  [BarChartInterval.ONE_MONTH, { steps: 1, unit: 'MONTH', hours: MONTH_HOURS }],
  [BarChartInterval.ONE_YEAR, { steps: 1, unit: 'YEAR', hours: 12 * MONTH_HOURS }],
]);

/** The interval that "auto" chooses for a time frame of this many whole hours. */
function autoInterval(hours) {
  if (hours <= 1) return { steps: 5, unit: 'MINUTE' };
  if (hours <= 6) return { steps: 30, unit: 'MINUTE' };
  if (hours <= 24) return { steps: 1, unit: 'HOUR' };
  if (hours <= 744) return { steps: 1, unit: 'DAY' };
  if (hours <= 8760) return { steps: 1, unit: 'WEEK' };
  return { steps: 1, unit: 'MONTH' };
}

const stepsAndUnit = ({ steps, unit }) => ({ steps, unit });

/**
 * The interval of the bars of a bar chart over [from, to] with the interval of its config (key): { steps, unit }, unit
 * being MINUTE, HOUR, DAY, WEEK, MONTH or YEAR, so that "1 DAY" asks the manager for a bar per day. "none" gives one
 * bar for the whole time frame ({ ..., whole: true }). An interval that is longer than the time frame becomes the
 * longest one that fits, as in the chart.
 */
export function barInterval([from, to], key = BarChartInterval.AUTO) {
  const hours = Math.round((to - from) / HOUR);
  if (key === BarChartInterval.AUTO) return autoInterval(hours);
  if (key === BarChartInterval.NONE) return { steps: Math.ceil((to - from) / 60_000), unit: 'MINUTE', whole: true };
  const chosen = INTERVALS.get(key);
  if (chosen && chosen.hours <= hours) return stepsAndUnit(chosen);
  const longest = [...INTERVALS.values()].reverse().find(option => option.hours <= hours);
  return stepsAndUnit(longest ?? INTERVALS.get(BarChartInterval.AUTO));
}

/** Whether the bars of an attribute include the average of each day, so that a day that stands out is a bar too. */
export const barsOfDailyAverages = (interval, formulas) =>
  !interval.whole && interval.steps === 1 && interval.unit === 'DAY' && formulas.includes('AVG');

/**
 * The scale of a gauge as it is drawn: { min, max, zones: [{ from, to, colour }] }. The zones are the thresholds of the
 * config ([from value, colour]) from low to high, each up to the next or to the maximum, cut to the scale; a zone that
 * lies outside the scale has no length and is left out.
 */
export function gaugeScale({ min = 0, max = 100, thresholds = [] }) {
  const sorted = [...thresholds].sort((a, b) => a[0] - b[0]);
  const zones = sorted.map(([from, colour], index) => ({
    from: Math.min(Math.max(from, min), max),
    to: Math.min(Math.max(sorted[index + 1]?.[0] ?? max, min), max),
    colour,
  }));
  return { min, max, zones: zones.filter(zone => zone.from < zone.to) };
}

/**
 * Where a value lies on the scale of a gauge: { outside: 'below' } or { outside: 'above' } the scale, where the needle
 * stops at its end, or { zone } with the zone it is in (null when no zone covers it). At the border of two zones it is
 * in the higher one.
 */
export function placeOnScale(value, { min, max, zones }) {
  if (value < min) return { outside: 'below' };
  if (value > max) return { outside: 'above' };
  return { zone: zones.findLast(zone => value >= zone.from && value <= zone.to) ?? null };
}

/** The names of the colours by hue: each up to the hue, in degrees, after it. */
const HUES = [[15, 'red'], [45, 'orange'], [70, 'yellow'], [160, 'green'], [200, 'cyan'], [260, 'blue'],
  [290, 'purple'], [345, 'pink'], [360, 'red']];

/** A plain name for a colour written as #rgb or #rrggbb, such as "green"; any other colour as it is written. */
export function colourName(colour) {
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(colour?.trim() ?? '')?.[1];
  if (!hex) return colour;
  const full = hex.length === 3 ? [...hex].map(digit => digit + digit).join('') : hex;
  const [red, green, blue] = [0, 2, 4].map(start => parseInt(full.slice(start, start + 2), 16) / 255);
  const high = Math.max(red, green, blue);
  const low = Math.min(red, green, blue);
  const chroma = high - low;
  if (chroma < 0.1) {
    const lightness = (high + low) / 2;
    return lightness < 0.2 ? 'black' : lightness > 0.85 ? 'white' : 'grey';
  }
  const sector = high === red ? (green - blue) / chroma : high === green ? (blue - red) / chroma + 2
    : (red - green) / chroma + 4;
  const hue = (sector * 60 + 360) % 360;
  return HUES.find(([limit]) => hue < limit)[1];
}
