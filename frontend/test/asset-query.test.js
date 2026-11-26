import assert from 'node:assert/strict';
import { test } from 'node:test';

import { runAssetQuery, stringMatches } from '../js/data/asset-query.js';

const asset = (id, name, type, parentId, createdOn, attributeNames = []) => ({
  id,
  name,
  type,
  parentId,
  path: parentId ? [...ASSETS_BY_ID.get(parentId).path, id] : [id],
  createdOn,
  attributes: Object.fromEntries(attributeNames.map(attribute => [attribute, { name: attribute }])),
});
const ASSETS_BY_ID = new Map();
const add = (...args) => {
  const created = asset(...args);
  ASSETS_BY_ID.set(created.id, created);
  return created;
};

// a building with two lights and a sensor, a second root with one light
const building = add('b', 'Building', 'BuildingAsset', null, 1, ['notes']);
const light1 = add('l1', 'Light one', 'LightAsset', 'b', 2, ['brightness', 'onOff']);
const light2 = add('l2', 'light TWO', 'LightAsset', 'b', 4, ['brightness']);
const sensor = add('s', 'Sensor', 'SensorAsset', 'b', 3, ['temperature']);
const street = add('r', 'Street', 'ThingAsset', null, 5);
const light3 = add('l3', 'Street light', 'LightAsset', 'r', 6, ['brightness']);
const ASSETS = [building, light1, light2, sensor, street, light3];

const idsOf = query => runAssetQuery(ASSETS, query).assets.map(found => found.id);

test('a query without conditions gives every asset', () => {
  assert.deepEqual(idsOf(), ['b', 'l1', 'l2', 's', 'r', 'l3']);
});

test('ids give those assets, and with recursive everything below them as well', () => {
  assert.deepEqual(idsOf({ ids: ['l1', 's'] }), ['l1', 's']);
  assert.deepEqual(idsOf({ ids: ['b'], recursive: true }), ['b', 'l1', 'l2', 's']);
});

test('no parents, or a parent that is none, gives the assets at the top; a parent gives its children', () => {
  assert.deepEqual(idsOf({ parents: [] }), ['b', 'r']);
  assert.deepEqual(idsOf({ parents: [{ noParent: true }] }), ['b', 'r']);
  assert.deepEqual(idsOf({ parents: [{ id: 'b' }] }), ['l1', 'l2', 's']);
});

test('types and names narrow the assets; every name has to match', () => {
  assert.deepEqual(idsOf({ types: ['LightAsset'] }), ['l1', 'l2', 'l3']);
  assert.deepEqual(idsOf({ types: ['SensorAsset', 'ThingAsset'] }), ['s', 'r']);
  const contains = value => ({ match: 'CONTAINS', value, caseSensitive: false });
  assert.deepEqual(idsOf({ names: [contains('LIGHT')] }), ['l1', 'l2', 'l3']);
  assert.deepEqual(idsOf({ names: [contains('light'), contains('street')] }), ['l3']);
});

test('a string predicate matches exactly, at the start, at the end or inside, and can be turned around', () => {
  assert.equal(stringMatches({ match: 'EXACT', value: 'Street' }, 'Street'), true);
  assert.equal(stringMatches({ match: 'EXACT', value: 'Street' }, 'Street light'), false);
  assert.equal(stringMatches({ match: 'BEGIN', value: 'Street' }, 'Street light'), true);
  assert.equal(stringMatches({ match: 'END', value: 'light' }, 'Street light'), true);
  assert.equal(stringMatches({ match: 'CONTAINS', value: 'et l' }, 'Street light'), true);
  assert.equal(stringMatches({ match: 'CONTAINS', value: 'STREET' }, 'Street light'), false);
  assert.equal(stringMatches({ match: 'CONTAINS', value: 'STREET', caseSensitive: false }, 'Street light'), true);
  assert.equal(stringMatches({ match: 'CONTAINS', value: 'Street', negate: true }, 'Street light'), false);
});

test('attributes ask for assets that have all the named attributes (AND) or any of them (OR)', () => {
  const named = value => ({ name: { match: 'EXACT', value } });
  const group = (operator, ...names) => ({ attributes: { operator, items: names.map(named) } });
  assert.deepEqual(idsOf(group('AND', 'brightness', 'onOff')), ['l1']);
  assert.deepEqual(idsOf(group('OR', 'onOff', 'temperature')), ['l1', 's']);
});

test('the assets come in the order asked for, from the offset, at most the limit, and the answer knows of more', () => {
  assert.deepEqual(idsOf({ orderBy: { property: 'NAME' } }), ['b', 'l1', 'l2', 's', 'r', 'l3']);
  assert.deepEqual(idsOf({ orderBy: { property: 'CREATED_ON' } }), ['b', 'l1', 's', 'l2', 'r', 'l3']);
  assert.deepEqual(idsOf({ orderBy: { property: 'ASSET_TYPE' } }), ['b', 'l1', 'l2', 'l3', 's', 'r']);

  const page = runAssetQuery(ASSETS, { orderBy: { property: 'CREATED_ON' }, offset: 1, limit: 2 });
  assert.deepEqual(page.assets.map(found => found.id), ['l1', 's']);
  assert.equal(page.hasMore, true);
  assert.equal(runAssetQuery(ASSETS, { offset: 4, limit: 10 }).hasMore, false);
});

test('the attributes of the answer are all, none or the selected ones, and the assets are not changed', () => {
  assert.deepEqual(Object.keys(runAssetQuery(ASSETS, { ids: ['l1'] }).assets[0].attributes), ['brightness', 'onOff']);
  assert.deepEqual(runAssetQuery(ASSETS, { ids: ['l1'], select: { attributes: [] } }).assets[0].attributes, {});
  const named = runAssetQuery(ASSETS, { ids: ['l1'], select: { attributes: ['onOff', 'unknown'] } });
  assert.deepEqual(Object.keys(named.assets[0].attributes), ['onOff']);
  assert.deepEqual(Object.keys(light1.attributes), ['brightness', 'onOff']);
});
