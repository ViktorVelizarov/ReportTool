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
   *   showLegend, stacked, decimals, followReportPeriod, and showTimestampControls, which is kept but not used.
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
      showTimestampControls: false,
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
   * decimals, deltaFormat ("absolute" | "percentage"), showTimestampControls, and followReportPeriod.
   */
  kpi: {
    displayName: 'KPI', displayIcon: 'label',
    minColumnWidth: 1, minColumnHeight: 1, defaultColumnWidth: 3, defaultColumnHeight: 2, downloads: [],
    getDefaultConfig: () => ({
      attributeRefs: [],
      period: 'day',
      decimals: 0,
      deltaFormat: 'absolute',
      showTimestampControls: false,
      followReportPeriod: true,
    }),
  },

  /*
   * The config of the chart widget (ChartWidgetConfig):
   *   attributeRefs, attributeColors ([[ref, colour]]), attributeConfig (the refs per option: rightAxisAttributes,
   *   smoothAttributes, steppedAttributes, areaAttributes, faintAttributes, extendedAttributes), datapointQuery,
   *   chartOptions (the minimum and maximum of the axes), defaultTimePresetKey ("last7Days"), showLegend, stacked,
   *   followReportPeriod, and showTimestampControls and showZoomBar, which are kept but not used.
   */
  linechart: {
    displayName: 'Line Chart', displayIcon: 'chart-line',
    minColumnWidth: 2, minColumnHeight: 2, defaultColumnWidth: 6, defaultColumnHeight: 4, downloads: ['png'],
    getDefaultConfig: () => ({
      attributeRefs: [],
      attributeColors: [],
      datapointQuery: { type: 'lttb' },
      attributeConfig: {},
      chartOptions: axesOptions(),
      showTimestampControls: false,
      defaultTimePresetKey: 'last7Days',
      showLegend: true,
      showZoomBar: false,
      stacked: false,
      followReportPeriod: true,
    }),
  },

  /*
   * The config of the map widget (MapWidgetConfig): assetType, allOfType, assetIds, attributeName and its valueType
   * (number, boolean or text), thresholds ([[from value, colour]], for numbers), boolColors ({ true, false }),
   * textColors ([[text, colour]]), showLabels, showUnits, showGeoJson, zoom, center ({ lng, lat }), min and max.
   */
  map: {
    displayName: 'Map', displayIcon: 'map',
    minColumnWidth: 2, minColumnHeight: 2, defaultColumnWidth: 5, defaultColumnHeight: 5, downloads: [],
    getDefaultConfig: () => ({
      attributeRefs: [],
      showLabels: false,
      showUnits: false,
      showGeoJson: true,
      boolColors: { type: 'boolean', false: '#ef5350', true: '#4caf50' },
      textColors: [['example1', '#4caf50'], ['example2', '#ef5350']],
      thresholds: THRESHOLDS(),
      assetTypes: [],
      assetType: undefined,
      allOfType: true,
      assetIds: [],
      attributes: [],
      attributeName: undefined,
      valueType: undefined,
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
