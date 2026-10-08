/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/map-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { showSnackbar } from '../../kit/snackbar.js';
import '../../kit/inputs.js';
import '../panels/assettypes-panel.js';
import '../panels/thresholds-panel.js';
import { AssetWidgetSettings } from '../util/or-asset-widget.js';
import '../util/settings-panel.js';

const styling = css`
  .switchMwcInputContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ALLOWED_VALUE_TYPES = [
  'boolean', 'number', 'integer', 'positiveInteger', 'positiveNumber', 'negativeInteger', 'negativeNumber', 'text',
];

const ASSET_TYPES_CONFIG = {
  assets: { enabled: true, multi: true, allOfTypeOption: true },
  attributes: { enabled: true, valueTypes: ALLOWED_VALUE_TYPES },
};

export class MapSettings extends AssetWidgetSettings {
  static styles = [...super.styles, styling];

  render() {
    const config = this.widgetConfig;
    const center = config.center ? `${config.center.lng}, ${config.center.lat}` : '';
    return html`
      <div>
        <!-- Map settings -->
        <settings-panel displayName="configuration.mapSettings" expanded>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Zoom level -->
            <or-vaadin-number-field .value=${config.zoom === undefined ? '' : String(config.zoom)} min="0"
              @change=${event => this.onZoomUpdate(event)}>
              <or-translate slot="label" value="dashboard.zoom"></or-translate>
            </or-vaadin-number-field>
            <or-vaadin-text-field .value=${center} @change=${event => this.onCenterUpdate(event)}>
              <or-translate slot="label" value="dashboard.center"></or-translate>
            </or-vaadin-text-field>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span><or-translate value="dashboard.showGeoJson"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.showGeoJson}
                @change=${event => this.onGeoJsonToggle(event)}></or-vaadin-toggle>
            </div>
          </div>
        </settings-panel>

        <!-- Panel where Asset type and the selected attribute can be customized -->
        <settings-panel displayName="attributes" expanded>
          <assettypes-panel .assetType=${config.assetType} .attributeNames=${[config.attributeName]}
            .config=${ASSET_TYPES_CONFIG} .allOfType=${config.allOfType} .assetIds=${config.assetIds}
            @assettype-select=${event => this.onAssetTypeSelect(event)}
            @alloftype-switch=${event => this.onAssetAllOfTypeSwitch(event)}
            @assetids-select=${event => this.onAssetIdsSelect(event)}
            @attributenames-select=${event => this.onAttributeNameSelect(event)}></assettypes-panel>

          <!-- Other settings like labels and units-->
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
            <div class="switchMwcInputContainer">
              <span><or-translate value="dashboard.showLabels"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.showLabels} ?disabled=${!config.assetType}
                @change=${event => this.onShowLabelsToggle(event)}></or-vaadin-toggle>
            </div>
            <div class="switchMwcInputContainer">
              <span><or-translate value="dashboard.showUnits"></or-translate></span>
              <or-vaadin-toggle ?checked=${config.showUnits} ?disabled=${!config.showLabels || !config.assetType}
                @change=${event => this.onShowUnitsToggle(event)}></or-vaadin-toggle>
            </div>
          </div>
        </settings-panel>

        <!-- List of customizable thresholds -->
        ${when(config.attributeName, () => html`
          <settings-panel displayName="thresholds" expanded>
            <thresholds-panel .thresholds=${config.thresholds} .boolColors=${config.boolColors}
              .textColors=${config.textColors} .valueType=${config.valueType} style="padding-bottom: 12px;"
              .min=${config.min} .max=${config.max}
              @threshold-change=${event => this.onThresholdsChange(event)}
              @bool-colors-change=${event => this.onBoolColorsChange(event)}
              @text-colors-change=${event => this.onTextColorsChange(event)}></thresholds-panel>
          </settings-panel>`)}
      </div>
    `;
  }

  onZoomUpdate(event) {
    const element = event.currentTarget;
    if (element.checkValidity()) {
      this.widgetConfig.zoom = element.value === '' ? undefined : Number(element.value);
      this.notifyConfigUpdate();
    }
  }

  onCenterUpdate(event) {
    const element = event.currentTarget;
    if (!element.checkValidity()) return;
    if (element.value) {
      const [lng, lat] = element.value.split(/[, ]/).filter(Boolean).map(Number.parseFloat);
      if (Number.isFinite(lng) && Number.isFinite(lat)) {
        this.widgetConfig.center = { lng, lat };
        this.notifyConfigUpdate();
      }
    } else {
      this.widgetConfig.center = undefined;
      this.notifyConfigUpdate();
    }
  }

  onGeoJsonToggle(event) {
    this.widgetConfig.showGeoJson = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  onAssetTypeSelect(event) {
    if (this.widgetConfig.assetType !== event.detail) {
      Object.assign(this.widgetConfig, {
        attributeName: undefined,
        assetIds: [],
        showLabels: false,
        showUnits: false,
        boolColors: { type: 'boolean', false: '#ef5350', true: '#4caf50' },
        textColors: [['example1', '#4caf50'], ['example2', '#ff9800']],
        thresholds: [[0, '#4caf50'], [75, '#ff9800'], [90, '#ef5350']],
        assetType: event.detail,
      });
      this.notifyConfigUpdate();
    }
  }

  onAssetAllOfTypeSwitch(event) {
    this.widgetConfig.allOfType = event.detail;
    this.notifyConfigUpdate();
  }

  onAssetIdsSelect(event) {
    this.widgetConfig.assetIds = event.detail;
    this.notifyConfigUpdate();
  }

  async onAttributeNameSelect(event) {
    const attrName = event.detail[0];
    if (this.widgetConfig.attributeName === attrName) return;
    this.widgetConfig.attributeName = attrName;
    if (attrName) {
      try {
        const ids = this.widgetConfig.allOfType ? undefined : this.widgetConfig.assetIds;
        const assets = await this.queryAssets({
          types: [this.widgetConfig.assetType], ids, select: { attributes: [attrName, 'location'] },
        });
        const first = assets[0]?.attributes?.[attrName];
        if (!first?.type) throw new TypeError("Data does not contain property 'attributes' or 'type'.");
        this.widgetConfig.assetIds = ids?.length ? assets.map(asset => asset.id) : [];
        this.widgetConfig.valueType = first.type;
      } catch (error) {
        console.error(error);
        showSnackbar(undefined, error instanceof TypeError ? 'noAttributesToShow' : 'errorOccurred');
      }
    }
    this.notifyConfigUpdate();
  }

  onShowLabelsToggle(event) {
    this.widgetConfig.showLabels = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  onShowUnitsToggle(event) {
    this.widgetConfig.showUnits = event.currentTarget.checked;
    this.notifyConfigUpdate();
  }

  onThresholdsChange(event) {
    this.widgetConfig.thresholds = event.detail;
    this.notifyConfigUpdate();
  }

  onBoolColorsChange(event) {
    this.widgetConfig.boolColors = event.detail;
    this.notifyConfigUpdate();
  }

  onTextColorsChange(event) {
    this.widgetConfig.textColors = event.detail;
    this.notifyConfigUpdate();
  }
}

customElements.define('map-settings', MapSettings);
