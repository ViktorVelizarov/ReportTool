/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/kpi-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * The KPI of OpenRemote shows the last hour, day, week, month or year up to now, so it does not follow the time frame
 * of the report, and its settings have no choice for that. Left out: "Allow time range selection", as the KPI has no
 * period menu in a report (see kpi-widget.js).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { html } from 'lit';
import { NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { AssetWidgetSettings } from '../util/or-asset-widget.js';
import '../panels/attributes-panel.js';
import '../util/settings-panel.js';

const attributeFilter = attribute => NUMERIC_VALUE_TYPES.includes(attribute.type);

/** The periods that a KPI can show. */
const KPI_PERIODS = ['year', 'month', 'week', 'day', 'hour'];

export class KpiSettings extends AssetWidgetSettings {
  render() {
    return html`
      <div>
        <!-- Attribute selector -->
        <settings-panel displayName="attributes" expanded>
          <attributes-panel .attributeRefs=${this.widgetConfig.attributeRefs} .attributeFilter=${attributeFilter}
            style="padding-bottom: 12px;"
            @attribute-select=${event => this.onAttributesSelect(event)}></attributes-panel>
        </settings-panel>

        <!-- Display settings -->
        <settings-panel displayName="display" expanded>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <or-vaadin-select
              .items=${KPI_PERIODS.map(item => ({ value: item, label: i18next.t(item) }))}
              .value=${this.widgetConfig.period}
              @change=${event => this.onTimeframeSelect(event)}>
              <or-translate slot="label" value="timeframe"></or-translate>
            </or-vaadin-select>
          </div>
        </settings-panel>

        <settings-panel displayName="values" expanded>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <or-vaadin-select
              .items=${['absolute', 'percentage'].map(item => ({ value: item, label: i18next.t(item) }))}
              .value=${this.widgetConfig.deltaFormat}
              @change=${event => this.onDeltaFormatSelect(event)}>
              <or-translate slot="label" value="dashboard.showValueAs"></or-translate>
            </or-vaadin-select>
            <or-vaadin-number-field .value=${String(this.widgetConfig.decimals)} min="0"
              @change=${event => this.onDecimalsChange(event)}>
              <or-translate slot="label" value="decimals"></or-translate>
            </or-vaadin-number-field>
          </div>
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

  onTimeframeSelect(event) {
    this.widgetConfig.period = event.currentTarget.value;
    this.notifyConfigUpdate();
  }

  onDeltaFormatSelect(event) {
    this.widgetConfig.deltaFormat = event.currentTarget.value;
    this.notifyConfigUpdate();
  }

  onDecimalsChange(event) {
    const element = event.currentTarget;
    if (element.checkValidity()) {
      this.widgetConfig.decimals = Number(element.value);
      this.notifyConfigUpdate();
    }
  }
}

customElements.define('kpi-settings', KpiSettings);
