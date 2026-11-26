/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/util/or-asset-widget.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AssetService } from '../../data/asset-service.js';
import { showSnackbar } from '../../kit/snackbar.js';
import { OrWidget } from './or-widget.js';
import { WidgetSettings } from './widget-settings.js';

/*
 * The config of a widget that shows attributes of assets has attributeRefs: [{ id: assetId, name: attributeName }],
 * and is often extended with other fields such as the number of decimals.
 */

/** Fetches the assets of the attribute references, with just those attributes. */
async function fetchAssetsByAttributeRef(attributeRefs = []) {
  return fetchAssets({
    ids: attributeRefs.map(ref => ref.id),
    select: { attributes: attributeRefs.map(ref => ref.name) },
  });
}

/** Fetches the assets of a query. A failure is reported to the user and gives no assets. */
async function fetchAssets(assetQuery) {
  try {
    return await AssetService.queryAssets(assetQuery);
  } catch (error) {
    console.error(error);
    showSnackbar(undefined, 'errorOccurred');
    return [];
  }
}

const isAssetIdLoaded = (loadedAssets, assetId) => loadedAssets?.find(asset => asset.id === assetId) !== undefined;

/**
 * The widget class for widgets that show assets: it keeps the assets and attributes it fetched, and has the methods to
 * fetch them. Used by the chart, gauge and KPI widgets, among others.
 */
export class OrAssetWidget extends OrWidget {
  static properties = {
    loadedAssets: { state: true }, // the assets that were fetched
    assetAttributes: { state: true }, // [index in loadedAssets, attribute] for every attribute of the widget
    _error: { state: true },
  };

  constructor(config) {
    super(config);
    this.loadedAssets = [];
    this.assetAttributes = [];
    this._error = undefined;
  }

  fetchAssets(attributeRefs = []) {
    return fetchAssetsByAttributeRef(attributeRefs);
  }

  queryAssets(assetQuery) {
    return fetchAssets(assetQuery);
  }

  isAssetLoaded(assetId) {
    return isAssetIdLoaded(this.loadedAssets, assetId);
  }

  isAttributeRefLoaded(attributeRef) {
    return isAssetIdLoaded(this.loadedAssets, attributeRef.id);
  }
}

/** The settings class for widgets that show assets, with the same methods to fetch them. */
export class AssetWidgetSettings extends WidgetSettings {
  static properties = { loadedAssets: { state: true } };

  constructor(config) {
    super(config);
    this.loadedAssets = [];
  }

  fetchAssets(attributeRefs = []) {
    return fetchAssetsByAttributeRef(attributeRefs);
  }

  queryAssets(assetQuery) {
    return fetchAssets(assetQuery);
  }

  isAssetLoaded(assetId) {
    return isAssetIdLoaded(this.loadedAssets, assetId);
  }

  isAttributeRefLoaded(attributeRef) {
    return isAssetIdLoaded(this.loadedAssets, attributeRef.id);
  }
}
