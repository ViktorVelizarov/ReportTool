/*
 * What the components of OpenRemote (vendor/or-mwc.js: the tabs, the table, the dialog, the asset tree, the attribute
 * pickers, the gauge, the charts and the KPI) ask of OpenRemote's core, @openremote/core, which the import map of the
 * page points to this file: the default colours, the helpers of Util that they use, and the manager, which here
 * answers from the report service instead of from the manager's REST API and events. Ported from OpenRemote's
 * ui/component/core/src (defaults.ts, util.ts, asset-mixin.ts). Original: Copyright 2026, OpenRemote Inc.,
 * AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AssetModelUtil } from '../data/asset-model.js';
import { runAssetQuery } from '../data/asset-query.js';
import { AssetService } from '../data/asset-service.js';
import { ReportContext } from '../data/report-context.js';
import {
  camelCaseToSentenceCase,
  getAssetTypeLabel,
  getAttributeLabel,
  getAttributeUnits,
  objectsEqual,
  resolveUnits,
  sortByString,
} from '../data/util.js';

export const DefaultColor1 = '#FFFFFF'; // Surface
export const DefaultColor2 = '#F9F9F9'; // Background
export const DefaultColor3 = '#4c4c4c'; // Text
export const DefaultColor4 = '#4d9d2a'; // Primary
export const DefaultColor5 = '#CCCCCC'; // Borders and lines
export const DefaultColor8 = '#FFFFFF'; // On primary

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

/** The names that a check of strings with a * at the start or the end, or a regular expression (^...$), allows. */
function stringMatch(needle, haystack) {
  if (haystack === needle) return true;
  if (needle.endsWith('*')) return haystack.startsWith(needle.slice(0, -1));
  if (needle.startsWith('*')) return haystack.endsWith(needle.slice(1));
  return needle.startsWith('^') && needle.endsWith('$') && new RegExp(needle).test(haystack);
}

function sortByNumber(valueExtractor) {
  return (a, b) => {
    const first = valueExtractor(a);
    const second = valueExtractor(b);
    if (!first && !second) return 0;
    if (first && !second) return 1;
    if (!first && second) return -1;
    return first - second;
  };
}

/** Sends a request event to the target and answers, one tick later, with its detail: a listener can disallow it. */
function dispatchCancellableEvent(target, event) {
  const deferred = new Deferred();
  target.dispatchEvent(event);
  setTimeout(() => deferred.resolve(event.detail));
  return deferred.promise;
}

export const Util = {
  Deferred,
  camelCaseToSentenceCase,
  dispatchCancellableEvent,
  getAssetTypeLabel: type =>
    getAssetTypeLabel(typeof type === 'string' ? AssetModelUtil.getAssetDescriptor(type) : type),
  getAttributeLabel: (attribute, descriptor, _assetType, showUnits) =>
    getAttributeLabel(attribute, descriptor, showUnits),
  getAttributeUnits: (attribute, descriptor, _assetType) => getAttributeUnits(attribute, descriptor),
  objectsEqual,
  resolveUnits,
  sentenceCaseToCamelCase: text => text
    .split(' ')
    .map((word, index) => (index === 0 ? word[0].toLowerCase() : word[0].toUpperCase()) + word.slice(1))
    .join(''),
  sortByNumber,
  sortByString,
  stringMatch,
};

/**
 * The assets of the realm that a query is about. Attributes are only read when the query looks at them or asks for
 * them, because the tree needs only the names of the assets.
 */
async function assetsOf(query) {
  const attributes = query.attributes || query.select?.attributes === undefined;
  return AssetService.queryAssets({ select: attributes ? undefined : { attributes: [] } });
}

/** The asset tree that a "read-asset-tree" event asks for, the way the manager's event service answers it. */
async function readAssetTree({ assetQuery }) {
  return { eventType: 'asset-tree', assetTree: runAssetQuery(await assetsOf(assetQuery), assetQuery) };
}

/** The current value of an attribute that a "read-asset-attribute" event asks for, as the manager answers it. */
async function readAssetAttribute({ ref }) {
  const [asset] = await AssetService.queryAssets({ ids: [ref.id], select: { attributes: [ref.name] } });
  const attribute = asset?.attributes?.[ref.name];
  return { eventType: 'attribute', ref, value: attribute?.value, timestamp: attribute?.timestamp };
}

/**
 * What a failed call of the manager looks like to the components: an error of axios, with the status of the answer in
 * response, which is how they tell "too much data" from any other error.
 */
const asAxiosError = error => Object.assign(error, {
  isAxiosError: true,
  response: error.status ? { status: error.status } : undefined,
});

/** The data of the call as the manager's REST API answers it; a call that is aborted is cancelled, as in axios. */
function answered(call, signal) {
  const cancelled = () => Object.assign(new Error('canceled'), { isAxiosError: true, code: 'ERR_CANCELED' });
  if (signal?.aborted) return Promise.reject(cancelled());
  return new Promise((resolve, reject) => {
    const cancel = () => reject(cancelled());
    signal?.addEventListener('abort', cancel, { once: true });
    call.then(data => resolve({ status: 200, data }), error => reject(asAxiosError(error)))
      .finally(() => signal?.removeEventListener('abort', cancel));
  });
}

const AssetDatapointResource = {
  getDatapoints: (assetId, attributeName, query, options) =>
    answered(AssetService.getDatapoints(assetId, attributeName, query), options?.signal),
};

/** The report service has no forecasts of attributes: none of them has predicted data points. */
const AssetPredictedDatapointResource = {
  getPredictedDatapoints: () => Promise.resolve({ status: 200, data: [] }),
};

const AssetResource = {
  get: async id => ({ data: (await AssetService.queryAssets({ ids: [id] }))[0] }),
  queryAssets: async query => ({ data: runAssetQuery(await assetsOf(query), query).assets }),
  queryAssetTree: async query => ({ data: runAssetQuery(await assetsOf(query), query) }),
  queryCount: async query => ({
    data: runAssetQuery(await assetsOf(query), { ...query, offset: undefined, limit: undefined }).assets.length,
  }),
};

const REPLIES = { 'read-asset-tree': readAssetTree, 'read-asset-attribute': readAssetAttribute };

/** The events of the manager. The assets of a report do not change while it is made, so nothing is ever sent. */
const eventProvider = {
  sendEventWithReply: event => {
    const reply = REPLIES[event.eventType];
    if (!reply) throw new Error(`The report page does not answer events of the type ${event.eventType}`);
    return reply(event);
  },
  subscribeAssetEvents: async () => 'asset-events',
  unsubscribe() {},
};

const manager = {
  authenticated: true,
  // the settings that a component keeps in the console of the browser: a component without a panel name asks for them
  // and finds none
  console: { retrieveData: async () => undefined, storeData() {} },
  get displayRealm() {
    return ReportContext.realm;
  },
  events: eventProvider,
  getEventProvider: () => eventProvider,
  getRealm: () => ReportContext.realm,
  hasRole: _role => false,
  isRestrictedUser: () => false,
  rest: { api: { AssetDatapointResource, AssetPredictedDatapointResource, AssetResource } },
};

export default manager;
export { manager };

/** A component that is connected to the events of the manager: it is told when they are, which is at once. */
export const subscribe = events => Base => class extends Base {
  connectedCallback() {
    super.connectedCallback?.();
    this._addEventSubscriptions();
    this.onEventsConnect();
  }

  disconnectedCallback() {
    this.onEventsDisconnect();
    super.disconnectedCallback?.();
  }

  _addEventSubscriptions() {}

  _sendEventWithReply(event) {
    return events.getEventProvider().sendEventWithReply(event);
  }

  onEventsConnect() {}

  onEventsDisconnect() {}
};
