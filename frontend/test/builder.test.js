import assert from 'node:assert/strict';
import { test } from 'node:test';

import { DashboardKeyEmitter } from '../js/builder/or-dashboard-keyhandler.js';
import { DashboardService } from '../js/builder/service/dashboard-service.js';
import { WidgetService } from '../js/builder/service/widget-service.js';
import { downloadsOf, WIDGET_SPECS } from '../js/builder/service/widget-specs.js';
import { hasRef, sameRef } from '../js/builder/util/chart-helpers.js';
import { getActivePreset } from '../js/builder/util/screen-presets.js';
import { configRange, followedTimeframe, splitPresetKey } from '../js/builder/util/widget-time.js';
import { getDefaultTimePrefixOptions, getTimeSelectionDates } from '../js/data/time-window.js';
import { resolvePeriod } from '../js/model/periods.js';
import { DAY, HOUR } from '../js/model/time.js';

process.env.TZ = 'UTC';

const NOW = Date.parse('2026-10-04T15:30:00Z');
const context = { asOf: NOW, period: resolvePeriod('last30', new Date(NOW)), now: () => new Date(NOW) };
const reportRange = [context.period.start.getTime(), context.period.end.getTime()];

// --- the time of a widget ---

test('charts follow the time frame of the report unless that is switched off', () => {
  for (const type of ['linechart', 'barchart']) {
    assert.deepEqual(configRange(type, WIDGET_SPECS[type].getDefaultConfig(), context), reportRange, type);
  }
  assert.equal(configRange('table', WIDGET_SPECS.table.getDefaultConfig(), context), undefined);
});

test('a widget that follows the report has its time frame as dates, one that does not has none', () => {
  const { start, end } = context.period;
  assert.deepEqual(followedTimeframe({}, context), [start, end]);
  assert.deepEqual(followedTimeframe({ followReportPeriod: true }, context), [start, end]);
  assert.equal(followedTimeframe({ followReportPeriod: false }, context), undefined);
  assert.equal(followedTimeframe({}, { ...context, period: undefined }), undefined);
});

test('a widget that does not follow the report has the window of its settings', () => {
  const own = (type, config) =>
    configRange(type, { ...WIDGET_SPECS[type].getDefaultConfig(), ...config, followReportPeriod: false }, context);
  const window = (prefix, key) => getTimeSelectionDates(prefix, key, new Date(NOW)).map(date => date.getTime());

  assert.deepEqual(own('linechart', { defaultTimePresetKey: 'thisWeek' }), window('this', 'Week'));
  assert.deepEqual(own('barchart', { defaultTimePrefixKey: 'last', defaultTimeWindowKey: '24Hours' }),
    window('last', '24Hours'));
});

test('a KPI shows the period before now, as OpenRemote does, whatever the time frame of the report is', () => {
  const kpi = config => configRange('kpi', { ...WIDGET_SPECS.kpi.getDefaultConfig(), ...config }, context);

  assert.deepEqual(kpi({}), [NOW - DAY, NOW]);
  assert.deepEqual(kpi({ period: 'week' }), [NOW - 7 * DAY, NOW]);
  assert.deepEqual(kpi({ period: 'hour' }), [NOW - HOUR, NOW]);
  assert.deepEqual(kpi({ period: 'week', followReportPeriod: true }), [NOW - 7 * DAY, NOW]); // an old setting
});

test('a preset key is split into its prefix and window, with the first ones for a key that is unknown', () => {
  const prefixes = getDefaultTimePrefixOptions();

  assert.deepEqual(splitPresetKey('last7Days', prefixes), { prefix: 'last', windowKey: '7Days' });
  assert.deepEqual(splitPresetKey('next6Months', prefixes), { prefix: 'next', windowKey: '6Months' });
  assert.deepEqual(splitPresetKey('soonish', prefixes), { prefix: prefixes[0], windowKey: '60Minutes' });
});

// --- the settings of the charts ---

test('an attribute has a setting when the list of the setting holds a reference to it', () => {
  const a = { id: 'x', name: 'a' };
  const b = { id: 'x', name: 'b' };

  assert.ok(sameRef(a, { id: 'x', name: 'a' }) && !sameRef(a, b));
  assert.ok(hasRef([a], { id: 'x', name: 'a' }));
  assert.ok(!hasRef([a], b) && !hasRef(undefined, a));
});

// --- the keys of the builder ---

const element = (localName, isField = false) => ({ localName, matches: () => isField });

/** The emitter with a listener for each of its events, and a way to press a key on a path of elements. */
function emitterWithKeys() {
  let onKeyDown;
  globalThis.window = {
    addEventListener(type, listener) {
      assert.equal(type, 'keydown');
      onKeyDown = listener;
    },
  };
  const emitter = new DashboardKeyEmitter();
  delete globalThis.window;
  const heard = [];
  for (const name of ['delete', 'deselect', 'save']) emitter.addListener(name, () => heard.push(name));
  const press = (key, path, ctrlKey = false) =>
    onKeyDown({ key, ctrlKey, composedPath: () => path, preventDefault() {} });
  return { heard, press };
}

test('Delete and Escape are for the widget, unless a field, a dialog or a menu has the key', () => {
  const { heard, press } = emitterWithKeys();
  const page = [element('div'), element('body')];

  press('Escape', page);
  press('Delete', page);
  press('a', page);
  assert.deepEqual(heard.splice(0), ['deselect', 'delete']);

  const inside = [
    [element('input', true), ...page],
    [element('button'), element('dialog'), ...page],
    [element('button'), element('or-vaadin-dialog'), ...page],
    [element('div'), element('vaadin-dialog-overlay'), ...page],
    [element('button'), element('or-vaadin-confirm-dialog'), ...page],
    [element('div'), element('vaadin-menu-bar-overlay'), ...page],
  ];
  for (const path of inside) {
    press('Escape', path);
    press('Delete', path);
  }
  assert.deepEqual(heard.splice(0), []);
});

test('Ctrl+S saves wherever the focus is', () => {
  const { heard, press } = emitterWithKeys();
  const field = element('input', true);

  press('s', [field], true);
  press('s', [element('or-vaadin-dialog')], true);
  press('s', [field]);
  assert.deepEqual(heard, ['save', 'save']);
});

// --- dashboards and widget types ---

test('a new dashboard has 12 columns and wraps to one column on a phone', () => {
  const template = DashboardService.newTemplate('d');

  assert.deepEqual([template.id, template.columns, template.widgets], ['d', 12, []]);
  assert.equal(getActivePreset(500, template.screenPresets)?.scalingPreset, 'WRAP_TO_SINGLE_COLUMN');
  assert.equal(getActivePreset(1200, template.screenPresets), undefined);
  assert.notEqual(DashboardService.newTemplate().id, DashboardService.newTemplate().id);
});

test('a line chart saved without a number of points gets it, so that it is drawn the same every time', () => {
  const manifest = WIDGET_SPECS.linechart;
  const saved = { ...manifest.getDefaultConfig(), datapointQuery: { type: 'lttb' } };
  const corrected = WidgetService.correctToConfigSpec(manifest, saved);

  assert.deepEqual(corrected.datapointQuery, { type: 'lttb', amountOfPoints: 200 });
  assert.equal(WidgetService.correctToConfigSpec(manifest, corrected), corrected); // nothing is left to correct
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
  assert.deepEqual(downloadsOf('kpi'), []);
  assert.deepEqual(downloadsOf('hologram'), []);
});
