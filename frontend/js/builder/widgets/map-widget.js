/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/map-widget.ts): the assets of a type
 * as markers on a map, coloured by the value of one of their attributes. Original: Copyright 2026, OpenRemote Inc.,
 * AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Differences: the map is a drawing of the Netherlands instead of a MapLibre map, so it needs no map tiles and works
 * offline; "show GeoJSON overlay" shows the outline of the country.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, nothing, svg } from 'lit';
import MDI from '../../kit/mdi-icons.js';
import { AssetModelUtil } from '../../data/asset-model.js';
import { getAttributeValueAsString, resolveUnits } from '../../data/util.js';
import '../../kit/inputs.js';
import { MapSettings } from '../settings/map-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { mapViewBox, markerColor, outlinePoints, project } from '../util/nl-map.js';

export class MapWidget extends OrAssetWidget {
  static properties = { _loading: { state: true } };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .message {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      background: #f4f7fa;
      border-radius: 4px;
    }

    .land {
      fill: #e6efdf;
      stroke: #bcd3ad;
      stroke-width: 1.5;
      stroke-linejoin: round;
    }

    .label {
      font-size: 7px;
      font-weight: 700;
      fill: #1d2733;
      paint-order: stroke;
      stroke: #fff;
      stroke-width: 2.5px;
      stroke-linejoin: round;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.map,
    getContentHtml: config => new MapWidget(config),
    getSettingsHtml: config => new MapSettings(config),
  };

  constructor(config) {
    super(config);
    this._loading = false;
    this._token = 0;
  }

  refreshContent() {
    this.loadAssets();
  }

  willUpdate(changedProps) {
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this.loadAssets();
    }
    return super.willUpdate(changedProps);
  }

  async loadAssets() {
    const { assetType, attributeName, allOfType, assetIds } = this.widgetConfig;
    const token = ++this._token;
    if (!assetType || !attributeName) {
      this.loadedAssets = [];
      return;
    }
    this._loading = true;
    try {
      const assets = await this.queryAssets({
        types: [assetType],
        ids: !allOfType && assetIds?.length ? assetIds : undefined,
        select: { attributes: [attributeName, 'location'] },
      });
      if (token === this._token) this.loadedAssets = assets;
    } finally {
      if (token === this._token) this._loading = false;
    }
  }

  /** The assets that can be marked on the map, with the marker's colour and label. */
  markers() {
    const config = this.widgetConfig;
    return this.loadedAssets
      .filter(asset => asset.attributes?.location?.value?.coordinates)
      .map(asset => {
        const [lng, lat] = asset.attributes.location.value.coordinates;
        const attribute = asset.attributes[config.attributeName];
        const [x, y] = project({ lng, lat });
        const value = attribute?.value;
        return {
          asset, x, y,
          colour: markerColor({ valueType: config.valueType, value, thresholds: config.thresholds,
            boolColors: config.boolColors, textColors: config.textColors }),
          text: getAttributeValueAsString(attribute, undefined, config.showUnits, '-'),
          title: `${asset.name}: ${getAttributeValueAsString(attribute, undefined, true, '-')}`,
        };
      });
  }

  render() {
    const config = this.widgetConfig;
    if (!config.assetType || !config.attributeName) {
      return html`<div class="message"><or-translate value="noAttributesConnected"></or-translate></div>`;
    }
    const box = mapViewBox({ zoom: config.zoom, center: config.center });
    const unit = resolveUnits(this.loadedAssets[0]?.attributes?.[config.attributeName]?.meta?.units);
    return html`
      <svg viewBox="${box.x} ${box.y} ${box.width} ${box.height}" role="img"
        aria-label=${`Map of the Netherlands with ${this.loadedAssets.length} assets${unit ? ` (${unit})` : ''}`}>
        ${config.showGeoJson ? svg`<polygon class="land" points=${outlinePoints()}></polygon>` : nothing}
        ${this.markers().map(marker => svg`
          <g transform="translate(${marker.x} ${marker.y})">
            <title>${marker.title}</title>
            <circle r="9" fill=${marker.colour} stroke="#fff" stroke-width="2"></circle>
            <path d=${MDI[AssetModelUtil.getAssetDescriptor(marker.asset.type)?.icon] ?? ''} fill="#fff"
              transform="translate(-5.5 -5.5) scale(0.46)"></path>
            ${config.showLabels ? svg`<text class="label" x="13" y="3">${marker.text}</text>` : nothing}
          </g>`)}
      </svg>
    `;
  }
}

customElements.define('map-widget', MapWidget);
