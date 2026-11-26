/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-boardsettings.ts), the settings
 * of the dashboard as a whole. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * Not ported: who can access the dashboard and its refresh interval, which have no meaning for a report.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, unsafeHTML } from 'lit';
import { i18next } from '../kit/i18n.js';
import '../kit/inputs.js';
import { OrElement } from '../kit/or-element.js';
import './util/settings-panel.js';
import { style } from './style.js';
import { DashboardScalingPreset, sortScreenPresets } from './util/screen-presets.js';

const scalingPresetToString = scalingPreset =>
  (scalingPreset != null ? i18next.t(`dashboard.presets.${scalingPreset.toLowerCase()}`) : 'undefined');

const boardSettingsStyling = css`
  .label {
    margin-bottom: 4px;
  }
`;

/**
 * The layout settings of the template: number of columns, what to do on a small screen and the maximum width. The
 * template is changed in place, and "update" is sent after every change; detail.force says that the grid must be made
 * again.
 */
export class OrDashboardBoardsettings extends OrElement {
  static properties = { template: { type: Object } };

  static styles = [boardSettingsStyling, style];

  forceParentUpdate(force = false) {
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('update', { detail: { force } }));
  }

  setBreakpoint(presetIndex, value) {
    this.template.screenPresets[presetIndex].breakpoint = value;
    this.forceParentUpdate(true);
  }

  // Button to switch to a mobile preset of layout settings.
  setToMobilePreset() {
    this.template.columns = 4;
    this.template.screenPresets[0].scalingPreset = DashboardScalingPreset.KEEP_LAYOUT;
    this.template.maxScreenWidth = 700;
    this.forceParentUpdate(true);
  }

  scalingPresetTemplate(screenPresets, scalingPresets) {
    return screenPresets.map(preset => html`
      <div style="margin-bottom: ${screenPresets.length > 1 ? '24px' : '16px'}">
        <div class="label">
          ${unsafeHTML(i18next.t('dashboard.onScreenMyBoardShould')
            .replace('{{size}}', `<b>${i18next.t(preset.displayName)}</b>`))}
        </div>
        <or-vaadin-select
          .items=${scalingPresets}
          .value=${preset.scalingPreset}
          @change=${event => {
            preset.scalingPreset = event.currentTarget.value;
            this.forceParentUpdate(true);
          }}></or-vaadin-select>
      </div>`);
  }

  screenPresetTemplate(screenPresets, customLabels) {
    return screenPresets.map((preset, index) => html`
      <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
        <span style="min-width: 140px;">
          ${customLabels ? customLabels[index] : `${preset.displayName} ${i18next.t('screen')}`}
        </span>
        <or-vaadin-number-field
          .value=${String(preset.breakpoint ?? '')}
          min="0"
          style="width: 110px;"
          @change=${event => {
            const element = event.currentTarget;
            if (element.checkValidity()) this.setBreakpoint(screenPresets.indexOf(preset), Number(element.value));
          }}>
          <span slot="prefix">&gt;</span>
          <span slot="suffix">px</span>
        </or-vaadin-number-field>
      </div>`);
  }

  render() {
    if (!this.template?.screenPresets) {
      return html`<div style="padding: 24px;"><span><or-translate value="errorOccurred"></or-translate></span></div>`;
    }
    const screenPresets = sortScreenPresets(this.template.screenPresets, true);
    const scalingPresets = [DashboardScalingPreset.KEEP_LAYOUT, DashboardScalingPreset.WRAP_TO_SINGLE_COLUMN,
      DashboardScalingPreset.BLOCK_DEVICE].map(preset => ({ value: preset, label: scalingPresetToString(preset) }));
    return html`
      <!-- Layout panel, with options such as 'amount of columns' -->
      <settings-panel displayName="layout" expanded>
        <div>
          <div style="margin-bottom: 24px; display: flex; align-items: center;">
            <span style="min-width: 180px;"><or-translate value="dashboard.numberOfColumns"></or-translate></span>
            <or-vaadin-number-field
              .value=${String(this.template.columns)}
              min="1"
              max="24"
              @change=${event => {
                const element = event.currentTarget;
                if (element.checkValidity()) {
                  this.template.columns = Number(element.value);
                  this.forceParentUpdate(true);
                }
              }}></or-vaadin-number-field>
          </div>

          ${screenPresets.length === 1 ? this.scalingPresetTemplate(screenPresets, scalingPresets) : undefined}
          ${screenPresets.length === 1 ? this.screenPresetTemplate(screenPresets, ['Mobile breakpoint']) : undefined}

          <div style="margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
            <span style="min-width: 150px;"><or-translate value="dashboard.maxScreenWidth"></or-translate></span>
            <or-vaadin-number-field
              .value=${String(this.template.maxScreenWidth)}
              min="0"
              style="width: 110px;"
              @change=${event => {
                const element = event.currentTarget;
                if (element.checkValidity()) {
                  this.template.maxScreenWidth = Number(element.value);
                  this.forceParentUpdate(true);
                }
              }}>
              <span slot="suffix">px</span>
            </or-vaadin-number-field>
          </div>

          <!-- "Set to mobile" preset button, for ease of use -->
          <or-vaadin-button @click=${() => this.setToMobilePreset()}>
            <or-translate value="dashboard.setToMobilePreset"></or-translate>
          </or-vaadin-button>
        </div>
      </settings-panel>
    `;
  }
}

customElements.define('or-dashboard-boardsettings', OrDashboardBoardsettings);
