/*
 * What is fixed about each widget type, by widget type id: the name and icon in the widget browser, the smallest size
 * and the size of a new widget in grid cells, the files a widget can be exported as, and the config of a new widget
 * (getDefaultConfig, which gives a new object every time). The manifests of the widgets are made from these; there is
 * no browser code here, so it also loads without a browser.
 *
 * The names, icons, sizes and default configs are those of the widgets of OpenRemote's or-dashboard-builder
 * (src/widgets/*.ts). Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { BarChartInterval } from '../util/chart-helpers.js';

/** The minimum and maximum of the axes of a chart; undefined lets the chart choose. */
const axesOptions = () => ({
  options: { scales: { y: { min: undefined, max: undefined }, y1: { min: undefined, max: undefined } } },
});

const THRESHOLDS = () => [[0, '#4caf50'], [75, '#ff9800'], [90, '#ef5350']]; // colours of the Material UI palette

export const WIDGET_SPECS = {
  /*
   * The config of the bar chart widget (BarChartWidgetConfig):
   *   attributeRefs, attributeColors ([[ref, colour]]), attributeSettings (the refs per option: rightAxisAttributes,
   *   faintAttributes and the methods methodAvgAttributes, methodMinAttributes, ...), datapointQuery, chartOptions (the
   *   minimum and maximum of the axes), defaultTimePrefixKey ("last"), defaultTimeWindowKey ("7Days"), defaultInterval,
   *   showLegend, stacked, decimals and followReportPeriod. Insights' showTimestampControls is left out: in a report
   *   the bar chart has no time controls.
   */
  barchart: {
    displayName: 'Bar Chart', displayIcon: 'chart-bar',
    minColumnWidth: 2, minColumnHeight: 2, defaultColumnWidth: 6, defaultColumnHeight: 4, downloads: ['png'],
    getDefaultConfig: () => ({
      attributeRefs: [],
      attributeColors: [],
      attributeSettings: {},
      datapointQuery: { type: 'interval' },
      chartOptions: axesOptions(),
      defaultTimeWindowKey: '7Days',
      defaultTimePrefixKey: 'last',
      defaultInterval: BarChartInterval.AUTO,
      showLegend: true,
      stacked: false,
      decimals: 2,
      followReportPeriod: true,
    }),
  },

  /*
   * The config of the gauge widget (GaugeWidgetConfig): attributeRefs, thresholds ([[from value, colour]]), decimals,
   * min, max and valueType.
   */
  gauge: {
    displayName: 'Gauge', displayIcon: 'gauge',
    minColumnWidth: 1, minColumnHeight: 1, defaultColumnWidth: 3, defaultColumnHeight: 3, downloads: ['png'],
    getDefaultConfig: () => ({
      attributeRefs: [],
      thresholds: THRESHOLDS(),
      decimals: 0,
      min: 0,
      max: 100,
      valueType: 'number',
    }),
  },

  /*
   * The config of the image widget (ImageWidgetConfig): attributeRefs, imagePath (the address of the image), and
   * markers: [{ attributeRef, coordinates: [x, y] }] with the position of every attribute on the image, in percent.
   */
  image: {
    displayName: 'Image', displayIcon: 'file-image-marker',
    minColumnWidth: 1, minColumnHeight: 1, defaultColumnWidth: 5, defaultColumnHeight: 4, downloads: [],
    getDefaultConfig: () => ({
      attributeRefs: [],
      showTimestampControls: false,
      imagePath: '',
      markers: [],
    }),
  },

  /*
   * The config of the KPI widget (KpiWidgetConfig): attributeRefs, period ("year" | "month" | "week" | "day" | "hour"),
   * decimals and deltaFormat ("absolute" | "percentage"); Insights' showTimestampControls is left out, as the KPI has
   * no period menu in a report. The KPI shows the last hour, day, week, month or year up to now, it does not follow the
   * report.
   */
  kpi: {
    displayName: 'KPI', displayIcon: 'label',
    minColumnWidth: 1, minColumnHeight: 1, defaultColumnWidth: 3, defaultColumnHeight: 2, downloads: [],
    getDefaultConfig: () => ({
      attributeRefs: [],
      period: 'day',
      decimals: 0,
      deltaFormat: 'absolute',
    }),
  },

  /*
   * The config of the chart widget (ChartWidgetConfig):
   *   attributeRefs, attributeColors ([[ref, colour]]), attributeConfig (the refs per option: rightAxisAttributes,
   *   smoothAttributes, steppedAttributes, areaAttributes, faintAttributes, extendedAttributes), datapointQuery (the
   *   number of points that a line is thinned to, amountOfPoints, is fixed: without it the chart takes a fifth of the
   *   width that it has while it loads, which it does not yet know the first time, so a report would not look the same
   *   every time it is drawn),
   *   chartOptions (the minimum and maximum of the axes), defaultTimePresetKey ("last7Days"), showLegend, stacked,
   *   followReportPeriod and showZoomBar. Insights' showTimestampControls is left out: in a report the line chart has
   *   no time controls.
   */
  linechart: {
    displayName: 'Line Chart', displayIcon: 'chart-line',
    minColumnWidth: 2, minColumnHeight: 2, defaultColumnWidth: 6, defaultColumnHeight: 4, downloads: ['png'],
    getDefaultConfig: () => ({
      attributeRefs: [],
      attributeColors: [],
      datapointQuery: { type: 'lttb', amountOfPoints: 200 },
      attributeConfig: {},
      chartOptions: axesOptions(),
      defaultTimePresetKey: 'last7Days',
      showLegend: true,
      showZoomBar: false,
      stacked: false,
      followReportPeriod: true,
    }),
  },

  /*
   * The config of the table widget (TableWidgetConfig): assetType, allOfType, assetIds, attributeNames, tableSize (the
   * number of rows per page) and tableOptions (the numbers of rows the user can choose from).
   */
  table: {
    displayName: 'Table', displayIcon: 'table',
    defaultColumnWidth: 6, defaultColumnHeight: 4, downloads: ['csv'],
    getDefaultConfig: () => ({
      assetType: undefined,
      allOfType: true,
      assetIds: [],
      attributeNames: [],
      tableSize: 10,
      tableOptions: [10, 25, 100],
    }),
  },
};

/** The files a widget of the type can be exported as: "png" for the charts, "csv" for the table. */
export const downloadsOf = widgetTypeId => WIDGET_SPECS[widgetTypeId]?.downloads ?? [];
