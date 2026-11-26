/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/settings/image-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { getAttributeLabel } from '../../data/util.js';
import '../../kit/inputs.js';
import '../panels/attributes-panel.js';
import { AssetWidgetSettings } from '../util/or-asset-widget.js';
import '../util/settings-panel.js';

const styling = css`
  #marker-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export class ImageSettings extends AssetWidgetSettings {
  static styles = [...super.styles, styling];

  willUpdate(changedProps) {
    super.willUpdate(changedProps);
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this.updateCoordinateMap(this.widgetConfig);
      this.loadAssets();
    }
  }

  async loadAssets() {
    const missing = this.widgetConfig.attributeRefs.filter(ref => !this.isAttributeRefLoaded(ref));
    if (missing.length > 0) {
      this.loadedAssets = (await this.fetchAssets(this.widgetConfig.attributeRefs)) ?? [];
    }
  }

  render() {
    return html`
      <div>
        <!-- Attributes selector -->
        <settings-panel displayName="attributes" expanded>
          <attributes-panel .attributeRefs=${this.widgetConfig.attributeRefs} multi
            @attribute-select=${event => this.onAttributesSelect(event)}></attributes-panel>
        </settings-panel>

        <!-- Marker coordinates -->
        <settings-panel displayName="dashboard.markerCoordinates" expanded>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${this.draftCoordinateEntries(this.widgetConfig)}
          </div>
        </settings-panel>

        <!-- Image settings -->
        <settings-panel displayName="dashboard.imageSettings" expanded>
          <or-vaadin-text-field .value=${this.widgetConfig.imagePath} placeholder="https://example.com/plan.png"
            @change=${event => this.onImageUrlUpdate(event)}>
            <or-translate slot="label" value="dashboard.imageUrl"></or-translate>
          </or-vaadin-text-field>
        </settings-panel>
      </div>
    `;
  }

  onAttributesSelect(event) {
    this.widgetConfig.attributeRefs = event.detail.attributeRefs;
    this.notifyConfigUpdate();
  }

  onImageUrlUpdate(event) {
    const element = event.currentTarget;
    if (element.checkValidity()) {
      this.widgetConfig.imagePath = element.value;
      this.notifyConfigUpdate();
    }
  }

  // Updates the markers, so that every attribute has one; a new one starts in the middle of the image.
  updateCoordinateMap(config) {
    for (const attributeRef of config.attributeRefs) {
      const known = config.markers.some(
        marker => marker.attributeRef.id === attributeRef.id && marker.attributeRef.name === attributeRef.name);
      if (!known) config.markers.push({ attributeRef, coordinates: [50, 50] });
    }
  }

  draftCoordinateEntries(config) {
    if (config.markers.length === 0 || config.attributeRefs.length === 0) {
      return html`<span><or-translate value="noAttributeConnected"></or-translate></span>`;
    }
    return config.attributeRefs.map(attributeRef => {
      const marker = config.markers.find(
        item => item.attributeRef.id === attributeRef.id && item.attributeRef.name === attributeRef.name);
      if (!marker) return html``;
      const index = config.markers.indexOf(marker);
      const asset = this.loadedAssets?.find(item => item.id === attributeRef.id);
      const attribute = asset?.attributes?.[attributeRef.name];
      const label = asset ? getAttributeLabel(attribute, undefined, false) : undefined;
      return html`
        <div id="marker-container">
          <div style="flex: 1; display: flex; flex-direction: column;">
            <span>${asset?.name}</span>
            ${when(label, () => html`<span style="color: gray;">${label}</span>`)}
          </div>
          <div style="display: flex; gap: 8px;">
            ${[0, 1].map(axis => html`
              <or-vaadin-number-field .value=${String(marker.coordinates[axis])} min="0" max="100"
                style="max-width: 80px;" @change=${event => this.onCoordinateUpdate(index, axis, event)}>
                <span slot="suffix">%</span>
              </or-vaadin-number-field>`)}
          </div>
        </div>`;
    });
  }

  onCoordinateUpdate(index, axis, event) {
    const element = event.currentTarget;
    if (!element.checkValidity()) return;
    const coordinates = this.widgetConfig.markers[index].coordinates ?? [0, 0];
    coordinates[axis] = Number(element.value);
    this.widgetConfig.markers[index].coordinates = coordinates;
    this.notifyConfigUpdate();
  }
}

customElements.define('image-settings', ImageSettings);
