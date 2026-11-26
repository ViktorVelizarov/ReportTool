import assert from 'node:assert/strict';
import { before, beforeEach, test } from 'node:test';

import { AssetModelUtil, loadAssetModel, NUMERIC_VALUE_TYPES } from '../js/data/asset-model.js';
import { AssetService, lttb } from '../js/data/asset-service.js';
import { realmOf } from '../js/data/realm.js';
import { ReportContext } from '../js/data/report-context.js';
import { ServiceClient } from '../js/data/service-client.js';
import { getDefaultTimeWindowOptions, getTimeSelectionDates } from '../js/data/time-window.js';
import {
  camelCaseToSentenceCase, getAttributeLabel, getAttributeValueAsString, mergeObjects, objectsEqual, resolveUnits,
} from '../js/data/util.js';
import { DAY, HOUR } from '../js/model/time.js';
import { IDS, installFakeService, NOW, REALM } from './helpers/service.js';

process.env.TZ = 'UTC';

const { drip1, drip2, sensor, simulator } = IDS;
const ASSET = id => `/assets/${id}`;
const POINTS = (id, name) => `/assets/${id}/attributes/${name}/datapoints`;

let calls;

before(async () => {
  calls = installFakeService();
  ReportContext.asOf = NOW;
  ReportContext.realm = REALM;
  await loadAssetModel();
});

beforeEach(() => {
  calls.length = 0;
});

/** Runs the check with another realm in the report, and puts the realm back. */
async function inRealm(realm, check) {
  ReportContext.realm = realm;
  try {
    await check();
  } finally {
    ReportContext.realm = REALM;
  }
}

// --- the realm of the report ---

test('the realm is read from the address: the path for a super user, the query for any other user', () => {
  const realm = address => realmOf(new URL(address, 'http://localhost:5000'));

  assert.equal(realm('/manufacturer'), 'manufacturer');
  assert.equal(realm('/my-realm_2'), 'my-realm_2');
  assert.equal(realm('/?realm=smartcity'), 'smartcity');
  assert.equal(realm('/?asOf=1&realm=smartcity'), 'smartcity');
  assert.equal(realm('/manufacturer?realm=smartcity'), 'smartcity', 'a realm in the query wins');
});

test('an address that names no realm, or something that is not a realm name, gives no realm', () => {
  const realm = address => realmOf(new URL(address, 'http://localhost:5000'));

  for (const address of ['/', '/?realm=', '/?asOf=1', '/index.html', '/js/main.js', '/a/b', '/?realm=a.b',
    '/?realm=a%2Fb', '/?realm=a%20b']) {
    assert.equal(realm(address), undefined, address);
  }
});

// --- the calls to the service ---

test('the parameters of a call are sent, except those that are undefined', async () => {
  await ServiceClient.getJson('/assets', { realm: 'a b', type: undefined, attributes: '*' });
  await ServiceClient.getJson('/model/assetInfos');

  assert.deepEqual(calls, ['/assets?realm=a+b&attributes=*', '/model/assetInfos']);
});

test('an answer that is not a success is an error with the message of the service and its status', async () => {
  await assert.rejects(ServiceClient.getJson(ASSET('nope')),
    error => error.message === 'asset not found' && error.status === 404);

  const fetch = ServiceClient.fetch;
  try {
    ServiceClient.fetch = async () => ({ ok: false, status: 500, json: async () => { throw new Error('not JSON'); } });
    await assert.rejects(ServiceClient.getJson('/assets'),
      error => error.message === 'The report service answered 500' && error.status === 500);

    ServiceClient.fetch = async () => { throw new TypeError('Failed to fetch'); };
    await assert.rejects(ServiceClient.getJson('/assets'), /The report service cannot be reached/);
  } finally {
    ServiceClient.fetch = fetch;
  }
});

// --- assets ---

test('assets come in the shape of OpenRemote with only the requested attributes', async () => {
  const [asset] = await AssetService.queryAssets({ ids: [drip1], select: { attributes: ['flowWater', 'location'] } });

  assert.equal(asset.name, 'Soil drip 1');
  assert.equal(asset.type, 'IrrigationAsset');
  assert.equal(asset.realm, REALM);
  assert.deepEqual(Object.keys(asset.attributes), ['flowWater', 'location']);
  assert.equal(asset.attributes.flowWater.type, 'positiveNumber');
  assert.equal(asset.attributes.flowWater.value, 9.6);
  assert.equal(asset.attributes.flowWater.meta.storeDataPoints, true);
  assert.deepEqual(asset.attributes.location.value, { type: 'Point', coordinates: [4.311493, 51.961554] });
  assert.deepEqual(calls, [`${ASSET(drip1)}?realm=${REALM}`]);
});

test('an attribute gets the units of the model, unless it has units of its own', async () => {
  const [asset] = await AssetService.queryAssets({ ids: [sensor] });

  assert.deepEqual(asset.attributes.salinity.meta.units, undefined);
  assert.deepEqual(asset.attributes.temperature.meta.units, ['fahrenheit']);
  const [drip] = await AssetService.queryAssets({ ids: [drip1], select: { attributes: ['flowWater', 'tankLevel'] } });
  assert.deepEqual(drip.attributes.flowWater.meta.units, ['litre', 'per', 'hour']);
  assert.deepEqual(drip.attributes.tankLevel.meta.units, ['litre']);
  assert.equal(drip.attributes.tankLevel.meta.storeDataPoints, true, 'its own meta items stay');
});

test('assets can be asked for by type, with the attributes that are listed, all or none', async () => {
  const drips = await AssetService.queryAssets({ types: ['IrrigationAsset'] });
  assert.deepEqual(drips.map(asset => asset.id), [drip1, drip2]);
  assert.ok(Object.keys(drips[0].attributes).includes('tankLevel'));

  const some = await AssetService.queryAssets({ types: ['IrrigationAsset'], select: { attributes: ['flowWater'] } });
  assert.deepEqual(Object.keys(some[1].attributes), ['flowWater']);

  const none = await AssetService.queryAssets({ types: ['IrrigationAsset'], select: { attributes: [] } });
  assert.deepEqual(none.map(asset => asset.attributes), [{}, {}]);

  assert.deepEqual(calls, [
    `/assets?realm=${REALM}&type=IrrigationAsset&attributes=*`,
    `/assets?realm=${REALM}&type=IrrigationAsset&attributes=flowWater`,
    `/assets?realm=${REALM}&type=IrrigationAsset`,
  ]);
});

test('without a query all assets come, with all their attributes', async () => {
  const assets = await AssetService.queryAssets();

  assert.deepEqual(assets.map(asset => asset.name), ['Simulator', 'Soil drip 1', 'Soil drip 2', 'Soil sensor']);
  assert.deepEqual(Object.keys(assets[0].attributes), ['agentStatus']);
  assert.deepEqual(calls, [`/assets?realm=${REALM}&attributes=*`]);
});

test('assets that the realm does not have are left out, and no ids give no assets and no calls', async () => {
  assert.deepEqual((await AssetService.queryAssets({ ids: [drip1, 'nope'] })).map(asset => asset.id), [drip1]);
  assert.deepEqual(await AssetService.queryAssets({ ids: ['nope'] }), []);

  calls.length = 0;
  assert.deepEqual(await AssetService.queryAssets({ ids: [] }), []);
  assert.deepEqual(await AssetService.queryAssets({ ids: [], types: ['IrrigationAsset'] }), []);
  assert.deepEqual(calls, []);
});

test('assets are asked for once each, and ids narrow down the assets of a type', async () => {
  await AssetService.queryAssets({ ids: [drip1, drip2, drip1] });
  assert.deepEqual(calls, [`${ASSET(drip1)}?realm=${REALM}`, `${ASSET(drip2)}?realm=${REALM}`]);

  calls.length = 0;
  const drips = await AssetService.queryAssets({ types: ['IrrigationAsset'], ids: [drip2, sensor] });
  assert.deepEqual(drips.map(asset => asset.id), [drip2]);
  assert.deepEqual(calls, [`/assets?realm=${REALM}&type=IrrigationAsset&attributes=*`]);

  calls.length = 0;
  const both = await AssetService.queryAssets({ types: ['IrrigationAsset', 'SoilSensorAsset'] });
  assert.deepEqual(both.map(asset => asset.id), [drip1, drip2, sensor]);
  assert.equal(calls.length, 2);
});

test('the realm of the report goes with every call, and a report without a realm leaves it out', async () => {
  await inRealm('smartcity', async () => {
    await AssetService.queryAssets({ ids: [drip1] });
    await AssetService.getDatapoints(drip1, 'flowWater', { fromTimestamp: NOW - HOUR, toTimestamp: NOW });
    assert.ok(calls.every(call => call.includes('realm=smartcity')), calls.join('\n'));
  });

  await inRealm(undefined, async () => {
    calls.length = 0;
    await AssetService.queryAssets({ ids: [drip1] });
    await AssetService.queryAssets({ types: ['IrrigationAsset'], select: { attributes: [] } });
    assert.deepEqual(calls, [ASSET(drip1), '/assets?type=IrrigationAsset']);
  });
});

// --- data points ---

test('data points lie in the range, oldest first, and booleans are 1 or 0', async () => {
  const from = NOW - 3 * DAY;
  const points = await AssetService.getDatapoints(drip1, 'flowWater', { fromTimestamp: from, toTimestamp: NOW });

  assert.equal(points.length, 3 * 24); // one at every full hour between two moments at half past three
  assert.ok(points.every(p => p.x >= from && p.x <= NOW));
  assert.ok(points.every((p, i) => i === 0 || p.x > points[i - 1].x));
  assert.ok(points.every(p => typeof p.y === 'number'));
  assert.deepEqual(calls, [`${POINTS(drip1, 'flowWater')}?realm=${REALM}&from=${from}&to=${NOW}`]);

  const flags = await AssetService.getDatapoints(drip1, 'online', { fromTimestamp: from, toTimestamp: NOW });
  assert.ok(flags.length > 60 && flags.every(p => p.y === 0 || p.y === 1));
  assert.ok(flags.some(p => p.y === 1) && flags.some(p => p.y === 0));
});

test('the range ends at the moment of the report by default and is a day long', async () => {
  const points = await AssetService.getDatapoints(drip1, 'flowWater');

  assert.deepEqual(calls, [`${POINTS(drip1, 'flowWater')}?realm=${REALM}&from=${NOW - DAY}&to=${NOW}`]);
  assert.equal(points.length, 24);
});

test('a time that is not whole milliseconds is rounded, and a range backwards has no points and no call', async () => {
  await AssetService.getDatapoints(drip1, 'flowWater', { fromTimestamp: NOW - DAY + 0.4, toTimestamp: NOW + 0.6 });
  assert.deepEqual(calls, [`${POINTS(drip1, 'flowWater')}?realm=${REALM}&from=${NOW - DAY}&to=${NOW + 1}`]);

  calls.length = 0;
  const backwards = { fromTimestamp: NOW, toTimestamp: NOW - 1 };
  assert.deepEqual(await AssetService.getDatapoints(drip1, 'flowWater', backwards), []);
  assert.deepEqual(calls, []);
});

test('attributes that keep no history, or have no value yet, have no data points', async () => {
  assert.deepEqual(await AssetService.getDatapoints(drip1, 'location'), []);
  assert.deepEqual(await AssetService.getDatapoints(sensor, 'temperature'), []);
  assert.deepEqual(await AssetService.getDatapoints(simulator, 'agentStatus'), []);
  assert.deepEqual(await AssetService.getDatapoints(drip1, 'nope'), []);
  assert.deepEqual(await AssetService.getDatapoints('nope', 'flowWater'), []);
});

test('data points that are not numbers are left out', async () => {
  assert.deepEqual(await AssetService.getDatapoints(drip2, 'status', { fromTimestamp: NOW - DAY }), []);

  const fetch = ServiceClient.fetch;
  try {
    ServiceClient.fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => [{ timestamp: 3, value: 2 }, { timestamp: 2, value: null }, { timestamp: 1, value: 'x' }],
    });
    assert.deepEqual(await AssetService.getDatapoints(drip1, 'flowWater'), [{ x: 3, y: 2 }]);
  } finally {
    ServiceClient.fetch = fetch;
  }
});

test('an error of the service is passed on', async () => {
  const fetch = ServiceClient.fetch;
  try {
    ServiceClient.fetch = async () => ({
      ok: false,
      status: 413,
      json: async () => ({ error: 'too many data points for one query: use a shorter range' }),
    });
    await assert.rejects(AssetService.getDatapoints(drip1, 'flowWater'), /use a shorter range/);
    await assert.rejects(AssetService.queryAssets({ ids: [drip1] }), /use a shorter range/);
  } finally {
    ServiceClient.fetch = fetch;
  }
});

test('lttb keeps the first and the last point and the requested number of points', async () => {
  const query = { fromTimestamp: NOW - 30 * DAY, toTimestamp: NOW };
  const all = await AssetService.getDatapoints(drip1, 'flowWater', query);
  const sampled = await AssetService.getDatapoints(drip1, 'flowWater', { ...query, type: 'lttb', amountOfPoints: 90 });

  assert.equal(all.length, 30 * 24);
  assert.equal(sampled.length, 90);
  assert.deepEqual(sampled[0], all[0]);
  assert.deepEqual(sampled.at(-1), all.at(-1));
  assert.deepEqual(lttb(all.slice(0, 5), 90), all.slice(0, 5)); // nothing to remove
});

test('interval queries give one point per interval, minimum below average below maximum', async () => {
  const query = { type: 'interval', interval: '1 day', fromTimestamp: NOW - 5 * DAY, toTimestamp: NOW };
  const [avg, min, max] = await Promise.all(['AVG', 'MIN', 'MAX']
    .map(formula => AssetService.getDatapoints(drip1, 'flowWater', { ...query, formula })));

  assert.ok(avg.length >= 5 && avg.length <= 6);
  assert.ok(avg.every(p => p.x % DAY === 0));
  avg.forEach((p, i) => assert.ok(min[i].y <= p.y && p.y <= max[i].y));
  assert.ok(max.some((p, i) => p.y > min[i].y));
});

test('the interval of a query is read from text; one that cannot be read gives all points', async () => {
  const query = { type: 'interval', fromTimestamp: NOW - DAY, toTimestamp: NOW };
  const points = interval => AssetService.getDatapoints(drip1, 'flowWater', { ...query, interval });
  const steps = list => [...new Set(list.slice(1).map((point, i) => point.x - list[i].x))];

  assert.deepEqual(steps(await points('2 hours')), [2 * HOUR]);
  assert.deepEqual(steps(await points('1 hour')), [HOUR]);
  assert.deepEqual(steps(await points('soon')), [HOUR]);
  assert.deepEqual(steps(await points(undefined)), [HOUR]);
});

// --- asset model and helpers ---

test('the asset model has the types of the manager, with a label, an icon and a colour', () => {
  const types = AssetModelUtil.getAssetDescriptors();

  assert.deepEqual(types.map(type => type.name),
    ['IrrigationAsset', 'SoilSensorAsset', 'ElectricityProducerSolarAsset', 'SimulatorAgent']);
  assert.deepEqual(AssetModelUtil.getAssetDescriptor('IrrigationAsset'), {
    descriptorType: 'asset', name: 'IrrigationAsset', icon: 'water-pump', colour: '3d85c6', label: 'Irrigation asset',
  });
  assert.equal(AssetModelUtil.getAssetDescriptor('SimulatorAgent').descriptorType, 'agent');
  assert.equal(AssetModelUtil.getAssetDescriptor('NoSuchAsset'), undefined);
  assert.equal(AssetModelUtil.getAssetDescriptor('SoilSensorAsset').label, 'Soil sensor asset');
  assert.equal(AssetModelUtil.getAssetDescriptor('ElectricityProducerSolarAsset').label, 'PV solar asset',
    'a label that OpenRemote translates');
});

test('the asset model knows the attributes of a type, with their label and units, and the numeric value types', () => {
  const info = AssetModelUtil.getAssetTypeInfo(AssetModelUtil.getAssetDescriptor('IrrigationAsset'));

  assert.deepEqual(info.attributeDescriptors.map(attribute => attribute.name),
    ['notes', 'flowWater', 'flowNutrients', 'tankLevel', 'online', 'status', 'location']);
  assert.deepEqual(AssetModelUtil.getAttributeDescriptor('flowWater', 'IrrigationAsset'), {
    name: 'flowWater', type: 'positiveNumber', meta: { label: 'Flow water', units: ['litre', 'per', 'hour'] },
  });
  assert.deepEqual(AssetModelUtil.getAttributeDescriptor('notes', 'IrrigationAsset').meta, { label: 'Notes' });
  assert.equal(AssetModelUtil.getAttributeDescriptor('flowWater', 'SoilSensorAsset'), undefined);
  assert.equal(AssetModelUtil.getAttributeDescriptor('flowWater', 'NoSuchAsset'), undefined);
  assert.deepEqual(AssetModelUtil.getAssetTypeInfo('NoSuchAsset').attributeDescriptors, []);
  assert.deepEqual(AssetModelUtil.getAttributeAndValueDescriptors('IrrigationAsset', 'tankLevel', { type: 'long' })
    .map(descriptor => descriptor?.name ?? descriptor), ['tankLevel', 'long']);
  assert.ok(NUMERIC_VALUE_TYPES.includes('positiveNumber') && !NUMERIC_VALUE_TYPES.includes('boolean'));
});

test('a failure to read the model is an error', async () => {
  const fetch = ServiceClient.fetch;
  try {
    ServiceClient.fetch = async () => ({ ok: false, status: 502, json: async () => ({ error: 'OpenRemote is down' }) });
    await assert.rejects(loadAssetModel(), /OpenRemote is down/);
    assert.equal(AssetModelUtil.getAssetDescriptors().length, 4, 'the model that was read stays');
  } finally {
    ServiceClient.fetch = fetch;
  }
});

test('units are made of their parts as OpenRemote makes them', () => {
  assert.equal(resolveUnits(['litre', 'per', 'hour']), 'l/h');
  assert.equal(resolveUnits(['kilo', 'pascal']), 'kPa');
  assert.equal(resolveUnits(['celsius']), '°C');
  assert.equal(resolveUnits(['metre', 'squared']), 'm²');
  assert.equal(resolveUnits(['EUR', 'per', 'kilo', 'watt', 'hour']), '€/kWh');
  assert.equal(resolveUnits(['furlong']), 'furlong', 'a part without a symbol stays as it is');
  assert.equal(resolveUnits([]), '');
  assert.equal(resolveUnits(undefined), '');
});

test('labels and values are shown with their units', async () => {
  const [asset] = await AssetService.queryAssets({ ids: [drip1], select: { attributes: ['flowWater', 'online'] } });
  const { flowWater, online } = asset.attributes;

  assert.equal(getAttributeLabel(flowWater, undefined, true), 'Flow water (l/h)');
  assert.equal(getAttributeLabel(flowWater, undefined, false), 'Flow water');
  assert.equal(getAttributeValueAsString(flowWater, undefined, true), '9.6 l/h');
  assert.equal(getAttributeValueAsString(online, undefined, true), 'On');
  assert.equal(getAttributeValueAsString({ name: 'x' }, undefined, true, '-'), '-');
  assert.equal(getAttributeValueAsString({ name: 'x', value: null }, undefined, true, '-'), '-');
  assert.equal(getAttributeLabel({ name: 'oilTemp' }, undefined, false), 'Oil temp');
  assert.equal(camelCaseToSentenceCase('SoilSensorAsset'), 'Soil sensor asset');
});

test('objects are compared deeply and merged without changing the originals', () => {
  assert.ok(objectsEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
  assert.ok(!objectsEqual({ a: [1, 2] }, { a: [1, 3] }));
  assert.ok(!objectsEqual({ a: 1 }, { a: 1, b: 2 }));

  const defaults = { size: 2, list: [1], nested: { a: 1, b: 2 } };
  const merged = mergeObjects(defaults, { size: 5, list: [9], nested: { b: 3 } }, false);
  assert.deepEqual(merged, { size: 5, list: [9], nested: { a: 1, b: 3 } });
  assert.deepEqual(defaults, { size: 2, list: [1], nested: { a: 1, b: 2 } });
  assert.deepEqual(mergeObjects({ list: [1] }, { list: [2] }, true).list, [1, 2]);
});

// --- time windows ---

const iso = ([from, to]) => [from.toISOString(), to.toISOString()];

test('"this" a single unit is the whole unit, a few units are centred on now', () => {
  const now = new Date(NOW);

  const window = key => iso(getTimeSelectionDates('this', key, now));
  assert.deepEqual(window('Day'), ['2026-10-04T00:00:00.000Z', '2026-10-04T23:59:59.999Z']);
  assert.deepEqual(window('Hour'), ['2026-10-04T15:00:00.000Z', '2026-10-04T15:59:59.999Z']);
  assert.deepEqual(window('6Hours'), ['2026-10-04T12:30:00.000Z', '2026-10-04T18:30:00.000Z']);
});

test('"last" a single unit is the unit before this one, a few units end now', () => {
  const now = new Date(NOW);

  const window = key => iso(getTimeSelectionDates('last', key, now));
  assert.deepEqual(window('Day'), ['2026-10-03T00:00:00.000Z', '2026-10-04T00:00:00.000Z']);
  assert.deepEqual(window('Month'), ['2026-09-01T00:00:00.000Z', '2026-10-01T00:00:00.000Z']);
  assert.deepEqual(window('Week'), ['2026-09-21T00:00:00.000Z', '2026-09-28T00:00:00.000Z']);
  assert.deepEqual(window('7Days'), ['2026-09-27T00:00:00.000Z', '2026-10-04T15:30:00.000Z']);
});

test('"next" looks ahead', () => {
  const now = new Date(NOW);

  const window = key => iso(getTimeSelectionDates('next', key, now));
  assert.deepEqual(window('Day'), ['2026-10-05T00:00:00.000Z', '2026-10-05T23:59:59.999Z']);
  assert.deepEqual(window('24Hours'), ['2026-10-04T15:30:00.000Z', '2026-10-05T15:30:00.000Z']);
});

test('every window can be resolved, and a wrong one is refused', () => {
  const now = new Date(NOW);

  for (const key of getDefaultTimeWindowOptions().keys()) {
    for (const prefix of ['this', 'last', 'next']) {
      const [from, to] = getTimeSelectionDates(prefix, key, now);
      assert.ok(from < to, `${prefix} ${key}`);
    }
  }
  assert.throws(() => getTimeSelectionDates('this', 'Decade', now), /Unsupported time window/);
  assert.throws(() => getTimeSelectionDates('soon', 'Day', now), /Unsupported time prefix/);
});
