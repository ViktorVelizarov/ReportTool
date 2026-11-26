/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/chart-widget.ts), together with what
 * its or-chart shows: a line per attribute over a time window, drawn with ECharts, with the options of Insights per
 * line (smooth, stepped, filled, faint, extended and on the right axis). Original: Copyright 2026, OpenRemote Inc.,
 * AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Differences: the time window can follow the time frame of the report (followReportPeriod), and the chart has no
 * zoom bar or time controls, which are for looking around in a dashboard, not for a report.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, nothing } from 'lit';
import { AssetService } from '../../data/asset-service.js';
import { getAttributeLabel, resolveUnits } from '../../data/util.js';
import '../../kit/inputs.js';
import { ChartSettings } from '../settings/chart-settings.js';
import { attributeColor, hasRef } from '../util/chart-helpers.js';
import { EChart } from '../util/echart.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { configRange } from '../util/widget-time.js';

const POINTS_PER_PIXEL = 1 / 5;
const MIN_POINTS = 40;
const MAX_POINTS = 500;

const rgba = (hex, alpha) => {
  const [red, green, blue] = [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16));
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export class ChartWidget extends OrAssetWidget {
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
      background: rgba(255, 255, 255, 0.85);
      text-align: center;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.linechart,
    getContentHtml: config => new ChartWidget(config),
    getSettingsHtml: config => new ChartSettings(config),
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

  // Method called on every refresh/reload of the widget
  refreshContent() {
    this.loadData();
  }

  // WebComponent lifecycle method, that occurs DURING every state update
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
      const [from, to] = configRange('linechart', this.widgetConfig);
      const amountOfPoints = Math.min(MAX_POINTS, Math.max(MIN_POINTS,
        Math.round((this.clientWidth || 600) * POINTS_PER_PIXEL)));
      const query = { type: this.widgetConfig.datapointQuery?.type ?? 'lttb', fromTimestamp: from, toTimestamp: to,
        amountOfPoints };
      const series = await Promise.all(refs.map(async ref => {
        const asset = assets.find(item => item.id === ref.id);
        const attribute = asset?.attributes?.[ref.name];
        const points = attribute ? await AssetService.getDatapoints(ref.id, ref.name, query) : [];
        return { ref, asset, attribute, points };
      }));
      if (token !== this._token) return; // a newer request has taken over
      this.loadedAssets = assets;
      this._series = { items: series, from, to };
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

  /** The ECharts option for the lines. */
  buildOption() {
    const config = this.widgetConfig;
    const attributeConfig = config.attributeConfig ?? {};
    const scales = config.chartOptions?.options?.scales ?? {};
    const { items, from, to } = this._series;
    const series = [];
    const leftUnits = new Set();
    let hasRightAxis = false;

    items.forEach(({ ref, asset, attribute, points }) => {
      if (!attribute) return;
      const color = attributeColor(config.attributeColors, config.attributeRefs, ref);
      const faint = hasRef(attributeConfig.faintAttributes, ref);
      const area = hasRef(attributeConfig.areaAttributes, ref);
      const right = hasRef(attributeConfig.rightAxisAttributes, ref);
      const units = resolveUnits(attribute.meta?.units);
      const name = `${asset.name} | ${getAttributeLabel(attribute, undefined, false)}`;
      hasRightAxis ||= right;
      if (!right && units) leftUnits.add(units);
      series.push({
        name,
        type: 'line',
        data: points.map(point => [point.x, point.y]),
        lineStyle: { color, opacity: faint ? 0.31 : 1 },
        symbol: 'circle',
        showSymbol: !faint && points.length <= 60,
        itemStyle: { color },
        stack: config.stacked ? 'total' : undefined,
        smooth: hasRef(attributeConfig.smoothAttributes, ref),
        step: hasRef(attributeConfig.steppedAttributes, ref) ? 'end' : undefined,
        yAxisIndex: right ? 1 : 0,
        areaStyle: area ? {
          color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: rgba(color, faint ? 0.1 : 0.5) },
            { offset: 1, color: rgba(color, 0) },
          ]),
        } : undefined,
        tooltip: { valueFormatter: value => `${value}${units ? ` ${units}` : ''}` },
      });
      // the latest data point carried on to the end of the window, as a dashed line
      if (hasRef(attributeConfig.extendedAttributes, ref) && points.length) {
        const last = points.at(-1);
        series.push({
          name: `${name} lastKnown`,
          type: 'line',
          data: [[last.x, last.y], [to, last.y]],
          lineStyle: { color, type: [10, 2], opacity: faint ? 0.31 : 1 },
          showSymbol: false,
          itemStyle: { color },
          yAxisIndex: right ? 1 : 0,
          tooltip: { valueFormatter: value => `${value}${units ? ` ${units}` : ''}` },
        });
      }
    });

    return {
      animation: false,
      grid: { left: 8, right: 8, top: 28, bottom: config.showLegend ? 36 : 8, containLabel: true },
      legend: { show: config.showLegend, type: 'scroll', bottom: 0, data: series.map(item => item.name) },
      tooltip: { trigger: 'axis', confine: true },
      xAxis: { type: 'time', min: from, max: to },
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
    if (!container || !this._series) return;
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

customElements.define('chart-widget', ChartWidget);
