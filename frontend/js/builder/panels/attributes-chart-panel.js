/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/panels/attributes-chart-panel.ts), the
 * attributes panel of the chart widgets. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { i18next } from '../../kit/i18n.js';
import { AttributesPanel } from './attributes-panel.js';

/** The attributes panel of the charts: per attribute it can replace the attribute, and it shows a colour picker. */
export class AttributesChartPanel extends AttributesPanel {
  static styles = [...super.styles, css`
    .attribute-list-item:hover {
      padding-bottom: 8px;
    }
  `];

  getAttributeActionsTemplate(asset, attributeRef) {
    return html`
      <div class="attribute-list-item-actions">
        <!-- Replace attribute button -->
        <button class="button-action" title=${i18next.t('dashboard.replaceAttribute')}
          @click=${() => this.replaceWidgetAttribute(attributeRef)}>
          <or-icon icon="swap-horizontal"></or-icon>
        </button>
        <!-- Remove attribute button -->
        <button class="button-action" title=${i18next.t('delete')}
          @click=${() => this.removeWidgetAttribute(attributeRef)}>
          <or-icon icon="close-circle"></or-icon>
        </button>
      </div>
      ${when(!!this.attributeActionCallback, () => html`
        <div class="attribute-list-item-actions" style="margin-left: 18px; justify-content: start;">
          <!-- Custom actions defined by callback -->
          ${this.attributeActionCallback(attributeRef).map(action =>
            this.getAttributeActionTemplate(action, asset, attributeRef))}
        </div>`)}
    `;
  }

  getAttributeActionTemplate(action, asset, attributeRef) {
    // If 'palette', aka 'color palette', show color picker instead.
    if (action.icon === 'palette') {
      return html`
        <div style="position: relative;">
          <input id="chart-color-${attributeRef.id}-${attributeRef.name}" type="color" value=${action.color}
            style="position: absolute; visibility: hidden; height: 24px; width: 24px; padding: 0;" />
          ${super.getAttributeActionTemplate(action, asset, attributeRef)}
        </div>`;
    }
    return super.getAttributeActionTemplate(action, asset, attributeRef);
  }
}

customElements.define('attributes-chart-panel', AttributesChartPanel);
