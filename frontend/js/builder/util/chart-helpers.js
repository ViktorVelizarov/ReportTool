/*
 * Shared by the chart and bar chart widgets and their settings: the colours, the per-attribute settings and the bar
 * chart intervals. The colours and the intervals are those of OpenRemote's or-chart and or-attribute-barchart.
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { DAY, HOUR } from '../../model/time.js';

export const DEFAULT_CHART_COLORS = [
  '#3869B1', '#DA7E30', '#3F9852', '#CC2428', '#6B4C9A', '#922427', '#958C3D', '#535055',
];

export const sameRef = (a, b) => a.id === b.id && a.name === b.name;

export const hasRef = (refs, ref) => !!refs?.some(item => sameRef(item, ref));

/** The colour of the line or bar of an attribute: the one the user picked, or one of the default colours. */
export function attributeColor(attributeColors, attributeRefs, ref) {
  const custom = attributeColors?.find(([item]) => sameRef(item, ref))?.[1];
  if (custom) return custom;
  const index = Math.max(0, attributeRefs.findIndex(item => sameRef(item, ref)));
  return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
}

export const BarChartInterval = {
  AUTO: 'auto',
  NONE: 'none',
  ONE_MINUTE: '1Minute',
  FIVE_MINUTES: '5Minutes',
  FIFTEEN_MINUTES: '15Minutes',
  THIRTY_MINUTES: '30Minutes',
  ONE_HOUR: 'hour',
  ONE_DAY: 'day',
  ONE_WEEK: 'week',
  ONE_MONTH: 'month',
  ONE_YEAR: 'year',
};

const MINUTE = 60_000;

/** The intervals of the bar chart: the key, and the length in the unit of the data point query ("5 minute"). */
export function getDefaultIntervalOptions() {
  return new Map([
    [BarChartInterval.AUTO, { steps: 1, unit: 'minute', millis: MINUTE }],
    [BarChartInterval.ONE_MINUTE, { steps: 1, unit: 'minute', millis: MINUTE }],
    [BarChartInterval.FIVE_MINUTES, { steps: 5, unit: 'minute', millis: 5 * MINUTE }],
    [BarChartInterval.FIFTEEN_MINUTES, { steps: 15, unit: 'minute', millis: 15 * MINUTE }],
    [BarChartInterval.THIRTY_MINUTES, { steps: 30, unit: 'minute', millis: 30 * MINUTE }],
    [BarChartInterval.ONE_HOUR, { steps: 1, unit: 'hour', millis: HOUR }],
    [BarChartInterval.ONE_DAY, { steps: 1, unit: 'day', millis: DAY }],
    [BarChartInterval.ONE_WEEK, { steps: 1, unit: 'week', millis: 7 * DAY }],
    [BarChartInterval.ONE_MONTH, { steps: 1, unit: 'month', millis: 30 * DAY }],
    [BarChartInterval.ONE_YEAR, { steps: 1, unit: 'year', millis: 365 * DAY }],
  ]);
}

/**
 * The interval of the bars for a period. "auto" picks one that gives a readable number of bars; a chosen interval that
 * is longer than the period is replaced by the longest one that fits.
 */
export function chooseInterval(startMs, endMs, selected, options = getDefaultIntervalOptions()) {
  const hours = Math.round((endMs - startMs) / HOUR);
  if (selected === BarChartInterval.AUTO) {
    if (hours <= 1) return { steps: 5, unit: 'minute', millis: 5 * MINUTE };
    if (hours <= 6) return { steps: 30, unit: 'minute', millis: 30 * MINUTE };
    if (hours <= 24) return { steps: 1, unit: 'hour', millis: HOUR }; // hour if up to one day
    if (hours <= 744) return { steps: 1, unit: 'day', millis: DAY }; // one day if up to one month
    if (hours <= 8760) return { steps: 1, unit: 'week', millis: 7 * DAY }; // one week if up to 1 year
    return { steps: 1, unit: 'month', millis: 30 * DAY }; // one month if more than a year
  }
  if (selected === BarChartInterval.NONE) {
    const millis = endMs - startMs;
    return { steps: Math.ceil(millis / MINUTE), unit: 'minute', millis };
  }
  const chosen = options.get(selected) ?? options.get(BarChartInterval.ONE_DAY);
  if (chosen.millis <= endMs - startMs) return chosen;
  // The chosen interval is longer than the period: use the longest one that fits
  const fitting = [...options.values()].filter(option => option.millis <= endMs - startMs).at(-1);
  return fitting ?? chosen;
}
