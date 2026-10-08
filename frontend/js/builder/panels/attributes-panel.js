/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/panels/attributes-panel.ts), the list of
 * attributes in the settings of a widget. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, guard, html, map, styleMap, unsafeCSS, when } from 'lit';
import { AssetModelUtil } from '../../data/asset-model.js';
import { AssetService } from '../../data/asset-service.js';
import { getAttributeLabel, sortByString } from '../../data/util.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { OrElement } from '../../kit/or-element.js';
import { getAssetDescriptorIconTemplate } from '../../kit/or-icon.js';
import '../../kit/or-icon.js';
import { showDialog } from '../../kit/dialog.js';
import { OrAssetAttributePicker, OrAssetAttributePickerPickedEvent } from '../../kit/pickers.js';
import { showSnackbar } from '../../kit/snackbar.js';
import { DefaultColor5, style } from '../style.js';

/** Sent when the user clicks an action of an attribute. */
class AttributeActionEvent extends CustomEvent {
  static NAME = 'attribute-action';

  constructor(asset, attributeRef, action) {
    super(AttributeActionEvent.NAME, { bubbles: true, composed: true, detail: { asset, attributeRef, action } });
  }
}

/** Sent when the list of attributes has changed; detail has the loaded assets and the attribute references. */
class AttributesSelectEvent extends CustomEvent {
  static NAME = 'attribute-select';

  constructor(assets, attributeRefs) {
    super(AttributesSelectEvent.NAME, { bubbles: true, composed: true, detail: { assets, attributeRefs } });
  }
}

/** Sent when an attribute is replaced by another one, before the list changes. */
class AttributeReplaceEvent extends CustomEvent {
  static NAME = 'attribute-replace';

  constructor(oldRef, newRef) {
    super(AttributeReplaceEvent.NAME, { bubbles: true, composed: true, detail: { oldRef, newRef } });
  }
}

const styling = css`
  #attribute-list {
    overflow: auto;
    flex: 1 1 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .attribute-list-item {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 0 10px;
    padding: 0;
    min-height: 50px;
  }

  .attribute-list-item-icon {
    display: flex;
    align-items: center;
    --or-icon-width: 20px;
    --or-icon-height: 20px;
    min-height: 50px;
  }

  .attribute-list-item-label {
    display: flex;
    justify-content: center;
    flex: 1 1 0;
    line-height: 16px;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
  }

  .attribute-list-item-label > * {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .attribute-list-item-actions {
    justify-content: end;
    align-items: center;
    display: flex;
    position: absolute;
    visibility: hidden;
    gap: 8px;
  }

  .button-action {
    background: none;
    visibility: hidden;
    color: var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    --or-icon-fill: var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    --or-icon-width: 22px;
    --or-icon-height: 22px;
    display: inline-block;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .attribute-list-item:hover .attribute-list-item-actions {
    visibility: visible;
    position: unset;
    background: white;
    z-index: 1;
  }

  .attribute-list-item:hover .button-action {
    visibility: visible;
  }

  .button-action[disabled] {
    opacity: 0.5;
    cursor: initial;
  }

  .button-action:hover {
    --or-icon-fill: var(--or-icon-fill--hover, var(--or-app-color4));
  }

  .attribute-list-item.broken {
    opacity: 0.7;
  }

  .attribute-list-item.broken .attribute-list-item-label > .broken-label {
    color: var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    font-style: italic;
  }

  .attribute-list-item.broken .attribute-list-item-actions,
  .attribute-list-item.broken .button-action {
    visibility: visible;
    position: unset;
  }
`;

/**
 * The attributes of a widget as a list, with a button to add or replace them and, per attribute, buttons to remove it
 * and the actions that attributeActionCallback gives. A change of attributeRefs is announced with an
 * AttributesSelectEvent.
 */
export class AttributesPanel extends OrElement {
  static properties = {
    attributeRefs: { type: Array },
    multi: { type: Boolean },
    onlyDataAttrs: { type: Boolean },
    attributeFilter: { attribute: false },
    attributeIconCallback: { attribute: false },
    attributeLabelCallback: { attribute: false },
    attributeActionCallback: { attribute: false },
    loadedAssets: { state: true },
    _assetsLoading: { state: true },
  };

  static styles = [styling, style];

  constructor() {
    super();
    this.attributeRefs = [];
    this.multi = false;
    this.onlyDataAttrs = false;
    this.loadedAssets = [];
    this._assetsLoading = false;
  }

  // Lit lifecycle method to compute values during update
  willUpdate(changedProps) {
    super.willUpdate(changedProps);

    if (!this.attributeRefs) {
      this.attributeRefs = [];
    }
    if (changedProps.has('attributeRefs') && this.attributeRefs) {
      this._assetsLoading = true;
      this.loadAssets()
        .then(assets => {
          // Only dispatch event when it CHANGED, so not from 'undefined' to [];
          if (changedProps.get('attributeRefs')) {
            this.dispatchEvent(new AttributesSelectEvent(assets, this.attributeRefs));
          }
        })
        .finally(() => {
          this._assetsLoading = false;
        });
    }
  }

  getLoadedAsset(attrRef) {
    return this.loadedAssets?.find(
      asset => asset.id === attrRef.id && attrRef.name && asset.attributes?.[attrRef.name] !== undefined);
  }

  removeWidgetAttribute(attributeRef) {
    if (this.attributeRefs != null) {
      this.attributeRefs = this.attributeRefs.filter(ref => ref !== attributeRef);
    }
  }

  replaceWidgetAttribute(oldRef) {
    const dialog = showDialog(
      new OrAssetAttributePicker()
        .setMultiSelect(false)
        .setShowOnlyDatapointAttrs(this.onlyDataAttrs)
        .setAttributeFilter(this.attributeFilter));
    dialog.addEventListener(OrAssetAttributePickerPickedEvent.NAME, event => {
      const newRef = event.detail?.[0];
      if (!newRef) return;
      const index = this.attributeRefs.findIndex(ref => ref.id === oldRef.id && ref.name === oldRef.name);
      if (index < 0) return;
      // Guard against creating a duplicate reference.
      if (this.attributeRefs.some(ref => ref.id === newRef.id && ref.name === newRef.name)) {
        showSnackbar(undefined, 'dashboard.attributeAlreadyAdded');
        return;
      }
      // Notify listeners first so they can migrate per-attribute config (colors, axis, ...) before the list change
      // propagates as a regular attribute-select event.
      this.dispatchEvent(new AttributeReplaceEvent(oldRef, newRef));
      const updated = [...this.attributeRefs];
      updated[index] = newRef;
      this.attributeRefs = updated;
    });
  }

  async loadAssets() {
    if (this.attributeRefs.some(ref => !this.getLoadedAsset(ref))) {
      const assets = await this.fetchAssets(this.attributeRefs);
      this.loadedAssets = assets;
      return assets;
    }
    return this.loadedAssets;
  }

  // Fetching the assets according to the AttributeRef[] input in DashboardWidget if required.
  async fetchAssets(attributeRefs = []) {
    try {
      return await AssetService.queryAssets({
        ids: attributeRefs.map(ref => ref.id),
        select: { attributes: attributeRefs.map(ref => ref.name) },
      });
    } catch (reason) {
      console.error(reason);
      showSnackbar(undefined, 'errorOccurred');
      return [];
    }
  }

  onAttributeActionClick(asset, attributeRef, action) {
    this.dispatchEvent(new AttributeActionEvent(asset, attributeRef, action));
  }

  openAttributeSelector(attributeRefs, multi, onlyDataAttrs = true, attributeFilter = undefined) {
    const picker = new OrAssetAttributePicker()
      .setMultiSelect(multi)
      .setShowOnlyDatapointAttrs(onlyDataAttrs)
      .setAttributeFilter(attributeFilter);
    if (attributeRefs != null) picker.setSelectedAttributes(attributeRefs);
    const dialog = showDialog(picker);
    dialog.addEventListener(OrAssetAttributePickerPickedEvent.NAME, event => {
      this.attributeRefs = event.detail;
    });
  }

  render() {
    return html`
      <div>
        ${when(this.attributeRefs.length > 0, () => html`
          <div id="attribute-list">
            ${guard([this.attributeRefs, this.loadedAssets, this.attributeActionCallback, this.attributeLabelCallback,
              this._assetsLoading], () => html`
              ${map(
                this.attributeRefs
                  .map(attributeRef => {
                    const asset = this.getLoadedAsset(attributeRef);
                    const attribute = asset?.attributes?.[attributeRef.name];
                    const descriptors = AssetModelUtil
                      .getAttributeAndValueDescriptors(asset?.type, attributeRef.name, attribute);
                    const label = getAttributeLabel(attribute, descriptors[0], true);
                    return { asset, attribute, attributeRef, label };
                  })
                  .sort(sortByString(item => item.label || item.attributeRef.name || '')),
                ({ asset, attribute, attributeRef, label }) => {
                  if (asset && attribute && attributeRef && label) {
                    const descriptor = AssetModelUtil.getAssetDescriptor(asset.type);
                    return html`
                      <div class="attribute-list-item">
                        <div class="attribute-list-item-icon">
                          ${when(!!this.attributeIconCallback,
                            () => this.attributeIconCallback(asset, attribute, descriptor),
                            () => html`<span>${getAssetDescriptorIconTemplate(descriptor)}</span>`)}
                        </div>
                        <div class="attribute-list-item-label">
                          ${when(!!this.attributeLabelCallback,
                            () => this.attributeLabelCallback(asset, attribute, label),
                            () => html`<span>${asset.name}</span><span style="color:grey;">${label}</span>`)}
                        </div>
                        ${this.getAttributeActionsTemplate(asset, attributeRef)}
                      </div>`;
                  }
                  // Reference points to an attribute that no longer resolves.
                  if (!this._assetsLoading && attributeRef) {
                    return html`
                      <div class="attribute-list-item broken">
                        <div class="attribute-list-item-icon"><or-icon icon="link-variant-off"></or-icon></div>
                        <div class="attribute-list-item-label">
                          <or-translate class="broken-label" value="brokenReference"></or-translate>
                          <span style="color:grey;">${attributeRef.name ?? ''}</span>
                        </div>
                        ${this.getBrokenAttributeActionsTemplate(attributeRef)}
                      </div>`;
                  }
                  return undefined;
                })}`)}
          </div>`,
          () => html`
            <span style="padding: 14px 0; display: block;">
              <or-translate value="noAttributesConnected"></or-translate>
            </span>`)}

        <!-- Button that opens attribute selection -->
        <or-vaadin-button style="margin-top: 8px;"
          @click=${() =>
            this.openAttributeSelector(this.attributeRefs, this.multi, this.onlyDataAttrs, this.attributeFilter)}>
          <or-icon slot="prefix" icon=${this.multi || this.attributeRefs.length === 0 ? 'plus' : 'swap-horizontal'}
            style="--or-icon-width: 20px; --or-icon-height: 20px"></or-icon>
          <or-translate value="attribute"></or-translate>
        </or-vaadin-button>
      </div>
    `;
  }

  getAttributeActionsTemplate(asset, attributeRef) {
    return html`
      <div class="attribute-list-item-actions">
        <!-- Custom actions defined by callback -->
        ${when(!!this.attributeActionCallback, () => this.attributeActionCallback(attributeRef)
          .map(action => this.getAttributeActionTemplate(action, asset, attributeRef)))}
        <!-- Remove attribute button -->
        <button class="button-action" title=${i18next.t('delete')}
          @click=${() => this.removeWidgetAttribute(attributeRef)}>
          <or-icon icon="close-circle"></or-icon>
        </button>
      </div>
    `;
  }

  getBrokenAttributeActionsTemplate(attributeRef) {
    return html`
      <div class="attribute-list-item-actions">
        <button class="button-action" title=${i18next.t('dashboard.replaceAttribute')}
          @click=${() => this.replaceWidgetAttribute(attributeRef)}>
          <or-icon icon="swap-horizontal"></or-icon>
        </button>
        <button class="button-action" title=${i18next.t('delete')}
          @click=${() => this.removeWidgetAttribute(attributeRef)}>
          <or-icon icon="close-circle"></or-icon>
        </button>
      </div>
    `;
  }

  getAttributeActionTemplate(action, asset, attributeRef) {
    const styles = styleMap({
      '--or-icon-fill': action.active ? (action.color ?? 'inherit') : 'inherit',
      '--or-icon-fill--hover': action.color ?? 'unset',
    });
    return html`
      <button class="button-action" .disabled=${action.disabled} title=${action.tooltip} style=${styles}
        @click=${() => this.onAttributeActionClick(asset, attributeRef, action)}>
        <or-icon icon=${action.icon}></or-icon>
      </button>
    `;
  }
}

customElements.define('attributes-panel', AttributesPanel);
