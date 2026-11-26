import assert from 'node:assert/strict';
import { before, test } from 'node:test';

import { loadAssetModel } from '../js/data/asset-model.js';
import { ReportContext } from '../js/data/report-context.js';
import { ServiceClient } from '../js/data/service-client.js';
import manager, { manager as namedManager, subscribe, Util } from '../js/kit/core.js';
import { isAxiosError } from '../js/kit/rest.js';
import { DAY } from '../js/model/time.js';
import { IDS, installFakeService, NOW, REALM } from './helpers/service.js';

const { AssetResource } = manager.rest.api;

before(async () => {
  installFakeService();
  ReportContext.asOf = NOW;
  ReportContext.realm = REALM;
  await loadAssetModel();
});

test('the manager is in the realm of the report, and has no role and no events to wait for', () => {
  assert.equal(manager.displayRealm, REALM);
  assert.equal(manager.hasRole('write:assets'), false);
  assert.equal(manager.isRestrictedUser(), false);
});

test('an asset is read with all its attributes, as the manager gives it in data', async () => {
  const { data } = await AssetResource.get(IDS.drip1);
  assert.equal(data.name, 'Soil drip 1');
  assert.ok(Object.keys(data.attributes).includes('tankLevel'));
});

test('the asset tree asks for all assets without attributes and gets them with their place in the tree', async () => {
  const { data } = await AssetResource.queryAssetTree({
    select: { attributes: [] }, orderBy: { property: 'NAME' }, limit: 1000,
  });
  assert.deepEqual(data.assets.map(asset => asset.name), ['Simulator', 'Soil drip 1', 'Soil drip 2', 'Soil sensor']);
  assert.deepEqual(data.assets.map(asset => Object.keys(asset.attributes).length), [0, 0, 0, 0]);
  assert.equal(data.assets[1].parentId, IDS.simulator);
  assert.equal(data.hasMore, false);
});

test('an asset query counts, finds assets by an attribute that they have, and reads parents by id', async () => {
  assert.equal((await AssetResource.queryCount({ limit: 2, parents: undefined })).data, 4);
  const withTank = await AssetResource.queryAssetTree({
    attributes: { operator: 'AND', items: [{ name: { match: 'EXACT', value: 'tankLevel' } }] },
  });
  assert.deepEqual(withTank.data.assets.map(asset => asset.id), [IDS.drip1, IDS.drip2]);
  const parents = await AssetResource.queryAssets({ ids: [IDS.simulator], select: { attributes: [] } });
  assert.deepEqual(parents.data.map(asset => asset.name), ['Simulator']);
});

test('the event that asks for the asset tree is answered with the tree', async () => {
  const reply = await manager.getEventProvider().sendEventWithReply({
    eventType: 'read-asset-tree', assetQuery: { select: { attributes: [] }, parents: [{ id: IDS.simulator }] },
  });
  assert.equal(reply.assetTree.assets.length, 3);
  assert.equal(reply.assetTree.hasMore, false);
});

test('the data points are answered as the manager answers them, and fail or are cancelled like its calls', async () => {
  const { AssetDatapointResource, AssetPredictedDatapointResource } = manager.rest.api;
  const query = { type: 'lttb', amountOfPoints: 10, fromTimestamp: NOW - DAY, toTimestamp: NOW };

  const response = await AssetDatapointResource.getDatapoints(IDS.drip1, 'flowWater', query, {});
  assert.equal(response.status, 200);
  assert.equal(response.data.length, 10);
  assert.deepEqual(Object.keys(response.data[0]), ['x', 'y']);
  assert.deepEqual(await AssetPredictedDatapointResource.getPredictedDatapoints(IDS.drip1, 'flowWater', query),
    { status: 200, data: [] });
  assert.equal(manager.getRealm(), REALM);

  // a call that is aborted fails as in axios, before it is made or while it is on its way
  const aborted = new AbortController();
  aborted.abort();
  await assert.rejects(
    AssetDatapointResource.getDatapoints(IDS.drip1, 'flowWater', query, { signal: aborted.signal }),
    error => error.message === 'canceled' && isAxiosError(error));
  const later = new AbortController();
  const pending = AssetDatapointResource.getDatapoints(IDS.drip1, 'flowWater', query, { signal: later.signal });
  later.abort();
  await assert.rejects(pending, /canceled/);

  // an answer of the service with an error status gives an error of axios with that status
  const fetch = ServiceClient.fetch;
  try {
    ServiceClient.fetch = async () => ({
      ok: false, status: 413, json: async () => ({ error: 'use a shorter range' }),
    });
    await assert.rejects(AssetDatapointResource.getDatapoints(IDS.drip1, 'flowWater', query),
      error => isAxiosError(error) && error.response.status === 413 && /shorter range/.test(error.message));
  } finally {
    ServiceClient.fetch = fetch;
  }
  assert.equal(isAxiosError(new Error('x')), false);
  assert.equal(isAxiosError(undefined), false);
});

test('the current value of an attribute is answered to the event that asks for it', async () => {
  const ref = { id: IDS.drip1, name: 'tankLevel' };
  const reply = await manager.events.sendEventWithReply({ eventType: 'read-asset-attribute', ref });

  assert.equal(reply.eventType, 'attribute');
  assert.deepEqual(reply.ref, ref);
  assert.equal(reply.value, 936);
  assert.equal((await manager.events.sendEventWithReply(
    { eventType: 'read-asset-attribute', ref: { id: IDS.drip1, name: 'nope' } })).value, undefined);
  assert.equal(manager.events, manager.getEventProvider());
  assert.equal(manager, namedManager);
  assert.throws(() => manager.events.sendEventWithReply({ eventType: 'dance' }), /does not answer events/);
  assert.equal(await manager.console.retrieveData('OrChartConfig'), undefined); // no settings are kept
});

test('a component that subscribes is told at once that the events are there, and when they are gone', () => {
  const calls = [];
  class Base {
    connectedCallback() { calls.push('base connected'); }

    disconnectedCallback() { calls.push('base disconnected'); }
  }
  class Component extends subscribe(manager)(Base) {
    onEventsConnect() { calls.push('events connected'); }

    onEventsDisconnect() { calls.push('events disconnected'); }
  }
  const component = new Component();
  component.connectedCallback();
  component.disconnectedCallback();
  assert.deepEqual(calls, ['base connected', 'events connected', 'events disconnected', 'base disconnected']);
});

test('the helpers of OpenRemote that the components use', async () => {
  assert.equal(Util.sentenceCaseToCamelCase('Tank level'), 'tankLevel');
  assert.equal(Util.camelCaseToSentenceCase('tankLevel'), 'Tank level');
  assert.equal(Util.stringMatch('Irrigation*', 'IrrigationAsset'), true);
  assert.equal(Util.stringMatch('*Asset', 'IrrigationAsset'), true);
  assert.equal(Util.stringMatch('^Irr.*Asset$', 'IrrigationAsset'), true);
  assert.equal(Util.stringMatch('Soil', 'IrrigationAsset'), false);
  assert.equal(Util.getAssetTypeLabel('IrrigationAsset'), 'Irrigation asset');
  const label = Util.getAttributeLabel({ name: 'tankLevel', meta: {} }, undefined, 'IrrigationAsset', false);
  assert.equal(label, 'Tank level');
  const byNumber = [{ n: 3 }, { n: 1 }, { n: 2 }].sort(Util.sortByNumber(item => item.n));
  assert.deepEqual(byNumber.map(item => item.n), [1, 2, 3]);
  assert.deepEqual(['b', 'c', 'a'].sort(Util.sortByString(item => item)), ['a', 'b', 'c']);

  // the units of an attribute are its own, or else those of the asset model, and are shown as symbols
  const descriptor = { meta: { units: ['litre', 'per', 'hour'] } };
  assert.deepEqual(Util.getAttributeUnits({ meta: { units: ['litre'] } }, descriptor, 'IrrigationAsset'), ['litre']);
  assert.deepEqual(Util.getAttributeUnits({ meta: {} }, descriptor, 'IrrigationAsset'), ['litre', 'per', 'hour']);
  assert.equal(Util.getAttributeUnits({ meta: {} }, undefined, 'IrrigationAsset'), undefined);
  assert.equal(Util.resolveUnits(['litre', 'per', 'hour']), 'l/h');
  assert.equal(Util.resolveUnits(undefined), '');

  // a request event that a listener can disallow, answered one tick later with what the listener left in its detail
  const target = new EventTarget();
  target.addEventListener('request', event => { event.detail.allow = false; });
  const answer = await Util.dispatchCancellableEvent(target, new CustomEvent('request', { detail: { allow: true } }));
  assert.equal(answer.allow, false);
});
