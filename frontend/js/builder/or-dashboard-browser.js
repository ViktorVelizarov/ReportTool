/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-browser.ts), the list of widget
 * types that can be dragged onto the dashboard. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, repeat, unsafeCSS, when } from 'lit';
import gridcss from '../../vendor/gridstack-css.js';
import { OrElement } from '../kit/or-element.js';
import '../kit/or-icon.js';
import { widgetTypes } from './service/widget-registry.js';
import { style } from './style.js';

const GridStack = window.GridStack;

const browserStyling = css`
  #sidebar {
    display: grid;
    padding: 16px;
  }

  #sidebarElement,
  #sidebarBgElement {
    grid-column: 1;
    grid-row: 1;
  }

  .grid-stack-item {
    cursor: grab;
  }

  .sidebarItem {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-sizing: border-box;
    flex-direction: column;
    font-size: 14px;
    --or-icon-width: 36px;
    --or-icon-height: 36px;
  }

  .itemText {
    margin-top: 10px;
  }
`;

/**
 * Lists the widget types as cards in a grid of its own. A card can be dragged onto the dashboard's grid, which accepts
 * it as a new widget. Behind the grid sits a second, static one with the same cards, so a card seems to stay in place
 * while a copy of it is dragged away.
 */
export class OrDashboardBrowser extends OrElement {
  static properties = {
    columns: { type: Number },
    size: { type: Number },
    itemSize: { type: Number },
    sidebarGrid: { state: true },
    backgroundGrid: { state: true },
    items: { state: true },
  };

  static styles = [unsafeCSS(gridcss), browserStyling, style];

  constructor() {
    super();
    this.columns = 4;
    this.size = 2;
    this.itemSize = 134;
    this.sidebarGrid = undefined;
    this.backgroundGrid = undefined;
    this.items = new Map(widgetTypes);
    this.sidebarHeight = this.getSidebarHeight(this.columns);
  }

  updated(changedProps) {
    // Apply widgetTypeId to identify what 'card' is linked to what widget type
    this.sidebarGrid?.getGridItems()?.forEach(item => {
      if (item.gridstackNode) item.gridstackNode.widgetTypeId = item.getAttribute('gs-id') ?? item.id;
    });
    return super.updated(changedProps);
  }

  firstUpdated(changedProps) {
    this.renderGrid();
    return super.firstUpdated(changedProps);
  }

  renderGrid() {
    if (this.sidebarGrid !== undefined) {
      this.sidebarGrid.destroy(false);
    }
    this.sidebarGrid = GridStack.init(
      {
        acceptWidgets: false,
        animate: false,
        column: this.columns,
        cellHeight: this.itemSize / (this.columns / this.size),
        disableResize: true,
        removable: false,
        draggable: { appendTo: 'parent' },
        margin: 8,
        row: this.sidebarHeight,
      },
      this.renderRoot.querySelector('#sidebarElement'),
    );

    // If an item gets dropped on the main grid, the dragged item needs to be reset to the sidebar.
    // This is done by removing the Widget type from the list, waiting for a Lit lifecycle, and adding it back again.
    // Unfortunately, this is required due to HTML elements having to be rendered before it can "initialize the grid")
    this.sidebarGrid.on('removed', (_event, items) => {
      const originalItems = new Map(this.items);
      items.map(item => item.widgetTypeId).forEach(typeId => this.items.delete(typeId));
      this.items = new Map(this.items);
      this.updateComplete.then(() => {
        this.items = originalItems;
        this.updateComplete.then(() => this.renderGrid());
      });
    });

    // Separate Static Background grid (to make it look like the items duplicate)
    if (this.backgroundGrid !== undefined) {
      this.backgroundGrid.destroy(false);
    }
    this.backgroundGrid = GridStack.init(
      {
        acceptWidgets: false,
        animate: false,
        staticGrid: true,
        column: this.columns,
        cellHeight: this.itemSize / (this.columns / this.size),
        margin: 8,
      },
      this.renderRoot.querySelector('#sidebarBgElement'),
    );
  }

  render() {
    return html`
      <div id="sidebar">
        <div id="sidebarElement" class="grid-stack" style="width: 100%; z-index: 3;">
          ${repeat(this.items, ([type]) => type, ([type, manifest]) =>
            this.getSidebarItemTemplate(type, type, manifest))}
          ${when(this.items.size % 2 !== 0, () => this.getEmptyItemTemplate())}
        </div>
        <div id="sidebarBgElement" class="grid-stack" style="width: 100%; z-index: 2">
          ${repeat(this.items, ([type]) => type, ([type, manifest]) =>
            this.getSidebarItemTemplate(`bg-${type}`, type, manifest))}
          ${when(this.items.size % 2 !== 0, () => this.getEmptyItemTemplate())}
        </div>
      </div>
    `;
  }

  getSidebarItemTemplate(id, type, manifest) {
    return html`
      <div class="grid-stack-item" id=${id} gs-id=${type} gs-w=${this.size} gs-h=${this.size} gs-locked="true">
        <div class="grid-stack-item-content sidebarItem">
          <or-icon icon=${manifest.displayIcon}></or-icon>
          <span class="itemText">${manifest.displayName}</span>
        </div>
      </div>
    `;
  }

  getEmptyItemTemplate() {
    return html`
      <div class="grid-stack-item" gs-id="empty" gs-w=${this.size} gs-h=${this.size} gs-locked="true"
        gs-no-move="true" style="cursor: default;">
        <div class="grid-stack-item-content"></div>
      </div>
    `;
  }

  getSidebarHeight(columns = this.columns, size = this.size) {
    let sidebarHeight = Math.ceil((widgetTypes.size / (columns / size)) * size);
    if (sidebarHeight % size !== 0) {
      // If sidebarHeight is based on nr of widgets in array & is not even add 1
      sidebarHeight++;
    }
    return sidebarHeight;
  }
}

customElements.define('or-dashboard-browser', OrDashboardBrowser);
