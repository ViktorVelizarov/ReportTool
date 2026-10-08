/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/table-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html } from 'lit';
import '../../kit/inputs.js';
import '../panels/assettypes-panel.js';
import { AssetWidgetSettings } from '../util/or-asset-widget.js';
import '../util/settings-panel.js';

const styling = css`
  .customMwcInputContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ASSET_TYPES_CONFIG = {
  assets: { enabled: true, multi: true, allOfTypeOption: true },
  attributes: { enabled: true, multi: true },
};

export class TableSettings extends AssetWidgetSettings {
  static styles = [...super.styles, styling];

  render() {
    const config = this.widgetConfig;
    return html`
      <div>
        <!-- Asset type, assets, and attribute picker -->
        <settings-panel displayName="attributes" expanded>
          <div style="padding-bottom: 12px;">
            <assettypes-panel .assetType=${config.assetType} .config=${ASSET_TYPES_CONFIG} .assetIds=${config.assetIds}
              .attributeNames=${config.attributeNames} .allOfType=${config.allOfType}
              @assettype-select=${event => this.onAssetTypeSelect(event)}
              @alloftype-switch=${event => this.onAssetAllOfTypeSwitch(event)}
              @assetids-select=${event => this.onAssetIdsSelect(event)}
              @attributenames-select=${event => this.onAttributesSelect(event)}></assettypes-panel>
          </div>
        </settings-panel>

        <!-- Table settings like amount of rows -->
        <settings-panel displayName="dashboard.tableSettings" expanded>
          <div style="padding-bottom: 12px;">
            <div class="customMwcInputContainer">
              <span style="min-width: 180px"><or-translate value="dashboard.numberOfRows"></or-translate></span>
              <or-vaadin-select .items=${['10', '25', '100'].map(item => ({ value: item, label: item }))}
                .value=${String(config.tableSize)} @change=${event => this.onTableSizeSelect(event)}></or-vaadin-select>
            </div>
          </div>
        </settings-panel>
      </div>
    `;
  }

  onAssetTypeSelect(event) {
    this.widgetConfig.assetType = event.detail;
    this.widgetConfig.assetIds = [];
    this.widgetConfig.attributeNames = [];
    this.notifyConfigUpdate();
  }

  onAssetAllOfTypeSwitch(event) {
    this.widgetConfig.allOfType = event.detail;
    this.notifyConfigUpdate();
  }

  onAssetIdsSelect(event) {
    this.widgetConfig.assetIds = event.detail;
    this.notifyConfigUpdate();
  }

  onAttributesSelect(event) {
    this.widgetConfig.attributeNames = event.detail;
    this.notifyConfigUpdate();
  }

  onTableSizeSelect(event) {
    const value = Number(event.currentTarget.value || 10);
    this.widgetConfig.tableSize = value;
    this.widgetConfig.tableOptions = value !== 10 ? [value] : [10, 25, 100];
    this.notifyConfigUpdate();
  }
}

customElements.define('table-settings', TableSettings);
