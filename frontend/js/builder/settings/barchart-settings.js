/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/barchart-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Added: the choice to follow the time frame of the report. Not ported: allowing the viewer to change the time range.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import { getDefaultTimeWindowOptions } from '../../data/time-window.js';
import { showDialog, OrMwcDialog } from '../../kit/dialog.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { getAssetDescriptorIconTemplate } from '../../kit/or-icon.js';
import '../panels/attributes-chart-panel.js';
import { BAR_METHOD_KEYS } from '../util/bar-chart-data.js';
import { DEFAULT_CHART_COLORS, getDefaultIntervalOptions, hasRef, sameRef } from '../util/chart-helpers.js';
import '../util/settings-panel.js';
import { WidgetSettings } from '../util/widget-settings.js';

const BAR_TIME_PREFIXES = ['this', 'last'];
const COLOR_INPUT_DELAY_MS = 200;

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

const attributeFilter = attribute => NUMERIC_VALUE_TYPES.includes(attribute.type);

export class BarChartSettings extends WidgetSettings {
  static styles = [...super.styles, styling];

  get attributesPanel() {
    return this.renderRoot.querySelector('attributes-chart-panel');
  }

  render() {
    const config = this.widgetConfig;
    const settings = config.attributeSettings;
    const min = config.chartOptions.options?.scales?.y?.min;
    const max = config.chartOptions.options?.scales?.y?.max;
    const isMultiAxis = !!settings.rightAxisAttributes?.length;
    const follow = config.followReportPeriod !== false;

    const attributeIconCallback = (asset, attribute, descriptor) => {
      const color = config.attributeColors?.find(([ref]) => ref.id === asset.id && ref.name === attribute.name)?.[1];
      const icon = getAssetDescriptorIconTemplate(descriptor, color?.replace('#', ''));
      return html`<span>${icon}</span>`;
    };

    const attributeActionCallback = attributeRef => {
      const faint = hasRef(settings.faintAttributes, attributeRef);
      let color = config.attributeColors?.find(([ref]) => sameRef(ref, attributeRef))?.[1];
      const customColor = !!color;
      if (!color) {
        const index = config.attributeRefs?.findIndex(ref => sameRef(ref, attributeRef));
        if (index >= 0) color = DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
      }
      const position = config.attributeRefs.findIndex(ref => sameRef(ref, attributeRef));
      const last = position === config.attributeRefs.length - 1;
      return [
        { icon: 'arrow-up-circle', tooltip: 'Order up', active: false, disabled: position === 0 },
        { icon: 'arrow-down-circle', tooltip: 'Order down', active: false, disabled: last },
        { icon: 'calculator-variant-outline', tooltip: i18next.t('algorithmMethod'), active: true, color,
          disabled: false },
        { icon: 'palette', tooltip: i18next.t('dashboard.barColor'), active: customColor, color, disabled: false },
        { icon: 'arrange-send-backward', tooltip: i18next.t('dashboard.faint'), active: faint, color, disabled: false },
        { icon: hasRef(settings.rightAxisAttributes, attributeRef) ? 'arrow-right-bold' : 'arrow-left-bold',
          tooltip: i18next.t('dashboard.toggleAxis'), active: false, color, disabled: false },
      ];
    };

    const option = item => ({ value: item, label: i18next.t(item.toLowerCase()) });
    const prefixOptions = BAR_TIME_PREFIXES.map(option);
    const windowOptions = [...getDefaultTimeWindowOptions().keys()].map(option);
    const intervalOptions = [...getDefaultIntervalOptions().keys()]
      .map(item => ({ value: item, label: i18next.t(`intervalBy${item.toLowerCase()}`) }));

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
                <or-vaadin-select .items=${prefixOptions} .value=${config.defaultTimePrefixKey}
                  @change=${event => this.onTimePrefixSelect(event)}>
                  <or-translate slot="label" value="prefixDefault"></or-translate>
                </or-vaadin-select>
                <or-vaadin-select .items=${windowOptions} .value=${config.defaultTimeWindowKey}
                  @change=${event => this.onTimeWindowSelect(event)}>
                  <or-translate slot="label" value="timeframeDefault"></or-translate>
                </or-vaadin-select>`)}
            <or-vaadin-select .items=${intervalOptions} .value=${config.defaultInterval}
              @change=${event => this.onIntervalSelect(event)}>
              <or-translate slot="label" value="withInterval"></or-translate>
            </or-vaadin-select>
          </div>
        </settings-panel>

        <!-- Display options -->
        <settings-panel displayName="display">
          <div style="padding-bottom: 12px; display: flex; flex-direction: column; gap: 16px;">
            <div class="switch-container">
              <span><or-translate value="dashboard.toggleStackView"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.stacked}
                @change=${event => this.onDefaultStackedToggle(event)}></or-vaadin-toggle>
            </div>
            <div class="switch-container">
              <span><or-translate value="dashboard.showLegend"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.showLegend}
                @change=${event => this.onShowLegendToggle(event)}></or-vaadin-toggle>
            </div>
            <or-vaadin-number-field min="0" .value=${String(config.decimals)}
              @change=${event => this.onDecimalsChange(event)}>
              <or-translate slot="label" value="decimals"></or-translate>
            </or-vaadin-number-field>
          </div>
        </settings-panel>

        <!-- Axis configuration -->
        <settings-panel displayName="dashboard.axisConfig">
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
      case 'arrange-send-backward':
        this.toggleAttributeSetting('faintAttributes', attributeRef);
        break;
      case 'calculator-variant-outline':
        this.openAlgorithmMethodsDialog(attributeRef);
        break;
      case 'arrow-up-circle':
        this.moveAttribute(attributeRef, -1);
        break;
      case 'arrow-down-circle':
        this.moveAttribute(attributeRef, 1);
        break;
      default:
        console.warn('Unknown attribute panel action:', action);
    }
  }

  moveAttribute(attributeRef, delta) {
    const refs = this.widgetConfig.attributeRefs;
    const index = refs.findIndex(ref => sameRef(ref, attributeRef));
    const target = index + delta;
    if (index >= 0 && target >= 0 && target < refs.length) {
      [refs[index], refs[target]] = [refs[target], refs[index]];
    }
    this.notifyConfigUpdate();
  }

  // When the list of attributeRefs is changed by the asset selector, we should remove the settings references for the
  // attributes that got removed. Also update the WidgetConfig attributeRefs field as usual
  onAttributesSelect(event) {
    const removed = this.widgetConfig.attributeRefs.filter(
      ref => !event.detail.attributeRefs.some(item => sameRef(item, ref)));
    removed.forEach(ref => {
      this.removeFromAttributeSettings(ref);
      this.removeFromAttributeColors(ref);
    });
    this.widgetConfig.attributeRefs = event.detail.attributeRefs;

    // Add colors
    this.widgetConfig.attributeColors ??= [];
    event.detail.attributeRefs.forEach((ref, index) => {
      if (!this.widgetConfig.attributeColors.some(item => sameRef(item[0], ref))) {
        this.widgetConfig.attributeColors.push([ref, DEFAULT_CHART_COLORS[index] ?? '#000000']);
      }
    });

    // Place attributes in 'AVG' if they are not in any method yet.
    const settings = this.widgetConfig.attributeSettings;
    this.widgetConfig.attributeRefs.forEach(ref => {
      if (!BAR_METHOD_KEYS.some(key => hasRef(settings[key], ref))) {
        (settings.methodAvgAttributes ??= []).push(ref);
      }
    });
    this.notifyConfigUpdate();
  }

  // An in-place replacement of an attribute: all per-attribute configuration (method, axis, colour) moves from the old
  // reference to the new one.
  onAttributeReplace(event) {
    const { oldRef, newRef } = event.detail;
    const matches = ref => sameRef(ref, oldRef);
    const settings = this.widgetConfig.attributeSettings;
    Object.keys(settings).forEach(key => {
      settings[key] = settings[key].map(ref => (matches(ref) ? { id: newRef.id, name: newRef.name } : ref));
    });
    this.widgetConfig.attributeColors = (this.widgetConfig.attributeColors ?? []).map(entry =>
      (matches(entry[0]) ? [{ id: newRef.id, name: newRef.name }, entry[1]] : entry));
    const index = this.widgetConfig.attributeRefs.findIndex(matches);
    if (index >= 0) {
      this.widgetConfig.attributeRefs[index] = { id: newRef.id, name: newRef.name };
    }
    this.notifyConfigUpdate();
  }

  removeFromAttributeSettings(attributeRef) {
    const settings = this.widgetConfig.attributeSettings;
    Object.keys(settings).forEach(key => {
      settings[key] = settings[key].filter(ref => !sameRef(ref, attributeRef));
    });
  }

  removeFromAttributeColors(attributeRef) {
    this.widgetConfig.attributeColors = (this.widgetConfig.attributeColors ?? [])
      .filter(([ref]) => !sameRef(ref, attributeRef));
  }

  /** Adds an attribute to an option of the attribute settings, such as the right axis, or removes it from it. */
  toggleAttributeSetting(setting, attributeRef, notify = true) {
    const attributes = (this.widgetConfig.attributeSettings[setting] ??= []);
    const index = attributes.findIndex(ref => sameRef(ref, attributeRef));
    if (index < 0) {
      attributes.push(attributeRef);
    } else {
      attributes.splice(index, 1);
      if (attributes.length === 0) delete this.widgetConfig.attributeSettings[setting];
    }
    if (notify) this.notifyConfigUpdate();
  }

  openColorPickDialog(attributeRef) {
    const selector = `#chart-color-${attributeRef.id}-${attributeRef.name}`;
    const input = this.attributesPanel?.shadowRoot?.querySelector(selector);
    if (!input) return;
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
    input.click();
  }

  /** A dialog with a check box for every method; the attribute gets a bar for each method that is checked. */
  openAlgorithmMethodsDialog(attributeRef) {
    const { attributeSettings } = this.widgetConfig;
    let selected = BAR_METHOD_KEYS.filter(key => hasRef(attributeSettings[key], attributeRef));
    showDialog(new OrMwcDialog()
      .setHeading(i18next.t('algorithmMethod'))
      .setContent(html`
        <div class="dialog-card" style="min-width: 260px;">
          <or-vaadin-checkbox-group theme="vertical" .value=${selected}
            @value-changed=${event => { selected = event.detail.value; }}>
            ${BAR_METHOD_KEYS.map(key => html`
              <or-vaadin-checkbox value=${key} label=${i18next.t(key)}></or-vaadin-checkbox>`)}
          </or-vaadin-checkbox-group>
        </div>`)
      .setActions([
        { actionName: 'cancel', content: 'cancel', default: true },
        {
          actionName: 'ok',
          content: 'ok',
          action: () => {
            BAR_METHOD_KEYS.filter(key => hasRef(this.widgetConfig.attributeSettings[key], attributeRef))
              .forEach(key => this.toggleAttributeSetting(key, attributeRef, false));
            selected.forEach(key => this.toggleAttributeSetting(key, attributeRef, false));
            this.notifyConfigUpdate();
          },
        },
      ]));
  }

  onFollowReportToggle(event) {
    this.widgetConfig.followReportPeriod = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  onTimePrefixSelect(event) {
    this.widgetConfig.defaultTimePrefixKey = event.currentTarget.value;
    this.notifyConfigUpdate();
  }

  onTimeWindowSelect(event) {
    this.widgetConfig.defaultTimeWindowKey = event.currentTarget.value;
    this.notifyConfigUpdate();
  }

  onIntervalSelect(event) {
    this.widgetConfig.defaultInterval = event.currentTarget.value;
    this.notifyConfigUpdate();
  }

  onShowLegendToggle(event) {
    this.widgetConfig.showLegend = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  onDefaultStackedToggle(event) {
    this.widgetConfig.stacked = event.currentTarget.checked;
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

  onDecimalsChange(event) {
    const element = event.currentTarget;
    if (element.checkValidity()) {
      this.widgetConfig.decimals = Number(element.value);
      this.notifyConfigUpdate();
    }
  }
}

customElements.define('barchart-settings', BarChartSettings);
