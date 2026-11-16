/*
 * Shared by the chart and bar chart settings and the widget specs: the colours of the lines and bars, the check whether
 * an attribute has a setting, and the names of the intervals of the bar chart. The colours and the names are those of
 * OpenRemote's or-chart and or-attribute-barchart.
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const DEFAULT_CHART_COLORS = [
  '#3869B1', '#DA7E30', '#3F9852', '#CC2428', '#6B4C9A', '#922427', '#958C3D', '#535055',
];

export const sameRef = (a, b) => a.id === b.id && a.name === b.name;

export const hasRef = (refs, ref) => !!refs?.some(item => sameRef(item, ref));

/** The intervals of the bar chart that the widget settings choose from (the page code of the specs has no browser). */
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
