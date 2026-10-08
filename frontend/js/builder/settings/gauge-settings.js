/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/gauge-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { html } from 'lit';
import { NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import '../../kit/inputs.js';
import '../panels/attributes-panel.js';
import '../panels/thresholds-panel.js';
import '../util/settings-panel.js';
import { WidgetSettings } from '../util/widget-settings.js';

const attributeFilter = attribute => NUMERIC_VALUE_TYPES.includes(attribute.type);

export class GaugeSettings extends WidgetSettings {
  render() {
    return html`
      <div>
        <!-- Attribute selection -->
        <settings-panel displayName="attributes" expanded>
          <attributes-panel .attributeRefs=${this.widgetConfig.attributeRefs} .attributeFilter=${attributeFilter}
            style="padding-bottom: 12px;"
            @attribute-select=${event => this.onAttributesSelect(event)}></attributes-panel>
        </settings-panel>

        <!-- Min/max and decimals options-->
        <settings-panel displayName="values" expanded>
          <div style="padding-bottom: 12px; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 8px;">
              <or-vaadin-number-field .value=${String(this.widgetConfig.min)} max=${this.widgetConfig.max}
                @change=${event => this.onMinMaxValueChange('min', event)}>
                <or-translate slot="label" value="min"></or-translate>
              </or-vaadin-number-field>
              <or-vaadin-number-field .value=${String(this.widgetConfig.max)} min=${this.widgetConfig.min}
                @change=${event => this.onMinMaxValueChange('max', event)}>
                <or-translate slot="label" value="max"></or-translate>
              </or-vaadin-number-field>
            </div>
            <div>
              <or-vaadin-number-field .value=${String(this.widgetConfig.decimals)} min="0"
                @change=${event => this.onDecimalsChange(event)}>
                <or-translate slot="label" value="decimals"></or-translate>
              </or-vaadin-number-field>
            </div>
          </div>
        </settings-panel>

        <!-- Thresholds panel -->
        <settings-panel displayName="thresholds" expanded>
          <thresholds-panel .thresholds=${this.widgetConfig.thresholds} valueType="number" style="padding-bottom: 12px;"
            .min=${this.widgetConfig.min} .max=${this.widgetConfig.max}
            @threshold-change=${event => this.onThresholdChange(event)}></thresholds-panel>
        </settings-panel>
      </div>
    `;
  }

  // When new attributes get selected, the displayName becomes the new asset and attribute name.
  onAttributesSelect(event) {
    this.widgetConfig.attributeRefs = event.detail.attributeRefs;
    if (event.detail.attributeRefs.length === 1) {
      const attributeRef = event.detail.attributeRefs[0];
      const asset = event.detail.assets.find(item => item.id === attributeRef.id);
      this.setDisplayName(asset ? `${asset.name} - ${attributeRef.name}` : `${attributeRef.name}`);
    }
    this.notifyConfigUpdate();
  }

  onMinMaxValueChange(type, event) {
    const element = event.currentTarget;
    if (!element.checkValidity()) return;
    const newValue = Number(element.value);
    const { thresholds } = this.widgetConfig;
    if (type === 'max') {
      this.widgetConfig.max = newValue;
      // Make sure every threshold value is not higher than what is allowed.
      thresholds.sort((x, y) => y[0] - x[0]).forEach((threshold, index) => {
        threshold[0] = Math.max(Math.min(threshold[0], newValue - index - 1), this.widgetConfig.min);
      });
    } else {
      this.widgetConfig.min = newValue;
      // Update the lowest (locked) threshold value to minimum value, and make sure every threshold value is not lower
      // than what is allowed.
      const sorted = thresholds.sort((x, y) => (x[0] < y[0] ? -1 : 1));
      sorted[0][0] = newValue;
      sorted.forEach((threshold, index) => {
        threshold[0] = Math.min(Math.max(threshold[0], newValue + index), this.widgetConfig.max);
      });
    }
    this.notifyConfigUpdate();
  }

  onDecimalsChange(event) {
    const element = event.currentTarget;
    if (element.checkValidity()) {
      this.widgetConfig.decimals = Number(element.value);
      this.notifyConfigUpdate();
    }
  }

  onThresholdChange(event) {
    this.widgetConfig.thresholds = event.detail;
    this.notifyConfigUpdate();
  }
}

customElements.define('gauge-settings', GaugeSettings);
