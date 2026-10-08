/*
 * The sidebar of the dashboard builder, after the sidebar in OpenRemote's or-dashboard-builder (src/index.ts,
 * render()): two tabs, "Widgets" with the widget types to drag onto the dashboard and "Settings" with the settings of
 * the dashboard; while a widget is selected, the settings of that widget take their place. Original: Copyright 2026,
 * OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Events: "delete-widget" (detail: the widget), "deselect", "widget-update" (detail: the changed widget) and
 * "board-update" (detail: { template, force }).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, unsafeCSS, when } from 'lit';
import { i18next } from '../kit/i18n.js';
import '../kit/inputs.js';
import { OrElement } from '../kit/or-element.js';
import '../kit/or-icon.js';
import '../kit/tabs.js';
import './or-dashboard-boardsettings.js';
import './or-dashboard-browser.js';
import './or-dashboard-widgetsettings.js';
import { style, DefaultColor5 } from './style.js';

const styling = css`
  :host {
    background: white;
    border-left: 1px solid ${unsafeCSS(DefaultColor5)};
    overflow: hidden auto;
  }

  .settings-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  #sidebar-widget-headeractions {
    flex: 0;
    display: flex;
    flex-direction: row;
    padding-right: 5px;
    --or-icon-fill: white;
  }

  #browser {
    max-width: 300px;
  }

  or-vaadin-button {
    min-height: 36px;
  }
`;

export class OrDashboardSidebar extends OrElement {
  static properties = {
    template: { type: Object },
    selectedWidget: { type: Object },
    sidebarMenuIndex: { state: true },
  };

  static styles = [style, styling];

  constructor() {
    super();
    this.sidebarMenuIndex = 0;
  }

  get tabItems() {
    return [{ name: i18next.t('dashboard.widgets') }, { name: i18next.t('settings') }];
  }

  render() {
    return html`
      ${when(this.selectedWidget, () => html`
        <div class="settings-container">
          <div id="menu-header">
            <div id="title-container">
              <span id="title" title=${this.selectedWidget.displayName}>${this.selectedWidget.displayName}</span>
            </div>
            <div id="sidebar-widget-headeractions">
              <or-vaadin-button theme="icon tertiary" title=${i18next.t('delete')}
                @click=${() => this.dispatchEvent(new CustomEvent('delete-widget', { detail: this.selectedWidget }))}>
                <or-icon icon="delete"></or-icon>
              </or-vaadin-button>
              <or-vaadin-button theme="icon tertiary" title=${i18next.t('deselect')}
                @click=${() => this.dispatchEvent(new CustomEvent('deselect'))}>
                <or-icon icon="close"></or-icon>
              </or-vaadin-button>
            </div>
          </div>
          <div style="flex: 1;">
            <or-dashboard-widgetsettings
              .selectedWidget=${this.selectedWidget}
              @update=${event => this.dispatchEvent(
                new CustomEvent('widget-update', { detail: event.detail.changes.get('widget') }))}
            ></or-dashboard-widgetsettings>
          </div>
        </div>`)}

      <!-- Hidden, not removed, while a widget is selected: the grid of the browser keeps its state -->
      <div class="settings-container" style=${this.selectedWidget ? 'display: none;' : ''}>
        <div style="border-bottom: 1px solid ${unsafeCSS(DefaultColor5)};">
          <or-mwc-tabs .items=${this.tabItems}
            @activated=${event => { this.sidebarMenuIndex = event.detail.index; }}></or-mwc-tabs>
        </div>
        <div style="flex: 1;">
          <or-dashboard-browser id="browser" style=${this.sidebarMenuIndex !== 0 ? 'display: none;' : ''}>
          </or-dashboard-browser>
          <or-dashboard-boardsettings style=${this.sidebarMenuIndex !== 1 ? 'display: none;' : ''}
            .template=${this.template}
            @update=${event => this.dispatchEvent(
              new CustomEvent('board-update', { detail: { template: this.template, force: event.detail.force } }))}
          ></or-dashboard-boardsettings>
        </div>
      </div>
    `;
  }
}

customElements.define('or-dashboard-sidebar', OrDashboardSidebar);
