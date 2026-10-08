/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-widgetsettings.ts), the settings
 * of the selected widget. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { guard, html, until } from 'lit';
import '../kit/i18n.js';
import '../kit/inputs.js';
import { OrElement } from '../kit/or-element.js';
import './util/settings-panel.js';
import { WidgetService } from './service/widget-service.js';
import { style } from './style.js';
import { WidgetSettingsChangedEvent } from './util/widget-settings.js';

/**
 * Shows the name of the selected widget and the settings element of its type. The settings change the widget in place;
 * "update" is sent after every change, with the changed widget in detail.changes.get("widget").
 */
export class OrDashboardWidgetsettings extends OrElement {
  static properties = {
    selectedWidget: { type: Object },
    settingsElem: { state: true },
  };

  static styles = [style];

  // Method to update the Grid. For example after changing a setting.
  forceParentUpdate(changes, force = false) {
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('update', { detail: { changes, force } }));
  }

  render() {
    return html`
      <div style="padding: 12px; border-bottom: 1px solid #E0E0E0">
        <or-vaadin-text-field
          .value=${this.selectedWidget?.displayName ?? ''}
          required
          minlength="1"
          @change=${event => {
            const element = event.currentTarget;
            if (element.checkValidity()) this.setDisplayName(element.value);
          }}>
          <or-translate slot="label" value="name"></or-translate>
        </or-vaadin-text-field>
      </div>
      <div>
        ${guard([this.selectedWidget], () => html`
          ${until(this.generateContent(this.selectedWidget.widgetTypeId), html`Loading...`)}`)}
      </div>
    `;
  }

  setDisplayName(name) {
    this.selectedWidget.displayName = name;
    this.forceParentUpdate(new Map([['widget', this.selectedWidget]]));
  }

  async generateContent(widgetTypeId) {
    if (!this.settingsElem || this.settingsElem.id !== this.selectedWidget.id) {
      const manifest = WidgetService.getManifest(widgetTypeId);
      this.settingsElem = this.initSettings(manifest);
    }
    return html`${this.settingsElem}`;
  }

  initSettings(manifest) {
    const settingsElem = manifest.getSettingsHtml(this.selectedWidget.widgetConfig);
    settingsElem.id = this.selectedWidget.id;
    settingsElem.getDisplayName = () => this.selectedWidget.displayName;
    settingsElem.setDisplayName = name => this.setDisplayName(name);
    settingsElem.getEditMode = () => true;
    settingsElem.getWidgetLocation = () => ({
      x: this.selectedWidget.gridItem?.x,
      y: this.selectedWidget.gridItem?.y,
      w: this.selectedWidget.gridItem?.w,
      h: this.selectedWidget.gridItem?.h,
    });
    settingsElem.addEventListener(WidgetSettingsChangedEvent.NAME, event => this.onWidgetConfigChange(event));
    return settingsElem;
  }

  onWidgetConfigChange(event) {
    this.selectedWidget.widgetConfig = event.detail;
    this.forceParentUpdate(new Map([['widget', this.selectedWidget]]));
  }
}

customElements.define('or-dashboard-widgetsettings', OrDashboardWidgetsettings);
