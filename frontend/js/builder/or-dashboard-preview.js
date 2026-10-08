/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-preview.ts), the grid of the
 * Insights dashboard builder. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * Differences: the page is always full width (the preview sizes for phones and tablets are not ported), the grid grows
 * with its widgets instead of scrolling, it shows a hint when it is empty, and it can be printed. toolsFor(widget)
 * gives the tool buttons a widget shows in its header outside edit mode.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, guard, html, repeat, unsafeCSS, when } from 'lit';
import gridcss from '../../vendor/gridstack-css.js';
import '../kit/i18n.js';
import { OrElement } from '../kit/or-element.js';
import '../kit/inputs.js';
import { OrDashboardEngine } from './or-dashboard-engine.js';
import './or-dashboard-widgetcontainer.js';
import { OrDashboardWidgetContainer } from './or-dashboard-widgetcontainer.js';
import { WidgetService } from './service/widget-service.js';
import { style, DefaultColor4, DefaultColor5 } from './style.js';
import { DashboardScalingPreset, getActivePreset } from './util/screen-presets.js';

const GridStack = window.GridStack;

const editorStyling = css`
  :host {
    height: auto;
  }

  .maingridContainer__fullscreen {
    width: 100%;
  }

  .maingrid__fullscreen {
    border: none;
    background: transparent;
    border-radius: 0;
    overflow: visible;
    height: auto !important;
    width: 100% !important;
    padding: 0;
    position: relative;
    z-index: 0;
  }

  .grid-stack-item-content {
    background: white;
    box-sizing: border-box;
    border: 1px solid var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    border-radius: 4px;
  }

  .grid-stack > .grid-stack-item > .grid-stack-item-content {
    overflow: visible;
  }

  .grid-stack-item-content__active {
    border: 2px solid var(--or-app-color4, ${unsafeCSS(DefaultColor4)});
    margin: -1px !important; /* to compromise with the extra pixel of border. */
  }

  .grid-stack-item > .ui-resizable-handle {
    opacity: 0.4;
  }

  /* Grid lines on the background of the grid; the grid has room to drop a widget when it is empty */
  .grid-element {
    min-height: 420px !important;
    background-image:
      linear-gradient(90deg, #e0e0e0, transparent 1px), linear-gradient(90deg, transparent calc(100% - 1px), #e0e0e0),
      linear-gradient(#e0e0e0, transparent 1px), linear-gradient(transparent calc(100% - 1px), #e0e0e0 100%);
  }

  #empty-hint {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 15px;
    text-align: center;
    pointer-events: none;
  }

  /* A printed report has no grid lines */
  @media print {
    .grid-element {
      background-image: none;
    }
  }
`;

const REDRAW_DELAY_MS = 200;
const POLL_MS = 100;

export class OrDashboardPreview extends OrElement {
  static properties = {
    template: { attribute: false, noAccessor: true },
    selectedWidget: { type: Object },
    editMode: { type: Boolean },
    readonly: { type: Boolean },
    toolsFor: { attribute: false },
    latestChanges: { state: true }, // the changes of the template, saved temporarily for comparison with incoming data
    activePreset: { state: true },
    rerenderActive: { state: true },
    isLoading: { state: true },
  };

  static styles = [unsafeCSS(gridcss), style, editorStyling];

  constructor() {
    super();
    this._template = undefined;
    this.selectedWidget = undefined;
    this.editMode = false;
    this.readonly = true;
    this.toolsFor = undefined;
    this.latestChanges = undefined;
    this.activePreset = undefined;
    this.rerenderActive = false;
    this.isLoading = false;
    this.grid = undefined;
    this.latestDragWidgetStart = undefined;
    this.resizeObserver = undefined;
    this.previousObserverEntry = undefined;

    // Register custom override functions for GridStack
    GridStack.registerEngine(OrDashboardEngine);
  }

  get template() {
    return this._template;
  }

  // Monitoring the changes in the template, saving the changes to latestChanges, so we can check afterwards which
  // changes are made.
  set template(newValue) {
    const currentValue = this._template;
    if (JSON.stringify(currentValue) === JSON.stringify(newValue)) return;
    if (currentValue !== undefined && newValue !== undefined) {
      this.latestChanges = {
        changedKeys: Object.keys(newValue).filter(key =>
          JSON.stringify(newValue[key]) !== JSON.stringify(currentValue[key])),
        oldValue: currentValue,
        newValue,
      };
      this._template = JSON.parse(JSON.stringify(newValue));
      this.requestUpdate('template', currentValue);
    } else if (newValue !== undefined) {
      // If there is no value yet, do initial setup
      this._template = JSON.parse(JSON.stringify(newValue));
      this.requestUpdate('template', currentValue);
      this.setupGrid(false, false);
    }
  }

  // Checking whether actual changes have been made; if not, prevent updating.
  shouldUpdate(changedProperties) {
    if (changedProperties.has('latestChanges') && this.latestChanges?.changedKeys.length === 0
      && JSON.stringify(changedProperties.get('latestChanges')?.oldValue)
        === JSON.stringify(changedProperties.get('latestChanges')?.newValue)) {
      changedProperties.delete('latestChanges');
    }
    return changedProperties.size === 0 ? false : super.shouldUpdate(changedProperties);
  }

  // Main method for executing actions after property changes
  updated(changedProperties) {
    super.updated(changedProperties);

    // If changes to the template have been made
    if (changedProperties.has('latestChanges') && this.latestChanges) {
      this.processTemplateChanges(this.latestChanges);
      this.latestChanges = undefined;
    }

    if (changedProperties.has('selectedWidget')) {
      if (this.selectedWidget) {
        if (changedProperties.get('selectedWidget') !== undefined) {
          // if previous selected state was a different widget, dispatch event as well
          this.dispatchEvent(new CustomEvent('deselected', { detail: changedProperties.get('selectedWidget') }));
        }
        if (this.grid?.el != null) {
          const foundItem = this.grid.getGridItems()
            .find(item => item.gridstackNode?.id === this.selectedWidget?.gridItem?.id);
          if (foundItem != null) {
            this.selectGridItem(foundItem);
          }
          this.dispatchEvent(new CustomEvent('selected', { detail: this.selectedWidget }));
        }
      } else {
        // Checking whether the mainGrid is not destroyed and there are Items to deselect...
        if (this.grid?.el != undefined && this.grid.getGridItems() != null) {
          this.deselectGridItems(this.grid.getGridItems());
        }
        this.dispatchEvent(new CustomEvent('deselected', { detail: changedProperties.get('selectedWidget') }));
      }
    }

    // Switching edit/view mode needs recreation of Grid
    if (changedProperties.has('editMode') && changedProperties.get('editMode') !== undefined) {
      this.setupGrid(true, true);
    }

    // When parent component requests a forced rerender
    if (changedProperties.has('rerenderActive') && this.rerenderActive) {
      this.rerenderActive = false;
    }
  }

  // Main setup Grid method (often used)
  async setupGrid(recreate, force = false) {
    this.isLoading = true;
    await this.updateComplete;
    let gridElement = this.shadowRoot?.getElementById('gridElement');
    if (gridElement != null) {
      if (recreate && this.grid != null) {
        this.grid.destroy(false);

        if (force) {
          // Fully rerender the grid by switching rerenderActive on and off, and continue after that.
          this.rerenderActive = true;
          await this.updateComplete;
          await this.waitUntil(() => !this.rerenderActive);
          gridElement = this.shadowRoot?.getElementById('gridElement');
          this.grid = undefined;
        }
      }
      const width = this.clientWidth;
      const newPreset = getActivePreset(width, this.template.screenPresets);
      if (newPreset?.scalingPreset !== this.activePreset?.scalingPreset && !(recreate && force)) {
        // Fully rerender the grid by switching rerenderActive on and off, and continue after that.
        if (!recreate) {
          // If not destroyed yet, destroy first.
          this.grid?.destroy(false);
        }
        this.rerenderActive = true;
        await this.updateComplete;
        await this.waitUntil(() => !this.rerenderActive);
        gridElement = this.shadowRoot?.getElementById('gridElement');
        this.grid = undefined;
      }
      this.activePreset = newPreset;

      // If grid got reset, setup the ResizeObserver again.
      if (this.grid == null) {
        this.setupResizeObserver(this.shadowRoot?.querySelector('.maingrid'));
      }

      gridElement.style.maxWidth = this.template.maxScreenWidth + 'px';

      const wrap = this.activePreset?.scalingPreset === DashboardScalingPreset.WRAP_TO_SINGLE_COLUMN;
      this.grid = GridStack.init(
        {
          acceptWidgets: this.editMode,
          animate: true,
          cellHeight: wrap ? width / (this.template?.columns ? this.template.columns / 4 : 2) : 'initial',
          column: this.template?.columns,
          columnOpts: wrap
            ? { breakpoints: [{ w: this.activePreset?.breakpoint ?? 768, c: 1 }], columnMax: this.template?.columns }
            : undefined,
          draggable: {
            appendTo: 'parent', // Required to work, seems to be Shadow DOM related.
          },
          float: true,
          margin: 5,
          resizable: {
            handles: 'all',
          },
          staticGrid: wrap ? true : !this.editMode,
          styleInHead: false,
        },
        gridElement,
      );

      gridElement.style.backgroundSize = `${this.grid.cellWidth()}px ${this.grid.getCellHeight()}px`;

      // When an item gets dropped ontop of the grid. GridStack docs say:
      // "called when an item has been dropped and accepted over a grid. If the item came from another grid, the
      // previous widget node info will also be sent (but dom item long gone)."
      this.grid.on('dropped', (event, prevWidget, newWidget) => this.onWidgetDrop(event, prevWidget, newWidget));
      this.grid.on('change', (_event, items) => {
        if (this.template != null && this.template.widgets != null) {
          items.forEach(node => {
            const foundWidget = this.template?.widgets?.find(widget => widget.gridItem?.id === node.id);
            if (foundWidget) {
              foundWidget.gridItem.x = node.x;
              foundWidget.gridItem.y = node.y;
              foundWidget.gridItem.w = node.w;
              foundWidget.gridItem.h = node.h;
            }
          });
          this.dispatchEvent(new CustomEvent('changed', { detail: { template: this.template } }));
        }
      });
      this.grid.on('resizestart', () => {
        this.latestDragWidgetStart = new Date();
      });
      this.grid.on('resizestop', () => {
        setTimeout(() => {
          this.latestDragWidgetStart = undefined;
        }, REDRAW_DELAY_MS);
      });
    }
    this.isLoading = false;
  }

  refreshPreview() {
    this.setupGrid(true, true);
  }

  refreshWidgets(force = false) {
    this.grid?.getGridItems().forEach(gridItem => {
      gridItem.querySelector(OrDashboardWidgetContainer.tagName)?.refreshContent(force);
    });
  }

  selectGridItem(gridItem) {
    if (this.grid != null) {
      this.deselectGridItems(this.grid.getGridItems()); // deselecting all other items
      gridItem.querySelectorAll('.grid-stack-item-content').forEach(item => {
        item.classList.add('grid-stack-item-content__active'); // Apply active CSS class
      });
    }
  }

  deselectGridItem(gridItem) {
    gridItem.querySelectorAll('.grid-stack-item-content').forEach(item => {
      item.classList.remove('grid-stack-item-content__active'); // Remove active CSS class
    });
  }

  deselectGridItems(gridItems) {
    gridItems.forEach(item => this.deselectGridItem(item));
  }

  onGridItemClick(gridItem) {
    if (!this.latestDragWidgetStart && !this.grid?.opts.staticGrid) {
      if (!gridItem) {
        this.selectedWidget = undefined;
      } else if (this.selectedWidget?.gridItem?.id !== gridItem.id) {
        this.selectedWidget = this.template?.widgets?.find(widget => widget.gridItem?.id === gridItem.id);
      }
    }
  }

  isPreviewVisible() {
    return !this.isLoading && this.activePreset?.scalingPreset !== DashboardScalingPreset.BLOCK_DEVICE;
  }

  render() {
    try {
      // to correct the list of gridItems each render (Hopefully temporarily since it's quite compute heavy)
      if (this.grid?.el && this.grid.getGridItems()) {
        this.grid.getGridItems().forEach(gridItem => {
          if (this.template?.widgets?.find(widget => widget.id === gridItem.id) === undefined) {
            this.grid.removeWidget(gridItem);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }

    return html`
      <div id="buildingArea" style="display: flex; flex-direction: column; height: 100%; position: relative;"
        @click=${event => {
          if (event.composedPath()[1]?.id === 'buildingArea') this.onGridItemClick(undefined);
        }}>
        ${this.rerenderActive
          ? html`
            <div id="container" style="justify-content: center; align-items: center;">
              <span><or-translate value="dashboard.renderingGrid"></or-translate></span>
            </div>`
          : html`
            <div id="container" style="justify-content: center; position: relative;">
              ${when(this.isLoading, () => html`
                <div style="position: absolute; z-index: 3; height: 100%; display: flex; align-items: center;">
                  <or-loading-indicator></or-loading-indicator>
                </div>`)}
              ${when(this.editMode && !this.template?.widgets?.length, () => html`
                <div id="empty-hint"><span><or-translate value="report.dropWidgetsHere"></or-translate></span></div>`)}
              <!-- The grid itself. Will also show during isLoading, but will be invisible through CSS -->
              <div class="maingridContainer__fullscreen" style=${this.isLoading ? 'visibility: hidden;' : ''}>
                <div class="maingrid maingrid__fullscreen"
                  style="visibility: ${this.isPreviewVisible() ? 'visible' : 'hidden'};"
                  @click=${event => {
                    if (event.composedPath()[0]?.id === 'gridElement') this.onGridItemClick(undefined);
                  }}>
                  ${guard([this.editMode, this.template], () => html`
                    <!-- Gridstack element on which the Grid will be rendered -->
                    <div id="gridElement" class="grid-stack ${this.editMode ? 'grid-element' : ''}"
                      style="margin: auto;">
                      ${this.template?.widgets
                        ? repeat(this.template.widgets, item => item.id, widget => html`
                          <div class="grid-stack-item" id=${widget.id}
                            gs-id=${widget.gridItem?.id}
                            gs-x=${widget.gridItem?.x}
                            gs-y=${widget.gridItem?.y}
                            gs-w=${widget.gridItem?.w}
                            gs-h=${widget.gridItem?.h}
                            gs-min-w=${widget.gridItem?.minW}
                            gs-min-h=${widget.gridItem?.minH}
                            @click=${() => this.onGridItemClick(widget.gridItem)}>
                            <div class="grid-stack-item-content" style="display: flex;">
                              <or-dashboard-widget-container
                                .widget=${widget}
                                .editMode=${this.editMode}
                                .tools=${this.toolsFor?.(widget)}
                                style="width: 100%; height: auto; border-radius: 4px;"
                              ></or-dashboard-widget-container>
                            </div>
                          </div>`)
                        : undefined}
                    </div>`)}
                </div>
              </div>
            </div>`}
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  // Triggering a Grid rerender on every time the element resizes. Debounced, to limit the amount of rerenders.
  setupResizeObserver(element) {
    this.resizeObserver?.disconnect();
    let timer;
    this.resizeObserver = new ResizeObserver(entries => {
      clearTimeout(timer);
      timer = setTimeout(() => this.resizeObserverCallback(entries), REDRAW_DELAY_MS);
    });
    this.resizeObserver.observe(element);
    return this.resizeObserver;
  }

  resizeObserverCallback(entries) {
    requestAnimationFrame(() => {
      if (`${this.previousObserverEntry?.contentRect.width}px` !== `${entries[0].contentRect.width}px`) {
        this.onGridResize();
      }
      this.previousObserverEntry = entries[0];
    });
  }

  onGridResize() {
    this.setupGrid(true, false);
  }

  processTemplateChanges(changes) {
    // If only columns property changed, change columns through the framework and then recreate grid.
    if (changes.changedKeys.length === 1 && changes.changedKeys.includes('columns') && this.grid) {
      this.grid.column(changes.newValue.columns);
      const gridElement = this.shadowRoot?.getElementById('gridElement');
      gridElement.style.backgroundSize = `${this.grid.cellWidth()}px ${this.grid.getCellHeight()}px`;
      this.setupGrid(true, false);
    } else if (changes.changedKeys.length > 1) {
      // If multiple properties changed, just force rerender all of it.
      this.setupGrid(true, true);
    } else if (changes.changedKeys.includes('widgets')) {
      // On widgets change, check whether they are programmatically added to GridStack. If not, adding them.
      if (this.grid?.el != null) {
        let amountAdded = 0;
        this.grid.getGridItems().forEach(gridElement => {
          if (!gridElement.classList.contains('ui-draggable')) {
            this.grid.makeWidget(gridElement);
            amountAdded++;
          }
        });
        // If a widget is added, update the grid. (for example to update dashboard height)
        if (amountAdded > 0) {
          this.setupGrid(false, false);
        }
      }
    } else if (changes.changedKeys.includes('screenPresets')) {
      this.setupGrid(true, true);
    }
  }

  // Wait until function that waits until a boolean returns differently
  waitUntil(conditionFunction) {
    const poll = resolve => {
      if (conditionFunction()) resolve();
      else setTimeout(() => poll(resolve), POLL_MS);
    };
    return new Promise(poll);
  }

  // Callback method for GridStack Grid 'dropped' event. GridStack docs say:
  // called when an item has been dropped and accepted over a grid. If the item came from another grid, the previous
  // widget node info will also be sent (but dom item long gone).
  onWidgetDrop(_event, _prevWidget, newWidget) {
    // When a "Widget Card" gets dropped onto the grid, we create a new widget on those coordinates.
    if (this.grid && newWidget) {
      this.grid.removeWidget(newWidget.el, true, false); // Removes dragged widget first
      WidgetService.placeNew(newWidget.widgetTypeId, newWidget.x, newWidget.y).then(widget => {
        this.dispatchEvent(new CustomEvent('created', { detail: widget }));
      });
    }
  }
}

customElements.define('or-dashboard-preview', OrDashboardPreview);
