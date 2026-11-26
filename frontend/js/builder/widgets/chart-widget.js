/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/chart-widget.ts). The chart itself is
 * OpenRemote's own <or-chart>, which vendor/or-mwc.js has. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * Differences: the chart shows the time frame of the report as a custom time span (followReportPeriod, which is on
 * unless the widget switches it off); it has no time controls and its legend is a compact one under the chart (see
 * util/report-chart.js); it has no predicted data points, which the report service does not have.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { html, when } from 'lit';
import '../../../vendor/or-mwc.js';
import { getDefaultTimePrefixOptions, getDefaultTimeWindowOptions } from '../../data/time-window.js';
import '../../kit/inputs.js';
import { ChartSettings } from '../settings/chart-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { reportChart } from '../util/report-chart.js';
import { followedTimeframe, splitPresetKey } from '../util/widget-time.js';

const sameTimeframe = (a, b) =>
  a === b || (a && b && a[0].getTime() === b[0].getTime() && a[1].getTime() === b[1].getTime());

// vendor/or-mwc.js registers <or-chart> but does not export its class
customElements.define('report-chart', reportChart(customElements.get('or-chart'), { mark: 'line', sorted: true }));

export class ChartWidget extends OrAssetWidget {
  static properties = {
    datapointQuery: { state: true },
    _loading: { state: true },
  };

  static manifest = {
    ...WIDGET_SPECS.linechart,
    getContentHtml: config => new ChartWidget(config),
    getSettingsHtml: config => new ChartSettings(config),
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
      const datapointQuery = JSON.parse(JSON.stringify(this.widgetConfig.datapointQuery));
      datapointQuery.fromTimestamp = undefined;
      datapointQuery.toTimestamp = undefined;
      this.datapointQuery = datapointQuery;
    } else {
      this.widgetConfig = JSON.parse(JSON.stringify(this.widgetConfig));
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
          () => {
            const timePrefixList = getDefaultTimePrefixOptions();
            const timeWindowList = getDefaultTimeWindowOptions();
            const { prefix: timePrefix, windowKey: timeWindow } =
              splitPresetKey(this.widgetConfig?.defaultTimePresetKey, timePrefixList, timeWindowList);
            return html`
              <report-chart
                .assets=${this.loadedAssets}
                .assetAttributes=${this.assetAttributes}
                .attributeColors=${this.widgetConfig?.attributeColors}
                ?stacked=${this.widgetConfig?.stacked}
                .attributeConfig=${this.widgetConfig?.attributeConfig != null ? this.widgetConfig.attributeConfig : {}}
                .showReportLegend=${this.widgetConfig?.showLegend != null ? this.widgetConfig?.showLegend : true}
                .showZoomBar=${this.widgetConfig?.showZoomBar != null ? this.widgetConfig?.showZoomBar : true}
                .attributeControls=${false}
                .timePrefixOptions=${timePrefixList}
                .timeWindowOptions=${timeWindowList}
                .timePrefixKey=${timePrefix}
                .timeWindowKey=${timeWindow}
                .timeframe=${this.timeframe()}
                .datapointQuery=${this.datapointQuery}
                .chartOptions=${this.widgetConfig?.chartOptions}
                style="height: 100%"
              ></report-chart>
            `;
          },
        ),
      )}
    `;
  }

  getDefaultQuery() {
    const minutes = shift => {
      const date = new Date();
      date.setMinutes(shift);
      return date.getTime();
    };
    return { type: 'lttb', fromTimestamp: minutes(-60), toTimestamp: minutes(60) };
  }
}

customElements.define('chart-widget', ChartWidget);
