/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/kpi-widget.ts). The KPI itself is
 * OpenRemote's own <or-attribute-card>, which vendor/or-mwc.js has. Original: Copyright 2026, OpenRemote Inc.,
 * AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Differences: an attribute that the asset no longer has is left out, so that the widget says that no attribute is
 * connected, where the original fails to draw; the card has no period menu (see ReportAttributeCard).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import '../../../vendor/or-mwc.js';
import '../../kit/inputs.js';
import { KpiSettings } from '../settings/kpi-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';

// vendor/or-mwc.js registers <or-attribute-card> but does not export its class
const OrAttributeCard = customElements.get('or-attribute-card');

/**
 * OpenRemote's KPI card without its period menu (the "Day" button): in a report the period is a setting of the widget.
 * The card draws the menu always, greyed when its controls are off.
 */
class ReportAttributeCard extends OrAttributeCard {
  static styles = [...OrAttributeCard.styles, css`
    .period-selector-wrapper {
      display: none;
    }
  `];
}

customElements.define('report-attribute-card', ReportAttributeCard);

export class KpiWidget extends OrAssetWidget {
  static properties = { _loading: { state: true } };

  static manifest = {
    ...WIDGET_SPECS.kpi,
    getContentHtml: config => new KpiWidget(config),
    getSettingsHtml: config => new KpiSettings(config),
  };

  constructor(config) {
    super(config);
    this._loading = false;
  }

  refreshContent() {
    this.loadAssets(this.widgetConfig.attributeRefs);
  }

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
      <div style="position: relative; height: 100%; overflow: hidden;">
        ${when(this._loading || this._error, () => {
          // Have to use `position: absolute` with white background due to rendering inconsistencies in the card
          return html`
            <div
              style="position: absolute; top: -5%; width: 100%; height: 105%; background: white; z-index: 1;
                display: flex; justify-content: center; align-items: center; text-align: center;"
            >
              ${when(
                this._loading,
                () => html`<or-loading-indicator></or-loading-indicator>`,
                () => html`<or-translate .value=${this._error}></or-translate>`,
              )}
            </div>
          `;
        })}
        <report-attribute-card
          .assets=${this.loadedAssets}
          .assetAttributes=${this.assetAttributes}
          .period=${this.widgetConfig.period}
          .deltaFormat=${this.widgetConfig.deltaFormat}
          .mainValueDecimals=${this.widgetConfig.decimals}
          showTitle="${false}"
          hideAttributePicker="${true}"
          style="height: 100%;"
        >
        </report-attribute-card>
      </div>
    `;
  }
}

customElements.define('kpi-widget', KpiWidget);
