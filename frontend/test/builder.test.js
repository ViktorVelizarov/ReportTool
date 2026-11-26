import assert from 'node:assert/strict';
import { test } from 'node:test';

import { DashboardService } from '../js/builder/service/dashboard-service.js';
import { downloadsOf, WIDGET_SPECS } from '../js/builder/service/widget-specs.js';
import { BAR_METHODS, bucketLabel, bucketStart, nextBucket } from '../js/builder/util/bar-chart-data.js';
import {
  attributeColor, BarChartInterval, chooseInterval, DEFAULT_CHART_COLORS, hasRef,
} from '../js/builder/util/chart-helpers.js';
import { mapViewBox, markerColor, project } from '../js/builder/util/nl-map.js';
import { getActivePreset } from '../js/builder/util/screen-presets.js';
import { configRange, splitPresetKey } from '../js/builder/util/widget-time.js';
import { getDefaultTimePrefixOptions, getTimeSelectionDates } from '../js/data/time-window.js';
import { resolvePeriod } from '../js/model/periods.js';
import { DAY, HOUR } from '../js/model/time.js';

process.env.TZ = 'UTC';

const NOW = Date.parse('2026-10-04T15:30:00Z');
const context = { asOf: NOW, period: resolvePeriod('last30', new Date(NOW)), now: () => new Date(NOW) };
const reportRange = [context.period.start.getTime(), context.period.end.getTime()];

// --- the time of a widget ---

test('charts and KPIs follow the time frame of the report unless that is switched off', () => {
  for (const type of ['linechart', 'barchart', 'kpi']) {
    assert.deepEqual(configRange(type, WIDGET_SPECS[type].getDefaultConfig(), context), reportRange, type);
  }
  assert.equal(configRange('table', WIDGET_SPECS.table.getDefaultConfig(), context), undefined);
});

test('a widget that does not follow the report has the window of its settings', () => {
  const own = (type, config) =>
    configRange(type, { ...WIDGET_SPECS[type].getDefaultConfig(), ...config, followReportPeriod: false }, context);
  const window = (prefix, key) => getTimeSelectionDates(prefix, key, new Date(NOW)).map(date => date.getTime());

  assert.deepEqual(own('linechart', { defaultTimePresetKey: 'thisWeek' }), window('this', 'Week'));
  assert.deepEqual(own('barchart', { defaultTimePrefixKey: 'last', defaultTimeWindowKey: '24Hours' }),
    window('last', '24Hours'));
  assert.deepEqual(own('kpi', { period: 'week' }), [NOW - 7 * DAY, NOW]);
});

test('a preset key is split into its prefix and window, with the first ones for a key that is unknown', () => {
  const prefixes = getDefaultTimePrefixOptions();

  assert.deepEqual(splitPresetKey('last7Days', prefixes), { prefix: 'last', windowKey: '7Days' });
  assert.deepEqual(splitPresetKey('next6Months', prefixes), { prefix: 'next', windowKey: '6Months' });
  assert.deepEqual(splitPresetKey('soonish', prefixes), { prefix: prefixes[0], windowKey: '60Minutes' });
});

// --- the bar chart ---

test('auto picks an interval that gives a readable number of bars', () => {
  const unit = hours => chooseInterval(0, hours * HOUR, BarChartInterval.AUTO).unit;

  assert.deepEqual([unit(1), unit(6), unit(24), unit(24 * 30), unit(24 * 90), unit(24 * 800)],
    ['minute', 'minute', 'hour', 'day', 'week', 'month']);
});

test('a chosen interval longer than the period becomes the longest one that fits', () => {
  assert.equal(chooseInterval(0, 2 * DAY, BarChartInterval.ONE_WEEK).unit, 'day');
  assert.equal(chooseInterval(0, 20 * DAY, BarChartInterval.ONE_WEEK).unit, 'week');
  assert.equal(chooseInterval(0, 3 * HOUR, BarChartInterval.NONE).millis, 3 * HOUR);
});

test('the methods make one value of the points in an interval', () => {
  const values = [3, 1, 4, 1, 5, 9];
  const results = Object.fromEntries(Object.entries(BAR_METHODS).map(([key, method]) => [key, method(values)]));

  assert.deepEqual(results, {
    methodAvgAttributes: 23 / 6,
    methodCountAttributes: 6,
    methodDifferenceAttributes: 6,
    methodMaxAttributes: 9,
    methodMedianAttributes: 3.5,
    methodMinAttributes: 1,
    methodModeAttributes: 1,
    methodSumAttributes: 23,
  });
});

test('intervals start on whole units: weeks on Monday, months and years on the calendar', () => {
  const at = iso => Date.parse(iso);
  const day = chooseInterval(0, 30 * DAY, BarChartInterval.ONE_DAY);
  const week = chooseInterval(0, 300 * DAY, BarChartInterval.ONE_WEEK);
  const month = chooseInterval(0, 300 * DAY, BarChartInterval.ONE_MONTH);

  assert.equal(bucketStart(at('2026-10-04T15:30:00Z'), day), at('2026-10-04T00:00:00Z'));
  assert.equal(bucketStart(at('2026-10-04T15:30:00Z'), week), at('2026-09-28T00:00:00Z'));
  assert.equal(bucketStart(at('2026-10-04T15:30:00Z'), month), at('2026-10-01T00:00:00Z'));
  assert.equal(nextBucket(at('2026-01-01T00:00:00Z'), month), at('2026-02-01T00:00:00Z'));
  assert.equal(bucketLabel(at('2026-10-04T00:00:00Z'), day, 30 * DAY), '4 Oct');
  assert.equal(bucketLabel(at('2026-10-01T00:00:00Z'), month, 300 * DAY), 'Oct 2026');
});

test('attributes get the default colours in order, unless a colour is chosen', () => {
  const a = { id: 'x', name: 'a' };
  const b = { id: 'x', name: 'b' };

  assert.equal(attributeColor([], [a, b], b), DEFAULT_CHART_COLORS[1]);
  assert.equal(attributeColor([[{ id: 'x', name: 'b' }, '#123456']], [a, b], b), '#123456');
  assert.ok(hasRef([a], { id: 'x', name: 'a' }));
  assert.ok(!hasRef([a], b) && !hasRef(undefined, a));
});

// --- the map ---

test('places all over the Netherlands are on the map as it first shows', () => {
  const places = {
    Groningen: { lng: 6.56, lat: 53.215 },
    Zwolle: { lng: 6.09, lat: 52.51 },
    Amsterdam: { lng: 4.83, lat: 52.38 },
    Rotterdam: { lng: 4.48, lat: 51.922 },
    Delft: { lng: 4.31, lat: 51.96 },
    Eindhoven: { lng: 5.455, lat: 51.44 },
    Maastricht: { lng: 5.69, lat: 50.85 },
  };
  const box = mapViewBox();
  for (const [name, position] of Object.entries(places)) {
    const [x, y] = project(position);
    assert.ok(x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height, name);
  }
});

test('each zoom level halves the part of the map that shows', () => {
  const near = mapViewBox({ zoom: 8 });
  const far = mapViewBox();

  assert.ok(Math.abs(far.width / near.width - 2) < 0.01);
  assert.ok(Math.abs(far.height / near.height - 2) < 0.01);
});

test('a marker has the colour of its value, and grey without one', () => {
  const thresholds = [[0, '#4caf50'], [75, '#ff9800'], [90, '#ef5350']];
  const grey = '#9aa5b1';

  assert.equal(markerColor({ valueType: 'number', value: 80, thresholds }), '#ff9800');
  assert.equal(markerColor({ valueType: 'number', value: -5, thresholds }), '#4caf50');
  const boolColors = { true: '4caf50', false: 'ef5350' };
  assert.equal(markerColor({ valueType: 'boolean', value: true, boolColors }), '#4caf50');
  assert.equal(markerColor({ valueType: 'text', value: 'Fault', textColors: [['Fault', '#ef5350']] }), '#ef5350');
  assert.equal(markerColor({ valueType: 'text', value: 'Unknown', textColors: [] }), grey);
  assert.equal(markerColor({ valueType: 'number', value: null, thresholds }), grey);
});

// --- dashboards and widget types ---

test('a new dashboard has 12 columns and wraps to one column on a phone', () => {
  const template = DashboardService.newTemplate('d');

  assert.deepEqual([template.id, template.columns, template.widgets], ['d', 12, []]);
  assert.equal(getActivePreset(500, template.screenPresets)?.scalingPreset, 'WRAP_TO_SINGLE_COLUMN');
  assert.equal(getActivePreset(1200, template.screenPresets), undefined);
  assert.notEqual(DashboardService.newTemplate().id, DashboardService.newTemplate().id);
});

test('every widget type has a name, an icon, sizes that fit and a fresh default config', () => {
  for (const [type, spec] of Object.entries(WIDGET_SPECS)) {
    assert.ok(spec.displayName && spec.displayIcon, type);
    assert.ok((spec.minColumnWidth ?? 1) <= spec.defaultColumnWidth, type);
    assert.ok((spec.minColumnHeight ?? 1) <= spec.defaultColumnHeight, type);
    const config = spec.getDefaultConfig();
    config.mutated = true;
    assert.equal(spec.getDefaultConfig().mutated, undefined, type);
  }
  assert.deepEqual(downloadsOf('linechart'), ['png']);
  assert.deepEqual(downloadsOf('table'), ['csv']);
  assert.deepEqual(downloadsOf('map'), []);
  assert.deepEqual(downloadsOf('hologram'), []);
});
