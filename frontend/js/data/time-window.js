/**
 * The time windows of the chart widgets ("this day", "last 7 days", ...) and the dates they stand for. Ported from the
 * OpenRemote chart (or-chart, _getTimeSelectionDates), which uses moment.js for the date arithmetic.
 *
 * Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** The windows by key: [unit, amount]. */
export function getDefaultTimeWindowOptions() {
  return new Map([
    ['60Minutes', ['minutes', 60]],
    ['Hour', ['hours', 1]],
    ['6Hours', ['hours', 6]],
    ['24Hours', ['hours', 24]],
    ['Day', ['days', 1]],
    ['7Days', ['days', 7]],
    ['Week', ['weeks', 1]],
    ['30Days', ['days', 30]],
    ['Month', ['months', 1]],
    ['90Days', ['days', 90]],
    ['6Months', ['months', 6]],
    ['365Days', ['days', 365]],
    ['Year', ['years', 1]],
  ]);
}

export function getDefaultTimePrefixOptions() {
  return ['this', 'last', 'next'];
}

function startOf(date, unit) {
  const d = new Date(date);
  switch (unit) {
    case 'minutes': d.setSeconds(0, 0); break;
    case 'hours': d.setMinutes(0, 0, 0); break;
    case 'days': d.setHours(0, 0, 0, 0); break;
    case 'weeks': // weeks start on Monday
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      break;
    case 'months': d.setHours(0, 0, 0, 0); d.setDate(1); break;
    case 'years': d.setHours(0, 0, 0, 0); d.setMonth(0, 1); break;
    default: throw new Error(`Unsupported unit: ${unit}`);
  }
  return d;
}

/** The date moved by an amount of a unit (minutes, hours, days, weeks, months or years). */
export function addToDate(date, unit, amount) {
  const d = new Date(date);
  switch (unit) {
    case 'minutes': d.setMinutes(d.getMinutes() + amount); break;
    case 'hours': d.setHours(d.getHours() + amount); break;
    case 'days': d.setDate(d.getDate() + amount); break;
    case 'weeks': d.setDate(d.getDate() + 7 * amount); break;
    case 'months': d.setMonth(d.getMonth() + amount); break;
    case 'years': d.setFullYear(d.getFullYear() + amount); break;
    default: throw new Error(`Unsupported unit: ${unit}`);
  }
  return d;
}

/** The last millisecond of the unit that the date is in. */
function endOf(date, unit) {
  return new Date(addToDate(startOf(date, unit), unit, 1).getTime() - 1);
}

/**
 * The [start, end] dates of a window: prefix is "this", "last" or "next", windowKey one of the keys of
 * getDefaultTimeWindowOptions(), now the moment the report is made for.
 */
export function getTimeSelectionDates(prefix, windowKey, now, windows = getDefaultTimeWindowOptions()) {
  const window = windows.get(windowKey);
  if (!window) {
    throw new Error(`Unsupported time window selected: ${windowKey}`);
  }
  const [unit, value] = window;
  switch (prefix) {
    case 'this':
      // with a few units, now is in the middle
      return value === 1
        ? [startOf(now, unit), endOf(now, unit)]
        : [addToDate(now, unit, -value * 0.5), addToDate(now, unit, value * 0.5)];
    case 'last':
      return [startOf(addToDate(now, unit, -value), unit), value === 1 ? startOf(now, unit) : new Date(now)];
    case 'next':
      return value === 1
        ? [startOf(addToDate(now, unit, value), unit), endOf(addToDate(now, unit, value), unit)]
        : [new Date(now), addToDate(now, unit, value)];
    default:
      throw new Error(`Unsupported time prefix selected: ${prefix}`);
  }
}
