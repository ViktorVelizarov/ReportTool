/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/chart-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Added: the choice to follow the time frame of the report. Not ported: allowing the viewer to change the time range,
 * the zoom bar and the choice of the data sampling (there is one algorithm), which are for looking around in a
 * dashboard.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import { getDefaultTimePrefixOptions, getDefaultTimeWindowOptions } from '../../data/time-window.js';
import { getAssetDescriptorIconTemplate } from '../../kit/or-icon.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import '../panels/attributes-chart-panel.js';
import { DEFAULT_CHART_COLORS, hasRef, sameRef } from '../util/chart-helpers.js';
import '../util/settings-panel.js';
import { splitPresetKey } from '../util/widget-time.js';
import { WidgetSettings } from '../util/widget-settings.js';

const styling = css`
  .switch-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .hint {
    color: #6b7280;
    font-size: 13px;
  }

  .axis-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
`;

const COLOR_INPUT_DELAY_MS = 200;
const attributeFilter = attribute => attribute.type === 'boolean' || NUMERIC_VALUE_TYPES.includes(attribute.type);

export class ChartSettings extends WidgetSettings {
  static styles = [...super.styles, styling];

  constructor(config) {
    super(config);
    this.timeWindowOptions = getDefaultTimeWindowOptions();
    this.timePrefixOptions = getDefaultTimePrefixOptions();
  }

  get attributesPanel() {
    return this.renderRoot.querySelector('attributes-chart-panel');
  }

  render() {
    const config = this.widgetConfig;
    const attributeConfig = config.attributeConfig;
    const min = config.chartOptions.options?.scales?.y?.min;
    const max = config.chartOptions.options?.scales?.y?.max;
    const isMultiAxis = (attributeConfig?.rightAxisAttributes?.length || 0) > 0;
    const follow = config.followReportPeriod !== false;

    const attributeIconCallback = (asset, attribute, descriptor) => {
      let color = config.attributeColors?.find(item => item[0].id === asset.id && item[0].name === attribute.name)?.[1];
      if (!color) {
        const index = config.attributeRefs?.findIndex(ref => ref.id === asset.id && ref.name === attribute.name);
        if (index >= 0) color = DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
      }
      const icon = getAssetDescriptorIconTemplate(descriptor, color?.replace('#', ''));
      return html`<span>${icon}</span>`;
    };

    const attributeActionCallback = attributeRef => {
      const isOnRightAxis = hasRef(attributeConfig?.rightAxisAttributes, attributeRef);
      let color = config.attributeColors?.find(item => sameRef(item[0], attributeRef))?.[1];
      const customColor = !!color;
      if (!color) {
        const index = config.attributeRefs?.findIndex(ref => sameRef(ref, attributeRef));
        if (index >= 0) color = DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
      }
      return [
        { icon: 'palette', tooltip: i18next.t('dashboard.lineColor'), active: customColor, color, disabled: false },
        { icon: 'chart-bell-curve-cumulative', tooltip: i18next.t('dashboard.smooth'),
          active: hasRef(attributeConfig?.smoothAttributes, attributeRef), color, disabled: false },
        { icon: 'square-wave', tooltip: i18next.t('dashboard.stepped'),
          active: hasRef(attributeConfig?.steppedAttributes, attributeRef), color, disabled: false },
        { icon: 'chart-areaspline-variant', tooltip: i18next.t('dashboard.fill'),
          active: hasRef(attributeConfig?.areaAttributes, attributeRef), color, disabled: false },
        { icon: 'arrange-send-backward', tooltip: i18next.t('dashboard.faint'),
          active: hasRef(attributeConfig?.faintAttributes, attributeRef), color, disabled: false },
        { icon: 'arrow-expand-right', tooltip: i18next.t('dashboard.extendData'),
          active: hasRef(attributeConfig?.extendedAttributes, attributeRef), color, disabled: false },
        { icon: isOnRightAxis ? 'arrow-right-bold' : 'arrow-left-bold', tooltip: i18next.t('dashboard.toggleAxis'),
          active: isOnRightAxis, color, disabled: false },
      ];
    };

    // Determine the selected timeframe
    const { prefix, windowKey } = this.selectedPreset();
    const option = item => ({ value: item, label: i18next.t(item.toLowerCase()) });
    const prefixOptions = this.timePrefixOptions.map(option);
    const windowOptions = [...this.timeWindowOptions.keys()].map(option);

    return html`
      <div>
        <!-- Attribute selection -->
        <settings-panel displayName="attributes" expanded>
          <attributes-chart-panel .attributeRefs=${config.attributeRefs} multi onlyDataAttrs
            .attributeFilter=${attributeFilter} style="padding-bottom: 12px;"
            .attributeIconCallback=${attributeIconCallback} .attributeActionCallback=${attributeActionCallback}
            @attribute-action=${event => this.onAttributeAction(event)}
            @attribute-replace=${event => this.onAttributeReplace(event)}
            @attribute-select=${event => this.onAttributesSelect(event)}></attributes-chart-panel>
        </settings-panel>

        <!-- Time options -->
        <settings-panel displayName="time" expanded>
          <div style="padding-bottom: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div class="switch-container">
              <span><or-translate value="report.followReport"></or-translate></span>
              <or-vaadin-toggle ?checked=${follow}
                @change=${event => this.onFollowReportToggle(event)}></or-vaadin-toggle>
            </div>
            ${when(follow,
              () => html`<span class="hint"><or-translate value="report.followReportHint"></or-translate></span>`,
              () => html`
                <!-- This/last selection of timeframe -->
                <or-vaadin-select .items=${prefixOptions} .value=${prefix}
                  @change=${event => this.onTimePrefixSelect(event)}>
                  <or-translate slot="label" value="prefixDefault"></or-translate>
                </or-vaadin-select>
                <!-- Select time frame -->
                <or-vaadin-select .items=${windowOptions} .value=${windowKey}
                  @change=${event => this.onTimeWindowSelect(event)}>
                  <or-translate slot="label" value="timeframeDefault"></or-translate>
                </or-vaadin-select>`)}
          </div>
        </settings-panel>

        <!-- Display options -->
        <settings-panel displayName="display" expanded>
          <div style="padding-bottom: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div class="switch-container">
              <span><or-translate value="dashboard.toggleStackView"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.stacked}
                @change=${event => this.onStackViewToggle(event)}></or-vaadin-toggle>
            </div>
            <div class="switch-container">
              <span><or-translate value="dashboard.showLegend"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.showLegend}
                @change=${event => this.onShowLegendToggle(event)}></or-vaadin-toggle>
            </div>
          </div>
        </settings-panel>

        <!-- Axis configuration -->
        <settings-panel displayName="dashboard.axisConfig" expanded>
          <div style="padding-bottom: 12px; display: flex; flex-direction: column; gap: 16px;">
            ${this.axisTemplate('left', min, max, isMultiAxis)}
            ${when(isMultiAxis, () => this.axisTemplate('right',
              config.chartOptions.options?.scales?.y1?.min, config.chartOptions.options?.scales?.y1?.max, true))}
          </div>
        </settings-panel>
      </div>
    `;
  }

  /** The minimum and maximum of an axis: "auto" until the toggle is on. */
  axisTemplate(axis, min, max, showTitle) {
    const label = type => html`
      <span slot="label">
        <or-translate value="yAxis"></or-translate> <or-translate value=${type}></or-translate>
      </span>`;
    const field = (type, value) => html`
      <div class="axis-row" style=${type === 'min' ? 'margin-top: 12px;' : ''}>
        ${value !== undefined
          ? html`
            <or-vaadin-number-field .value=${String(value)}
              @change=${event => this.onMinMaxValueChange(axis, type, event)}>${label(type)}</or-vaadin-number-field>`
          : html`<or-vaadin-text-field value="auto" readonly>${label(type)}</or-vaadin-text-field>`}
        <or-vaadin-toggle ?checked=${value !== undefined}
          @change=${event => this.onMinMaxValueToggle(axis, type, event)}></or-vaadin-toggle>
      </div>`;
    const title = axis === 'left' ? 'dashboard.leftAxis' : 'dashboard.rightAxis';
    return html`
      <div>
        ${when(showTitle, () => html`
          <div style="margin-bottom: 8px;"><span><or-translate value=${title}></or-translate></span></div>`)}
        ${field('max', max)}
        ${field('min', min)}
      </div>`;
  }

  // Check which icon was pressed and act accordingly.
  onAttributeAction(event) {
    const { attributeRef, action } = event.detail;
    switch (action.icon) {
      case 'palette':
        this.openColorPickDialog(attributeRef);
        break;
      case 'arrow-right-bold':
      case 'arrow-left-bold':
        this.toggleAttributeSetting('rightAxisAttributes', attributeRef);
        break;
      case 'chart-bell-curve-cumulative':
        if (!action.active) this.removeAttributeSetting('steppedAttributes', attributeRef);
        this.toggleAttributeSetting('smoothAttributes', attributeRef);
        break;
      case 'square-wave':
        if (!action.active) this.removeAttributeSetting('smoothAttributes', attributeRef);
        this.toggleAttributeSetting('steppedAttributes', attributeRef);
        break;
      case 'chart-areaspline-variant':
        this.toggleAttributeSetting('areaAttributes', attributeRef);
        break;
      case 'arrange-send-backward':
        this.toggleAttributeSetting('faintAttributes', attributeRef);
        break;
      case 'arrow-expand-right':
        this.toggleAttributeSetting('extendedAttributes', attributeRef);
        break;
      default:
        console.warn('Unknown attribute panel action:', action);
    }
  }

  // When the list of attributeRefs is changed by the asset selector, we should remove the settings references for the
  // attributes that got removed. Also update the WidgetConfig attributeRefs field as usual
  onAttributesSelect(event) {
    const removed = this.widgetConfig.attributeRefs.filter(
      ref => !event.detail.attributeRefs.some(item => sameRef(item, ref)));
    removed.forEach(ref => {
      this.removeFromAttributeConfig(ref);
      this.removeFromAttributeColors(ref);
    });
    this.widgetConfig.attributeRefs = event.detail.attributeRefs;
    this.notifyConfigUpdate();
  }

  // An in-place replacement of an attribute: all per-attribute configuration (axis, smooth, stepped, ... and the
  // colour) moves from the old reference to the new one.
  onAttributeReplace(event) {
    const { oldRef, newRef } = event.detail;
    const matches = ref => sameRef(ref, oldRef);
    const config = this.widgetConfig.attributeConfig;
    if (config) {
      Object.keys(config).forEach(key => {
        config[key] = config[key]?.map(ref => (matches(ref) ? { id: newRef.id, name: newRef.name } : ref));
      });
    }
    this.widgetConfig.attributeColors = (this.widgetConfig.attributeColors ?? []).map(entry =>
      (matches(entry[0]) ? [{ id: newRef.id, name: newRef.name }, entry[1]] : entry));
    const index = this.widgetConfig.attributeRefs.findIndex(matches);
    if (index >= 0) {
      this.widgetConfig.attributeRefs[index] = { id: newRef.id, name: newRef.name };
    }
    this.notifyConfigUpdate();
  }

  removeFromAttributeConfig(attributeRef) {
    const config = this.widgetConfig.attributeConfig;
    if (config) {
      Object.keys(config).forEach(key => {
        config[key] = config[key]?.filter(ref => !sameRef(ref, attributeRef));
      });
    }
  }

  /** Adds an attribute to an option of the attribute config, such as the right axis, or removes it from it. */
  toggleAttributeSetting(setting, attributeRef) {
    if (hasRef(this.widgetConfig.attributeConfig?.[setting], attributeRef)) {
      this.removeAttributeSetting(setting, attributeRef);
    } else {
      this.widgetConfig.attributeConfig ??= {};
      (this.widgetConfig.attributeConfig[setting] ??= []).push(attributeRef);
    }
    this.notifyConfigUpdate();
  }

  removeAttributeSetting(setting, attributeRef) {
    const attributes = this.widgetConfig.attributeConfig?.[setting];
    if (!attributes) return;
    const index = attributes.findIndex(ref => sameRef(ref, attributeRef));
    if (index < 0) return;
    if (attributes.length === 1) delete this.widgetConfig.attributeConfig[setting];
    else attributes.splice(index, 1);
  }

  removeFromAttributeColors(attributeRef) {
    this.widgetConfig.attributeColors = this.widgetConfig.attributeColors
      ?.filter(([ref]) => !sameRef(ref, attributeRef));
  }

  openColorPickDialog(attributeRef) {
    const selector = `#chart-color-${attributeRef.id}-${attributeRef.name}`;
    const input = this.attributesPanel?.shadowRoot?.querySelector(selector);
    if (!input) return;
    // Listen for changes
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.widgetConfig.attributeColors ??= [];
        const existing = this.widgetConfig.attributeColors.find(item => sameRef(item[0], attributeRef));
        if (existing) existing[1] = input.value;
        else this.widgetConfig.attributeColors.push([attributeRef, input.value]);
        this.widgetConfig.attributeColors = [...this.widgetConfig.attributeColors];
        this.notifyConfigUpdate();
      }, COLOR_INPUT_DELAY_MS);
    });
    // Open color picker
    input.click();
  }

  onFollowReportToggle(event) {
    this.widgetConfig.followReportPeriod = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  /** The prefix ("last") and the window ("7Days") of the time window of the chart. */
  selectedPreset() {
    return splitPresetKey(this.widgetConfig.defaultTimePresetKey, this.timePrefixOptions, this.timeWindowOptions);
  }

  onTimePrefixSelect(event) {
    const { windowKey } = this.selectedPreset();
    this.widgetConfig.defaultTimePresetKey = event.currentTarget.value + windowKey;
    this.notifyConfigUpdate();
  }

  onTimeWindowSelect(event) {
    const { prefix } = this.selectedPreset();
    this.widgetConfig.defaultTimePresetKey = prefix + event.currentTarget.value;
    this.notifyConfigUpdate();
  }

  onStackViewToggle(event) {
    this.widgetConfig.stacked = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  onShowLegendToggle(event) {
    this.widgetConfig.showLegend = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  setAxisMinMaxValue(axis, type, value) {
    const scales = ((this.widgetConfig.chartOptions ??= {}).options ??= {}).scales ??= {};
    (scales[axis === 'left' ? 'y' : 'y1'] ??= {})[type] = value;
    this.notifyConfigUpdate();
  }

  onMinMaxValueChange(axis, type, event) {
    const element = event.currentTarget;
    if (element.checkValidity()) this.setAxisMinMaxValue(axis, type, Number(element.value));
  }

  onMinMaxValueToggle(axis, type, event) {
    this.setAxisMinMaxValue(axis, type, event.currentTarget.checked ? (type === 'min' ? 0 : 100) : undefined);
  }
}

customElements.define('chart-settings', ChartSettings);
