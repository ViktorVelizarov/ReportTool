/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-widgetcontainer.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * Added for the report: tools, buttons for the widget that show in its header while the report is not being edited.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { objectsEqual } from '../data/util.js';
import '../kit/inputs.js';
import { OrElement } from '../kit/or-element.js';
import '../kit/or-icon.js';
import { WidgetService } from './service/widget-service.js';
import { style } from './style.js';

const THROTTLE_MS = 200;

const containerStyle = css`
  :host {
    display: block;
    overflow: hidden;
  }

  .tools {
    display: flex;
    flex: none;
    gap: 2px;
  }

  .tool {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border: 0;
    border-radius: 4px;
    background: none;
    color: #6b7280;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    --or-icon-width: 16px;
    --or-icon-height: 16px;
  }

  .tool:hover {
    background: #eceff1;
    color: #1d2733;
  }
`;

export class OrDashboardWidgetContainer extends OrElement {
  static tagName = 'or-dashboard-widget-container';

  static properties = {
    widget: { attribute: false },
    widgetConfig: { attribute: false }, // optional: overrides widget.widgetConfig, for view-only mode
    editMode: { type: Boolean },
    loading: { type: Boolean },
    tools: { attribute: false }, // [{ label, icon, title, onClick }]
    orWidget: { state: true },
    error: { state: true }, // untranslated error message
  };

  static styles = [style, containerStyle];

  constructor() {
    super();
    this.loading = false;
    this.editMode = false;
    this.manifest = undefined;
    this.resizeObserver = undefined;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  shouldUpdate(changedProps) {
    // Update config if some values in the spec are not set. Useful for when migrations have taken place.
    if (this.widget) {
      const manifest = WidgetService.getManifest(this.widget.widgetTypeId);
      if (this.editMode) {
        this.widget.widgetConfig = WidgetService.correctToConfigSpec(manifest, this.widget.widgetConfig);
      } else {
        this.widgetConfig = WidgetService.correctToConfigSpec(manifest, this.widget.widgetConfig);
      }
    }

    // Only update widget if certain properties of widget has changed.
    // For example, when the 'gridItem' field changes, no update is needed since it doesn't apply here.
    if (changedProps.has('widget') && this.widget) {
      const oldValue = changedProps.get('widget');
      const idChanged = oldValue?.id !== this.widget?.id;
      const nameChanged = oldValue?.displayName !== this.widget?.displayName;
      const configChanged = !objectsEqual(oldValue?.widgetConfig, this.getWidgetConfig());
      if (!(idChanged || nameChanged || configChanged)) {
        changedProps.delete('widget');
      }
    }

    return changedProps.size === 0 ? false : super.shouldUpdate(changedProps);
  }

  willUpdate(changedProps) {
    super.willUpdate(changedProps);

    if (!this.manifest && this.widget) {
      this.manifest = WidgetService.getManifest(this.widget.widgetTypeId);
    }

    // Create widget
    if (changedProps.has('widget') && this.widget) {
      this.initializeWidgetElem(this.manifest, this.getWidgetConfig());
    }
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    const containerElem = this.renderRoot.querySelector('#widget-container');
    if (this.orWidget && containerElem) {
      this.resizeObserver?.disconnect();
      let timer;
      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const minWidth = this.manifest.minPixelWidth || 0;
          const minHeight = this.manifest.minPixelHeight || 0;
          const isMinimumSize = minWidth < containerElem.clientWidth && minHeight < containerElem.clientHeight;
          this.error = isMinimumSize ? undefined : 'dashboard.widgetTooSmall';
        }, THROTTLE_MS);
      });
      this.resizeObserver.observe(containerElem);
    }
  }

  initializeWidgetElem(manifest, config) {
    if (this.orWidget) {
      this.orWidget.remove();
    }
    this.orWidget = manifest.getContentHtml(config);
    this.orWidget.getDisplayName = () => this.widget.displayName;
    this.orWidget.getEditMode = () => this.editMode;
    this.orWidget.getWidgetLocation = () => ({
      x: this.widget.gridItem?.x,
      y: this.widget.gridItem?.y,
      w: this.widget.gridItem?.w,
      h: this.widget.gridItem?.h,
    });
  }

  render() {
    const showHeader = !!this.widget.displayName;
    const tools = !this.editMode ? this.tools ?? [] : [];
    return html`
      <div id="widget-container"
        style="height: calc(100% - 16px); padding: 8px 16px 8px 16px; display: flex; flex-direction: column;">
        <!-- Container title -->
        ${when(showHeader, () => html`
          <div style="flex: 0 0 36px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <span class="panel-title"
              style="min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${this.widget.displayName?.toUpperCase()}
            </span>
            ${when(tools.length, () => html`
              <div class="tools">
                ${tools.map(tool => html`
                  <button class="tool" title=${tool.title} @click=${tool.onClick}>
                    <or-icon icon=${tool.icon}></or-icon>${tool.label}
                  </button>`)}
              </div>`)}
          </div>`)}

        <!-- Content -->
        <div style="flex: 1; max-height: ${showHeader ? 'calc(100% - 36px)' : '100%'}; min-height: 0;">
          ${when(
            !this.error && !this.loading,
            () => html`${this.orWidget}`,
            () => html`<or-translate value=${this.error ? this.error : 'loading'}></or-translate>`)}
        </div>
      </div>
    `;
  }

  refreshContent(force) {
    this.orWidget?.refreshContent(force);
  }

  getWidgetConfig() {
    return this.widgetConfig || this.widget?.widgetConfig;
  }
}

customElements.define(OrDashboardWidgetContainer.tagName, OrDashboardWidgetContainer);
