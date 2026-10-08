/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/gauge-widget.ts), together with what
 * its or-gauge shows: a half circle with coloured zones for the thresholds and a needle at the value of an attribute.
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { AssetModelUtil } from '../../data/asset-model.js';
import { resolveUnits } from '../../data/util.js';
import '../../kit/inputs.js';
import { getAssetDescriptorIconTemplate } from '../../kit/or-icon.js';
import { GaugeSettings } from '../settings/gauge-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';

const RESIZE_DELAY_MS = 150;

/** The options of the gauge that do not depend on the widget: those of OpenRemote's or-gauge. */
const GAUGE_OPTIONS = {
  angle: 0,
  lineWidth: 0.4,
  radiusScale: 1,
  pointer: { length: 0.5, strokeWidth: 0.035, color: '#000000' },
  limitMax: true,
  limitMin: true,
  colorStart: '#000000',
  colorStop: '#707070',
  strokeColor: '#ABCDEF',
  generateGradient: false,
  highDpiSupport: true,
};

export class GaugeWidget extends OrAssetWidget {
  static properties = {
    _loading: { state: true },
    _size: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    #wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    #error-txt {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
    }

    .mainvalue-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      flex: 0 0 auto;
      gap: 8px;
    }

    .main-number-icon {
      display: flex;
      --or-icon-width: 24px;
      --or-icon-height: 24px;
    }

    .main-number {
      font-size: var(--label-size, 36px);
    }

    .main-number-unit {
      font-size: var(--label-size, 36px);
      font-weight: 200;
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
    this._size = undefined;
    this._token = 0;
    this.gauge = undefined;
    this.resizeObserver = undefined;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.gauge = undefined;
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
      const loaded = attributeRefs?.filter(ref => this.isAttributeRefLoaded(ref));
      if (loaded?.length !== (attributeRefs ? attributeRefs.length : 0)) {
        this.loadAssets(attributeRefs);
      }
    }
    return super.willUpdate(changedProps);
  }

  async loadAssets(attributeRefs) {
    const token = ++this._token;
    if (attributeRefs.length === 0) {
      this._error = 'noAttributesConnected';
      return;
    }
    this._loading = true;
    this._error = undefined;
    try {
      const assets = await this.fetchAssets(attributeRefs);
      if (token !== this._token) return;
      this.loadedAssets = assets;
      this.assetAttributes = attributeRefs
        .map(ref => {
          const index = assets.findIndex(asset => asset.id === ref.id);
          const attribute = index >= 0 ? assets[index].attributes?.[ref.name] : undefined;
          return attribute ? [index, attribute] : undefined;
        })
        .filter(Boolean);
    } catch (error) {
      if (token === this._token) this._error = error.message;
    } finally {
      if (token === this._token) this._loading = false;
    }
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.resizeObserver = new ResizeObserver(entries => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        const { width, height } = entries[0].contentRect;
        this._size = { width, height };
      }, RESIZE_DELAY_MS);
    });
    this.resizeObserver.observe(this);
  }

  updated(changedProps) {
    super.updated(changedProps);
    // The gauge library does not resize, so it is made again whenever something that shows changes.
    if (['_size', 'assetAttributes', 'widgetConfig', '_loading', '_error'].some(name => changedProps.has(name))) {
      this.drawGauge();
    }
  }

  labelSize(width) {
    if (width < 120) return 24;
    if (width < 240) return 30;
    if (width < 320) return 36;
    return 42;
  }

  showLabel(size) {
    return size.width > 70 && size.height > 100;
  }

  drawGauge() {
    const canvas = this.renderRoot.querySelector('#chart');
    const attribute = this.assetAttributes?.[0]?.[1];
    if (!canvas || !attribute || !this._size) return;
    const { min, max, thresholds } = this.widgetConfig;
    const showLabel = this.showLabel(this._size);
    const labelHeight = showLabel ? this.renderRoot.querySelector('.mainvalue-wrapper')?.clientHeight ?? 0 : 0;
    // the canvas is a half circle: as wide as it can be in the width and 1.5 times the height that is left
    const width = Math.max(40, Math.min(this._size.width, (this._size.height - labelHeight) * 1.5));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${width / 2}px`;

    const staticZones = [...thresholds].sort((x, y) => (x[0] < y[0] ? -1 : 1)).map((threshold, index, sorted) => {
      const zoneMin = threshold[0];
      const zoneMax = sorted[index + 1] ? sorted[index + 1][0] : max;
      return {
        strokeStyle: threshold[1],
        min: Math.min(Math.max(zoneMin, min), max),
        max: Math.min(Math.max(zoneMax, min), max),
      };
    });
    if (staticZones.length) staticZones[0].min = min; // the lowest zone always starts at the minimum

    const hasValue = typeof attribute.value === 'number';
    // without a value there is no needle: the zones show, and the label says that there is nothing to read
    const pointer = hasValue ? GAUGE_OPTIONS.pointer : { ...GAUGE_OPTIONS.pointer, length: 0 };
    this.gauge = new window.Gauge(canvas);
    this.gauge.setOptions({ ...GAUGE_OPTIONS, pointer, staticZones });
    this.gauge.maxValue = max;
    this.gauge.setMinValue(min);
    this.gauge.animationSpeed = 1;
    this.gauge.set(hasValue ? attribute.value : min);
  }

  render() {
    if (this._loading) return html`<or-loading-indicator></or-loading-indicator>`;
    if (this._error) return html`<or-translate id="error-txt" .value=${this._error}></or-translate>`;
    const [index, attribute] = this.assetAttributes?.[0] ?? [];
    const asset = this.loadedAssets?.[index];
    if (!asset || !attribute) {
      return html`<div id="error-txt"><span><or-translate value="noAttributeConnected"></or-translate></span></div>`;
    }
    const showLabel = this._size ? this.showLabel(this._size) : true;
    const value = typeof attribute.value === 'number'
      ? Number(attribute.value.toFixed(this.widgetConfig.decimals))
      : undefined;
    const units = value === undefined ? '' : resolveUnits(attribute.meta?.units);
    return html`
      <div id="wrapper" style="--label-size: ${this.labelSize(this._size?.width ?? 300)}px">
        <canvas id="chart"></canvas>
        ${when(showLabel, () => html`
          <div class="mainvalue-wrapper">
            <span class="main-number-icon">
              ${getAssetDescriptorIconTemplate(AssetModelUtil.getAssetDescriptor(asset.type))}</span>
            <span class="main-number">${value ?? '–'}</span>
            <span class="main-number-unit">${units}</span>
          </div>`)}
      </div>
    `;
  }
}

customElements.define('gauge-widget', GaugeWidget);
