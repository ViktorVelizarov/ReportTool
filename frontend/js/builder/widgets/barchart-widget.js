/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/barchart-widget.ts), together with
 * what its or-attribute-barchart shows: a bar per interval for every attribute, with the method per attribute (average,
 * minimum, maximum, ...), drawn with ECharts. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * Differences: the time window can follow the time frame of the report (followReportPeriod), the methods are worked out
 * from the data points here instead of by the manager, and there are no time controls.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, nothing } from 'lit';
import { AssetService } from '../../data/asset-service.js';
import { getAttributeLabel, resolveUnits } from '../../data/util.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { BarChartSettings } from '../settings/barchart-settings.js';
import { BAR_METHODS, bucketLabel, bucketStart, nextBucket } from '../util/bar-chart-data.js';
import { attributeColor, chooseInterval, hasRef } from '../util/chart-helpers.js';
import { EChart } from '../util/echart.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { configRange } from '../util/widget-time.js';

export class BarChartWidget extends OrAssetWidget {
  static properties = {
    _loading: { state: true },
    _series: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
      height: 100%;
    }

    #chart {
      position: absolute;
      inset: 0;
    }

    .overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.92);
      text-align: center;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.barchart,
    getContentHtml: config => new BarChartWidget(config),
    getSettingsHtml: config => new BarChartSettings(config),
  };

  constructor(config) {
    super(config);
    this._loading = false;
    this._series = undefined;
    this._token = 0;
    this._chart = undefined;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.dispose();
    this._chart = undefined;
  }

  refreshContent() {
    this.loadData();
  }

  willUpdate(changedProps) {
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this.loadData();
    }
    return super.willUpdate(changedProps);
  }

  async loadData() {
    const token = ++this._token;
    const refs = this.widgetConfig.attributeRefs;
    if (refs.length === 0) {
      this._series = undefined;
      this._error = 'noAttributesConnected';
      return;
    }
    this._loading = true;
    this._error = undefined;
    try {
      const assets = await this.fetchAssets(refs);
      const [from, to] = configRange('barchart', this.widgetConfig);
      const items = await Promise.all(refs.map(async ref => {
        const asset = assets.find(item => item.id === ref.id);
        const attribute = asset?.attributes?.[ref.name];
        const points = attribute
          ? await AssetService.getDatapoints(ref.id, ref.name, { fromTimestamp: from, toTimestamp: to })
          : [];
        return { ref, asset, attribute, points };
      }));
      if (token !== this._token) return; // a newer request has taken over
      this.loadedAssets = assets;
      this._series = { items, from, to, interval: chooseInterval(from, to, this.widgetConfig.defaultInterval) };
    } catch (error) {
      if (token === this._token) this._error = error.message;
    } finally {
      if (token === this._token) this._loading = false;
    }
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('_series') || changedProps.has('widgetConfig')) {
      this.drawChart();
    }
  }

  /** The methods of an attribute; the average when none is set. */
  methodsOf(ref) {
    const methods = Object.keys(BAR_METHODS).filter(key => hasRef(this.widgetConfig.attributeSettings?.[key], ref));
    return methods.length ? methods : ['methodAvgAttributes'];
  }

  /** The ECharts option for the bars. */
  buildOption() {
    const config = this.widgetConfig;
    const settings = config.attributeSettings ?? {};
    const scales = config.chartOptions?.options?.scales ?? {};
    const { items, from, to, interval } = this._series;
    const decimals = config.decimals ?? 2;

    // one bar position per interval of the period, whether or not there are data points in it
    const starts = [];
    for (let start = bucketStart(from, interval); start <= to; start = nextBucket(start, interval)) starts.push(start);
    const series = [];
    const leftUnits = new Set();
    let hasRightAxis = false;

    items.forEach(({ ref, asset, attribute, points }) => {
      if (!attribute) return;
      const color = attributeColor(config.attributeColors, config.attributeRefs, ref);
      const faint = hasRef(settings.faintAttributes, ref);
      const right = hasRef(settings.rightAxisAttributes, ref);
      const units = resolveUnits(attribute.meta?.units);
      const label = `${asset.name} | ${getAttributeLabel(attribute, undefined, false)}`;
      hasRightAxis ||= right;
      if (!right && units) leftUnits.add(units);

      const buckets = new Map();
      points.forEach(point => {
        const start = bucketStart(point.x, interval);
        (buckets.get(start) ?? buckets.set(start, []).get(start)).push(point.y);
      });
      const methods = this.methodsOf(ref);
      methods.forEach(method => {
        series.push({
          name: methods.length > 1 ? `${label} (${i18next.t(method)})` : label,
          type: 'bar',
          data: starts.map(start =>
            (buckets.has(start) ? Number(BAR_METHODS[method](buckets.get(start)).toFixed(decimals)) : null)),
          itemStyle: { color, opacity: faint ? 0.31 : 1 },
          stack: config.stacked ? 'total' : undefined,
          yAxisIndex: right ? 1 : 0,
          barMaxWidth: 48,
          tooltip: { valueFormatter: value => (value == null ? '-' : `${value}${units ? ` ${units}` : ''}`) },
        });
      });
    });

    return {
      animation: false,
      grid: { left: 8, right: 8, top: 28, bottom: config.showLegend ? 36 : 8, containLabel: true },
      legend: { show: config.showLegend, type: 'scroll', bottom: 0, data: series.map(item => item.name) },
      tooltip: { trigger: 'axis', confine: true, axisPointer: { type: 'shadow' } },
      xAxis: {
        type: 'category',
        data: starts.map(start => bucketLabel(start, interval, to - from)),
        axisTick: { alignWithLabel: true },
      },
      yAxis: [
        { type: 'value', position: 'left', min: scales.y?.min, max: scales.y?.max,
          name: leftUnits.size === 1 ? [...leftUnits][0] : undefined, nameTextStyle: { align: 'left' } },
        ...(hasRightAxis ? [{ type: 'value', position: 'right', min: scales.y1?.min, max: scales.y1?.max,
          splitLine: { show: false } }] : []),
      ],
      series,
    };
  }

  drawChart() {
    const container = this.renderRoot.querySelector('#chart');
    if (!container) return;
    if (!this._series) {
      this._chart?.chart.clear();
      return;
    }
    this._chart ??= new EChart(container);
    this._chart.setOption(this.buildOption());
  }

  render() {
    return html`
      <div id="chart"></div>
      ${this._loading ? html`<div class="overlay"><or-loading-indicator></or-loading-indicator></div>` : nothing}
      ${!this._loading && this._error ? html`
        <div class="overlay"><span><or-translate .value=${this._error}></or-translate></span></div>` : nothing}
      ${!this._loading && !this._error && this._series?.items.every(item => item.points.length === 0) ? html`
        <div class="overlay"><span><or-translate value="report.noDataPoints"></or-translate></span></div>` : nothing}
    `;
  }
}

customElements.define('barchart-widget', BarChartWidget);
