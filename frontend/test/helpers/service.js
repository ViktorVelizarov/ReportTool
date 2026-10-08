/**
 * A fake of the report service for the tests: the asset model and a few assets of a realm in the JSON that the service
 * gives, and data points that are generated from the time (one every full hour). Every call that the page makes is
 * recorded. It answers like the service does, also with the errors, but it checks nothing: the tests look at the calls.
 */

import { ServiceClient } from '../../js/data/service-client.js';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/** The moment of the current values of the assets; the history reaches back 100 days from it. */
export const NOW = Date.parse('2026-10-04T15:30:00Z');
const HISTORY_START = NOW - 100 * DAY;

export const REALM = 'manufacturer';

export const IDS = {
  drip1: '5xl65BMWEKtRiEchVBkANS',
  drip2: '6PH7Ti0yKO9iQG8xeRMtSZ',
  sensor: '29ztI1P1kkwTJnLeMdsFL4',
  simulator: '56IumZ2fW9eSYOy3MQs8y2',
};

/** The model of the manager, as the service gives it (without the lists of meta items and value types). */
const ASSET_INFOS = [
  {
    assetDescriptor: { descriptorType: 'asset', name: 'IrrigationAsset', icon: 'water-pump', colour: '3d85c6' },
    attributeDescriptors: [
      { name: 'notes', type: 'text' },
      { name: 'flowWater', type: 'positiveNumber', units: ['litre', 'per', 'hour'] },
      { name: 'flowNutrients', type: 'positiveNumber', units: ['litre', 'per', 'hour'] },
      { name: 'tankLevel', type: 'positiveNumber', units: ['litre'] },
      { name: 'online', type: 'boolean' },
      { name: 'status', type: 'text' },
      { name: 'location', type: 'GEO_JSONPoint' },
    ],
  },
  {
    assetDescriptor: { descriptorType: 'asset', name: 'SoilSensorAsset', icon: 'water-percent', colour: '993333' },
    attributeDescriptors: [
      { name: 'salinity', type: 'number' },
      { name: 'temperature', type: 'number', units: ['celsius'] },
      { name: 'location', type: 'GEO_JSONPoint' },
    ],
  },
  {
    assetDescriptor: { descriptorType: 'asset', name: 'ElectricityProducerSolarAsset', icon: 'white-balance-sunny' },
    attributeDescriptors: [{ name: 'power', type: 'number', units: ['kilo', 'watt'] }],
  },
  {
    assetDescriptor: { descriptorType: 'agent', name: 'SimulatorAgent', icon: 'cogs', colour: '000000' },
    attributeDescriptors: [{ name: 'agentStatus', type: 'connectionStatus' }],
  },
];

const attribute = (name, type, value, meta = {}) => ({ name, type, value, timestamp: NOW - HOUR, meta });
const stored = { storeDataPoints: true };
const point = (lng, lat) => ({ type: 'Point', coordinates: [lng, lat] });

/**
 * The assets of the realm. An attribute that stores data points has history, unless it has no value yet. The
 * temperature of the sensor has units of its own, which are those that count.
 */
const ASSETS = [
  {
    id: IDS.simulator, name: 'Simulator', type: 'SimulatorAgent', realm: REALM, parentId: null,
    path: [IDS.simulator], createdOn: 1000, version: 0, accessPublicRead: false,
    attributes: { agentStatus: attribute('agentStatus', 'connectionStatus', 'CONNECTED', { readOnly: true }) },
  },
  {
    id: IDS.drip1, name: 'Soil drip 1', type: 'IrrigationAsset', realm: REALM, parentId: IDS.simulator,
    path: [IDS.simulator, IDS.drip1], createdOn: 2000, version: 0, accessPublicRead: false,
    attributes: {
      notes: attribute('notes', 'text', null),
      flowWater: attribute('flowWater', 'positiveNumber', 9.6, stored),
      flowNutrients: attribute('flowNutrients', 'positiveNumber', 0.5, stored),
      tankLevel: attribute('tankLevel', 'positiveNumber', 936, stored),
      online: attribute('online', 'boolean', true, stored),
      location: attribute('location', 'GEO_JSONPoint', point(4.311493, 51.961554)),
    },
  },
  {
    id: IDS.drip2, name: 'Soil drip 2', type: 'IrrigationAsset', realm: REALM, parentId: IDS.simulator,
    path: [IDS.simulator, IDS.drip2], createdOn: 3000, version: 0, accessPublicRead: false,
    attributes: {
      flowWater: attribute('flowWater', 'positiveNumber', 11.6, stored),
      flowNutrients: attribute('flowNutrients', 'positiveNumber', 0.7, stored),
      tankLevel: attribute('tankLevel', 'positiveNumber', null, stored),
      status: attribute('status', 'text', 'filling', stored),
      location: attribute('location', 'GEO_JSONPoint', point(4.3125, 51.9618)),
    },
  },
  {
    id: IDS.sensor, name: 'Soil sensor', type: 'SoilSensorAsset', realm: REALM, parentId: IDS.simulator,
    path: [IDS.simulator, IDS.sensor], createdOn: 4000, version: 0, accessPublicRead: false,
    attributes: {
      salinity: attribute('salinity', 'number', 28, stored),
      temperature: attribute('temperature', 'number', null, { ...stored, units: ['fahrenheit'] }),
      location: attribute('location', 'GEO_JSONPoint', point(4.310436, 51.961354)),
    },
  },
];

const hasHistory = ({ meta, value }) => Boolean(meta.storeDataPoints) && value !== null;

/** The value of the data point of an attribute at a full hour: the same every time. */
function datapointValue(assetId, { name, type }, timestamp) {
  const seed = [...`${assetId}.${name}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  if (type === 'boolean') return Math.floor(timestamp / (6 * HOUR) + seed) % 4 !== 0;
  if (type === 'text') return 'filling';
  const wave = Math.sin((timestamp / (12 * HOUR)) * Math.PI + seed);
  return Math.round((20 + (seed % 7) + 8 * wave) * 100) / 100;
}

/** The data points of an attribute from from to to (both included), newest first, as the service gives them. */
function datapointsOf(asset, attr, from, to) {
  const points = [];
  for (let t = Math.ceil(Math.max(from, HISTORY_START) / HOUR) * HOUR; t <= Math.min(to, NOW); t += HOUR) {
    points.push({ timestamp: t, value: datapointValue(asset.id, attr, t) });
  }
  return points.reverse();
}

/** The asset with the attributes that the query asks for: none without a selection, all for a star. */
function selected(asset, selection) {
  const { attributes, ...rest } = asset;
  if (selection === null) return rest;
  const names = (selection === '*' ? Object.keys(attributes) : selection.split(',')).filter(name => attributes[name]);
  return { ...rest, attributes: Object.fromEntries(names.map(name => [name, attributes[name]])) };
}

const answer = (status, body) => ({ ok: status < 400, status, json: async () => structuredClone(body) });

function respond(url) {
  const { pathname, searchParams } = new URL(url, 'http://service');
  const [, first, id, second, name, last] = pathname.split('/');

  if (pathname === '/model/assetInfos') return answer(200, ASSET_INFOS);
  if (pathname === '/assets') {
    const type = searchParams.get('type');
    const assets = ASSETS.filter(asset => !type || asset.type === type)
      .map(asset => selected(asset, searchParams.get('attributes')));
    return answer(200, { total: assets.length, assets });
  }
  if (first !== 'assets') return answer(404, { error: 'not found' });

  const asset = ASSETS.find(item => item.id === id);
  if (!second) return asset ? answer(200, selected(asset, '*')) : answer(404, { error: 'asset not found' });
  if (second !== 'attributes' || last !== 'datapoints') return answer(404, { error: 'not found' });
  const attr = asset?.attributes[name];
  if (!attr) return answer(404, { error: 'asset or attribute not found' });
  return answer(200, hasHistory(attr)
    ? datapointsOf(asset, attr, Number(searchParams.get('from')), Number(searchParams.get('to')))
    : []);
}

/** Makes the page talk to the fake instead of the service. The returned list has the address of every call. */
export function installFakeService() {
  const calls = [];
  ServiceClient.fetch = async url => {
    calls.push(url);
    return respond(url);
  };
  return calls;
}
