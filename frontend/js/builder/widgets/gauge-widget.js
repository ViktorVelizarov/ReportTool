/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/gauge-widget.ts). The gauge itself is
 * OpenRemote's own <or-gauge>, which vendor/or-mwc.js has. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * Differences: an attribute that the asset no longer has is left out, so that the widget says that no attribute is
 * connected, where the original fails to draw.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import '../../kit/inputs.js';
import { GaugeSettings } from '../settings/gauge-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';

export class GaugeWidget extends OrAssetWidget {
  static properties = { _loading: { state: true } };

  static styles = css`
    #error-txt {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.gauge,
    getContentHtml: config => new GaugeWidget(config),
    getSettingsHtml: config => new GaugeSettings(config),
  };

  constructor(config) {
    super(config);
    this._loading = false;
  }

  refreshContent() {
    this.loadAssets(this.widgetConfig.attributeRefs);
  }

  // WebComponent lifecycle method, that occurs DURING every state update
  willUpdate(changedProps) {
    // If widgetConfig, and the attributeRefs of them have changed...
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      const { attributeRefs } = this.widgetConfig;

      // Check if list of attributes has changed, based on the cached assets
      const loadedRefs = attributeRefs?.filter(attrRef => this.isAttributeRefLoaded(attrRef));
      if (loadedRefs?.length !== (attributeRefs ? attributeRefs.length : 0)) {
        // Fetch the new list of assets
        this.loadAssets(attributeRefs);
      }
    }
    return super.willUpdate(changedProps);
  }

  loadAssets(attributeRefs) {
    if (attributeRefs.length === 0) {
      this._error = 'noAttributesConnected';
      return;
    }
    this._loading = true;
    this._error = undefined;
    this.fetchAssets(attributeRefs)
      .then(assets => {
        this.loadedAssets = assets;
        this.assetAttributes = attributeRefs
          ?.map(attrRef => {
            const assetIndex = assets.findIndex(asset => asset.id === attrRef.id);
            const attribute = assetIndex >= 0 ? assets[assetIndex].attributes?.[attrRef.name] : undefined;
            return attribute ? [assetIndex, attribute] : undefined;
          })
          .filter(indexAndAttr => !!indexAndAttr);
      })
      .catch(error => {
        this._error = error.message;
      })
      .finally(() => {
        this._loading = false;
      });
  }

  render() {
    return html`
      ${when(
        this._loading || this._error,
        () => {
          if (this._loading) {
            return html`<or-loading-indicator></or-loading-indicator>`;
          }
          return html`<or-translate id="error-txt" .value=${this._error}></or-translate>`;
        },
        () => when(
          this.loadedAssets && this.assetAttributes && this.loadedAssets.length > 0 && this.assetAttributes.length > 0,
          () => html`
            <or-gauge
              .asset=${this.loadedAssets[0]}
              .assetAttribute=${this.assetAttributes[0]}
              .thresholds=${this.widgetConfig.thresholds}
              .decimals=${this.widgetConfig.decimals}
              .min=${this.widgetConfig.min}
              .max=${this.widgetConfig.max}
              style="height: 100%; overflow: hidden;"
            >
            </or-gauge>
          `,
          () => html`
            <div style="height: 100%; display: flex; justify-content: center; align-items: center; text-align: center;">
              <span><or-translate value="noAttributeConnected"></or-translate></span>
            </div>
          `,
        ),
      )}
    `;
  }
}

customElements.define('gauge-widget', GaugeWidget);
