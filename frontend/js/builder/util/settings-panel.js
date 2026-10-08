/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/util/settings-panel.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { classMap, css, html, when } from 'lit';
import '../../kit/i18n.js';
import '../../kit/or-icon.js';
import { OrElement } from '../../kit/or-element.js';
import { style } from '../style.js';

const styling = css`
  :host {
    height: auto !important;
  }

  #panel-wrapper {
    border-bottom: 1px solid #e0e0e0;
  }

  #panel-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 12px;
    gap: 8px;
  }

  #panel-title {
    line-height: 100%;
    font-weight: 700;
  }

  .panel-content {
    padding: 0 16px;
    max-height: 0;
    overflow: hidden;
    transition:
      max-height 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s,
      visibility 0s 0.2s;
  }

  .panel-content--expanded {
    max-height: 100vh;
    overflow: visible;
    transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  }
`;

/** A collapsible section of the settings of a widget. displayName is the text key of its title. */
export class SettingsPanel extends OrElement {
  static properties = {
    expanded: { type: Boolean },
    displayName: { type: String },
  };

  static styles = [styling, style];

  constructor() {
    super();
    this.expanded = false;
  }

  toggle(state) {
    this.expanded = state || !this.expanded;
  }

  render() {
    return html`
      <div id="panel-wrapper">
        <div id="panel-header" @click=${() => this.toggle()}>
          <div id="panel-chevron">
            <or-icon icon=${this.expanded ? 'chevron-down' : 'chevron-right'}></or-icon>
          </div>
          ${when(this.displayName, () => html`
            <div id="panel-title"><span><or-translate value=${this.displayName}></or-translate></span></div>`)}
        </div>
        <div class=${classMap({ 'panel-content': true, 'panel-content--expanded': this.expanded })}>
          <div style="padding-bottom: 16px;"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

customElements.define('settings-panel', SettingsPanel);
