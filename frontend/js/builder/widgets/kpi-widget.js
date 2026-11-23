/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/kpi-widget.ts). The KPI itself is
 * OpenRemote's own <or-attribute-card>, which vendor/or-mwc.js has. Original: Copyright 2026, OpenRemote Inc.,
 * AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Differences: an attribute that the asset no longer has is left out, so that the widget says that no attribute is
 * connected, where the original fails to draw; the card has no period menu, and shows the period before the moment of
 * the report instead of the period before the clock of the browser (see ReportAttributeCard).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import '../../../vendor/or-mwc.js';
import manager from '../../kit/core.js';
import '../../kit/inputs.js';
import { isAxiosError } from '../../kit/rest.js';
import { KpiSettings } from '../settings/kpi-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { configRange } from '../util/widget-time.js';

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

  /**
   * OpenRemote's loadData of or-attribute-card 1.32.2, with one change: the card shows the period before the moment of
   * the report (configRange, as the figures of the generated text have it), where the original takes the period before
   * the clock of the browser. They differ when the report is made for another moment: a saved report opened with
   * ?asOf=, or a page that has been open for a while. The current value is still the attribute's value now.
   */
  async loadData() {
    if (this.data || !this.assetAttributes || !this.assets || this.assets.length === 0
      || this.assetAttributes.length === 0 || !this.period) {
      return;
    }
    // A request that comes in replaces the one that is running
    if (this._dataAbortController) {
      this._dataAbortController.abort('Data request overridden');
      delete this._dataAbortController;
    }
    this._loading = true;
    [this._startOfPeriod, this._endOfPeriod] = configRange('kpi', { period: this.period });
    const assetId = this.assets[0].id;
    const attributeName = this.assetAttributes[0][1].name;
    this._dataAbortController = new AbortController();
    try {
      const response = await manager.rest.api.AssetDatapointResource.getDatapoints(assetId, attributeName, {
        type: 'lttb', fromTimestamp: this._startOfPeriod, toTimestamp: this._endOfPeriod, amountOfPoints: 20,
      }, { signal: this._dataAbortController.signal });
      this._loading = false;
      if (response.status === 200) {
        this.data = response.data;
        this.delta = this.getFormattedDelta(this.getFirstKnownMeasurement(this.data),
          this.getLastKnownMeasurement(this.data));
        this.deltaPlus = this.delta && this.delta.val > 0 ? '+' : '';
        this._error = undefined;
      }
    } catch (error) {
      console.error(error);
      if (error?.message === 'canceled') return; // replaced by another request, which is loading now
      this._loading = false;
      if (isAxiosError(error)) {
        if (error.message.includes('timeout')) {
          this._error = 'noAttributeDataTimeout';
          return;
        }
        if (error.response?.status === 413) {
          this._error = 'datapointRequestTooLarge';
          return;
        }
      }
      this._error = 'couldNotRetrieveAttribute';
    } finally {
      // Then the current value, as OpenRemote reads it
      this.mainValue = undefined;
      this.formattedMainValue = undefined;
      const current = await manager.events.sendEventWithReply({
        eventType: 'read-asset-attribute',
        ref: { id: assetId, name: attributeName },
      });
      this.mainValue = current.value;
      this.formattedMainValue = this.getFormattedValue(this.mainValue);
    }
  }
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
