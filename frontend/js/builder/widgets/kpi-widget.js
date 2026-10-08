/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/kpi-widget.ts), together with what its
 * or-attribute-card shows: the current value of an attribute, a small graph and the change over the period.
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Differences: the period can follow the time frame of the report (followReportPeriod), and the graph is an ECharts
 * line instead of a Chart.js one.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, nothing, when } from 'lit';
import { AssetModelUtil } from '../../data/asset-model.js';
import { AssetService } from '../../data/asset-service.js';
import { ReportContext } from '../../data/report-context.js';
import { resolveUnits } from '../../data/util.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { getAssetDescriptorIconTemplate } from '../../kit/or-icon.js';
import { KpiSettings } from '../settings/kpi-settings.js';
import { EChart } from '../util/echart.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';
import { configRange } from '../util/widget-time.js';

const GRAPH_POINTS = 20;

export class KpiWidget extends OrAssetWidget {
  static properties = {
    _loading: { state: true },
    _data: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
      container-type: size;
    }

    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .message {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .mainvalue-wrapper {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 0;
    }

    .main-number-icon {
      display: flex;
      --or-icon-width: clamp(18px, 8cqmin, 28px);
      --or-icon-height: clamp(18px, 8cqmin, 28px);
    }

    .main-number {
      font-size: clamp(22px, 22cqmin, 54px);
      line-height: 1.1;
    }

    .main-number-unit {
      font-size: clamp(16px, 14cqmin, 34px);
      font-weight: 200;
    }

    .graph-wrapper {
      display: flex;
      flex: 1;
      align-items: stretch;
      min-height: 0;
      gap: 8px;
    }

    .chart-wrapper {
      position: relative;
      flex: 1 1 auto;
      width: 65%;
      min-height: 30px;
    }

    #chart {
      position: absolute;
      inset: 0;
    }

    .controls-wrapper {
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      padding: 4px 0;
      text-align: right;
    }

    .delta {
      font-weight: bold;
      color: var(--or-app-color3, #4c4c4c);
    }

    .period {
      color: #6b7280;
      font-size: 13px;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.kpi,
    getContentHtml: config => new KpiWidget(config),
    getSettingsHtml: config => new KpiSettings(config),
  };

  constructor(config) {
    super(config);
    this._loading = false;
    this._data = undefined;
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
    const [ref] = this.widgetConfig.attributeRefs;
    const token = ++this._token;
    if (!ref) {
      this._data = undefined;
      this._error = 'noAttributesConnected';
      return;
    }
    this._loading = true;
    this._error = undefined;
    try {
      const [asset] = await this.fetchAssets([ref]);
      const attribute = asset?.attributes?.[ref.name];
      const [from, to] = configRange('kpi', this.widgetConfig);
      const points = attribute
        ? await AssetService.getDatapoints(ref.id, ref.name,
          { type: 'lttb', fromTimestamp: from, toTimestamp: to, amountOfPoints: GRAPH_POINTS })
        : [];
      if (token !== this._token) return; // a newer request has taken over
      this.loadedAssets = asset ? [asset] : [];
      this._data = attribute ? { asset, attribute, points, from, to } : undefined;
      this._error = attribute ? undefined : 'couldNotRetrieveAttribute';
    } catch (error) {
      if (token === this._token) this._error = error.message;
    } finally {
      if (token === this._token) this._loading = false;
    }
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('_data') || changedProps.has('_loading') || changedProps.has('_error')) {
      this.drawGraph();
    }
  }

  drawGraph() {
    const container = this.renderRoot.querySelector('#chart');
    if (!container || !this._data?.points.length) {
      this._chart?.dispose();
      this._chart = undefined;
      return;
    }
    const { points, from, to, attribute } = this._data;
    const units = resolveUnits(attribute.meta?.units);
    this._chart ??= new EChart(container);
    this._chart.setOption({
      animation: false,
      grid: { left: 2, right: 2, top: 6, bottom: 6 },
      xAxis: { type: 'time', show: false, min: from, max: to },
      yAxis: { type: 'value', show: false, scale: true },
      tooltip: {
        trigger: 'axis',
        confine: true,
        formatter: items => `${this.format(items[0].value[1])}${units ? ` ${units}` : ''}`,
      },
      series: [{
        type: 'line',
        data: points.map(point => [point.x, point.y]),
        showSymbol: false,
        smooth: 0.1,
        lineStyle: { color: '#4d9d2a', width: 2 },
      }],
    });
  }

  /** The value with the decimals of the widget; an attribute that has no value shows a dash. */
  format(value) {
    if (typeof value !== 'number') return '–';
    const { decimals } = this.widgetConfig;
    return value.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  /** The change over the period, from the first to the last known point. */
  delta() {
    const known = this._data?.points.filter(point => point.y != null) ?? [];
    if (known.length < 2) return undefined;
    const first = known[0].y;
    const last = known.at(-1).y;
    if (this.widgetConfig.deltaFormat === 'percentage') {
      if (!first) return { value: last ? 100 : 0, unit: '%' };
      return { value: Math.round(((last - first) / first) * 100), unit: '%' };
    }
    const { decimals } = this.widgetConfig;
    return { value: Number((last - first).toFixed(decimals)), unit: '' };
  }

  periodLabel() {
    const { followReportPeriod, period } = this.widgetConfig;
    return followReportPeriod !== false && ReportContext.period ? ReportContext.period.label : i18next.t(period);
  }

  render() {
    const message = this._loading
      ? html`<or-loading-indicator></or-loading-indicator>`
      : this._error ? html`<or-translate .value=${this._error}></or-translate>` : undefined;
    if (message || !this._data) {
      return html`<div class="panel"><div class="message">${message}</div></div>`;
    }
    const { asset, attribute } = this._data;
    const units = typeof attribute.value === 'number' ? resolveUnits(attribute.meta?.units) : '';
    const delta = this.delta();
    return html`
      <div class="panel">
        <div class="mainvalue-wrapper">
          <span class="main-number-icon">
            ${getAssetDescriptorIconTemplate(AssetModelUtil.getAssetDescriptor(asset.type))}</span>
          <span class="main-number">${this.format(attribute.value)}</span>
          ${when(units, () => html`<span class="main-number-unit">${units}</span>`)}
        </div>
        <div class="graph-wrapper">
          <div class="chart-wrapper">${this._data.points.length ? html`<div id="chart"></div>` : nothing}</div>
          <div class="controls-wrapper">
            <span class="delta">
              ${delta ? `${delta.value > 0 ? '+' : ''}${delta.value}${delta.unit}` : ''}
            </span>
            <span class="period">${this.periodLabel()}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('kpi-widget', KpiWidget);
