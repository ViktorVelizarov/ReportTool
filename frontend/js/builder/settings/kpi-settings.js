/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/kpi-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Added: the choice to follow the time frame of the report. Not ported: allowing the viewer to change the time range,
 * a report is a document.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { AssetWidgetSettings } from '../util/or-asset-widget.js';
import '../panels/attributes-panel.js';
import '../util/settings-panel.js';

const styling = css`
  .switchMwcInputContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .hint {
    color: #6b7280;
    font-size: 13px;
  }
`;

const attributeFilter = attribute => NUMERIC_VALUE_TYPES.includes(attribute.type);

/** The periods a KPI can show when it does not follow the report. */
const KPI_PERIODS = ['year', 'month', 'week', 'day', 'hour'];

export class KpiSettings extends AssetWidgetSettings {
  static styles = [...super.styles, styling];

  render() {
    const follow = this.widgetConfig.followReportPeriod !== false;
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
            <div class="switchMwcInputContainer">
              <span><or-translate value="report.followReport"></or-translate></span>
              <or-vaadin-toggle ?checked=${follow}
                @change=${event => this.onFollowReportToggle(event)}></or-vaadin-toggle>
            </div>
            ${when(follow,
              () => html`<span class="hint"><or-translate value="report.followReportHint"></or-translate></span>`,
              () => html`
                <or-vaadin-select
                  .items=${KPI_PERIODS.map(item => ({ value: item, label: i18next.t(item) }))}
                  .value=${this.widgetConfig.period}
                  @change=${event => this.onTimeframeSelect(event)}>
                  <or-translate slot="label" value="timeframe"></or-translate>
                </or-vaadin-select>`)}
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

  onFollowReportToggle(event) {
    this.widgetConfig.followReportPeriod = event.currentTarget.checked;
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
