/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/barchart-widget.ts). The bar chart
 * itself is OpenRemote's own <or-attribute-barchart>, which vendor/or-mwc.js has. Original: Copyright 2026, OpenRemote
 * Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Differences: the chart shows the time frame of the report as a custom time span (followReportPeriod, which is on
 * unless the widget switches it off), it has no time controls and its legend is a compact one under the chart (see
 * util/report-chart.js).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { html, when } from 'lit';
import { OrAttributeBarChart } from '../../../vendor/or-mwc.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { BarChartSettings } from '../settings/barchart-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { hasRef } from '../util/chart-helpers.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { reportChart } from '../util/report-chart.js';
import { followedTimeframe } from '../util/widget-time.js';

const sameTimeframe = (a, b) =>
  a === b || (a && b && a[0].getTime() === b[0].getTime() && a[1].getTime() === b[1].getTime());

/** The short names of the methods of the bars of an attribute ("AVG", "MAX", ...), in the order of the chart. */
const methodsOf = (ref, attributeConfig) => Object.keys(attributeConfig)
  .filter(key => key.startsWith('method') && hasRef(attributeConfig[key], ref))
  .sort((a, b) => a.localeCompare(b))
  .map(key => i18next.t(`${key}-short`));

customElements.define('report-barchart', reportChart(OrAttributeBarChart, { mark: 'bar', notesOf: methodsOf }));

export class BarChartWidget extends OrAssetWidget {
  static properties = {
    datapointQuery: { state: true },
    _loading: { state: true },
  };

  static manifest = {
    ...WIDGET_SPECS.barchart,
    getContentHtml: config => new BarChartWidget(config),
    getSettingsHtml: config => new BarChartSettings(config),
  };

  constructor(config) {
    super(config);
    this.datapointQuery = undefined;
    this._loading = false;
    this._timeframe = undefined;
  }

  // Method called on every refresh/reload of the widget
  // We either refresh the datapointQuery or the full widgetConfig depending on the force parameter.
  refreshContent(force) {
    if (!force) {
      const datapointQuery = structuredClone(this.widgetConfig.datapointQuery);
      datapointQuery.fromTimestamp = undefined;
      datapointQuery.toTimestamp = undefined;
      this.datapointQuery = datapointQuery;
    } else {
      this.widgetConfig = structuredClone(this.widgetConfig);
    }
  }

  // WebComponent lifecycle method, that occurs DURING every state update
  willUpdate(changedProps) {
    // Add datapointQuery if not set yet (due to migration)
    if (!this.widgetConfig.datapointQuery) {
      this.widgetConfig.datapointQuery = this.getDefaultQuery();
      if (!changedProps.has('widgetConfig')) {
        changedProps.set('widgetConfig', this.widgetConfig);
      }
    }

    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this.datapointQuery = this.widgetConfig.datapointQuery;

      const { attributeRefs } = this.widgetConfig;
      if (attributeRefs.length === 0) {
        this._error = 'noAttributesConnected';
      } else {
        const missingAssets = attributeRefs?.filter(attrRef => !this.isAttributeRefLoaded(attrRef));
        if (missingAssets.length > 0) {
          this.loadAssets(attributeRefs);
        }
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
        this.assetAttributes = attributeRefs?.map(attrRef => {
          const assetIndex = assets.findIndex(asset => asset.id === attrRef.id);
          const foundAsset = assetIndex >= 0 ? assets[assetIndex] : undefined;
          const attribute = foundAsset?.attributes?.[attrRef.name];
          return attribute ? [assetIndex, attribute] : [-1, { name: attrRef.name }];
        });
      })
      .catch(error => {
        this._error = error.message;
      })
      .finally(() => {
        this._loading = false;
      });
  }

  /** The time frame of the report, the same array for as long as it is the same frame: a new one loads the data. */
  timeframe() {
    const timeframe = followedTimeframe(this.widgetConfig);
    if (!sameTimeframe(timeframe, this._timeframe)) this._timeframe = timeframe;
    return this._timeframe;
  }

  render() {
    return html`
      ${when(
        this._loading,
        () => html`<or-loading-indicator></or-loading-indicator>`,
        () => when(
          this._error,
          () => html`
            <div style="height: 100%; display: flex; justify-content: center; align-items: center; text-align: center;">
              <span><or-translate .value=${this._error}></or-translate></span>
            </div>
          `,
          () => html`
            <report-barchart
              .assets=${this.loadedAssets}
              .assetAttributes=${this.assetAttributes}
              .attributeColors=${this.widgetConfig?.attributeColors}
              .attributeConfig=${this.widgetConfig?.attributeSettings}
              .showReportLegend=${!!this.widgetConfig?.showLegend}
              ?stacked=${this.widgetConfig?.stacked}
              .interval=${this.widgetConfig?.defaultInterval}
              .timePrefixKey=${this.widgetConfig?.defaultTimePrefixKey}
              .timeWindowKey=${this.widgetConfig?.defaultTimeWindowKey}
              .timeframe=${this.timeframe()}
              .datapointQuery=${this.datapointQuery}
              .chartOptions=${this.widgetConfig?.chartOptions}
              .decimals=${this.widgetConfig?.decimals}
              style="height: 100%"
            ></report-barchart>
          `,
        ),
      )}
    `;
  }

  getDefaultQuery() {
    const now = new Date();
    const monthAgo = new Date(now);
    monthAgo.setDate(monthAgo.getDate() - 30);
    return { type: 'interval', fromTimestamp: monthAgo.getTime(), toTimestamp: now.getTime() };
  }
}

customElements.define('barchart-widget', BarChartWidget);
