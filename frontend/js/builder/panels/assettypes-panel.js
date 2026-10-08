/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/panels/assettypes-panel.ts), the choice of an
 * asset type, its assets and attributes in the settings of the table and the map. Original:
 * Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * The asset type is chosen from a drop-down instead of a combo box, and the assets in a dialog with check boxes
 * instead of an asset tree.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { AssetModelUtil } from '../../data/asset-model.js';
import { getAssetTypeLabel, sortByString } from '../../data/util.js';
import { showDialog } from '../../kit/dialog.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/inputs.js';
import { OrElement } from '../../kit/or-element.js';
import { getAssetDescriptorIconTemplate } from '../../kit/or-icon.js';
import { OrAssetSelector, OrAssetSelectorPickedEvent } from '../../kit/pickers.js';

class AssetTypeSelectEvent extends CustomEvent {
  static NAME = 'assettype-select';

  constructor(assetTypeName) {
    super(AssetTypeSelectEvent.NAME, { bubbles: true, composed: true, detail: assetTypeName });
  }
}

class AssetAllOfTypeSwitchEvent extends CustomEvent {
  static NAME = 'alloftype-switch';

  constructor(allOfType) {
    super(AssetAllOfTypeSwitchEvent.NAME, { bubbles: true, composed: true, detail: allOfType });
  }
}

class AssetIdsSelectEvent extends CustomEvent {
  static NAME = 'assetids-select';

  constructor(assetIds) {
    super(AssetIdsSelectEvent.NAME, { bubbles: true, composed: true, detail: assetIds });
  }
}

class AttributeNamesSelectEvent extends CustomEvent {
  static NAME = 'attributenames-select';

  constructor(attributeNames) {
    super(AttributeNamesSelectEvent.NAME, { bubbles: true, composed: true, detail: attributeNames });
  }
}

/*
 * The config of the panel (AssetTypesFilterConfig):
 *   assets:     { enabled, multi, allOfTypeOption }
 *   attributes: { enabled, multi, valueTypes }   (valueTypes limits the attributes to those value types)
 */

/**
 * Asks for an asset type, whether all assets of that type are meant or only some of them (and which), and attributes of
 * the type. Every choice is announced with an event; the events of the first update carry the values the panel was
 * given, so that a settings element that resets its fields on a new type gets them back.
 */
export class AssettypesPanel extends OrElement {
  static properties = {
    assetType: { type: String },
    config: { attribute: false },
    allOfType: { type: Boolean },
    assetIds: { attribute: false }, // either undefined, a single entry, or multi select
    attributeNames: { attribute: false },
    _attributeSelectList: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    .switchMwcInputContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `;

  constructor() {
    super();
    this.config = { attributes: { enabled: true } };
    this.allOfType = false;
    this._attributeSelectList = [];
    this._assetTypes = AssetModelUtil.getAssetDescriptors().filter(type => type.descriptorType === 'asset');
  }

  willUpdate(changedProps) {
    super.willUpdate(changedProps);
    if (changedProps.has('assetType') && this.assetType) {
      this._attributeSelectList = this.getAttributesByType(this.assetType);
      this.dispatchEvent(new AssetTypeSelectEvent(this.assetType));
    }
    if (changedProps.has('allOfType')) {
      this.dispatchEvent(new AssetAllOfTypeSwitchEvent(this.allOfType));
    }
    if (changedProps.has('assetIds') && this.assetIds) {
      this.dispatchEvent(new AssetIdsSelectEvent(this.assetIds));
    }
    if (changedProps.has('attributeNames') && this.attributeNames) {
      this.dispatchEvent(new AttributeNamesSelectEvent(this.attributeNames));
    }
  }

  render() {
    const assetTypeItems = this.mapDescriptors(this._assetTypes);
    const selected = this.assetType ? assetTypeItems.find(item => item.value === this.assetType) : undefined;
    return html`
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <!-- Select asset type -->
        <or-vaadin-select .items=${assetTypeItems} .value=${this.assetType ?? ''} required
          @change=${event => { this.assetType = event.currentTarget.value; }}>
          <span slot="prefix">${getAssetDescriptorIconTemplate(selected?.data)}</span>
          <or-translate slot="label" value="filter.assetTypeLabel"></or-translate>
        </or-vaadin-select>

        <!-- Switch to include all assets of this type  -->
        ${when(this.config.assets?.allOfTypeOption, () => html`
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span><or-translate value="allAssetsofType"></or-translate></span>
            <or-vaadin-toggle ?checked=${this.allOfType} ?disabled=${!this.assetType}
              @change=${event => { this.allOfType = event.currentTarget.checked; }}></or-vaadin-toggle>
          </div>`)}

        <!-- Select one or more assets -->
        ${when(this.config.assets?.enabled, () => {
          const assetIds = typeof this.assetIds === 'string' ? [this.assetIds] : this.assetIds;
          const label = this.allOfType
            ? i18next.t('allAssets')
            : `${assetIds?.length || 0} ${i18next.t('assets')}`;
          return html`
            <or-vaadin-button ?disabled=${!this.assetType || this.allOfType}
              @click=${() => this.openAssetSelector(this.assetType, assetIds, this.config.assets?.multi)}>
              <span>${label}</span>
            </or-vaadin-button>`;
        })}

        <!-- Select one or more attributes -->
        ${when(this.config.attributes?.enabled, () => {
          const options = (this._attributeSelectList ?? []).map(([key, value]) => ({ key, value }));
          const selectedItems = (this.attributeNames ?? []).map(name => options.find(option => option.key === name));
          if (this.config.attributes?.multi) {
            return html`
              <or-vaadin-multi-select-combo-box .items=${options} .selectedItems=${selectedItems}
                item-value-path="key" item-label-path="value" ?disabled=${!this.assetType}
                @change=${event => {
                  this.attributeNames = event.currentTarget.selectedItems.map(item => item.key);
                }}>
                <or-translate slot="label" value="filter.attributeLabel"></or-translate>
              </or-vaadin-multi-select-combo-box>`;
          }
          return html`
            <or-vaadin-select .items=${options.map(option => ({ value: option.key, label: option.value }))}
              .value=${selectedItems[0]?.key ?? ''} ?disabled=${!this.assetType}
              @change=${event => { this.attributeNames = [event.currentTarget.value]; }}>
              <or-translate slot="label" value="filter.attributeLabel"></or-translate>
            </or-vaadin-select>`;
        })}
      </div>
    `;
  }

  mapDescriptors(descriptors) {
    return descriptors
      .map(descriptor => ({ value: descriptor.name, label: getAssetTypeLabel(descriptor), data: descriptor }))
      .sort(sortByString(item => item.label));
  }

  /** [name, label] of the attributes of a type, by label. */
  getAttributesByType(type) {
    const descriptor = AssetModelUtil.getAssetDescriptor(type);
    if (!descriptor) return [];
    const valueTypes = this.config.attributes?.valueTypes;
    return AssetModelUtil.getAssetTypeInfo(descriptor).attributeDescriptors
      .filter(attribute => !valueTypes || valueTypes.includes(attribute.type))
      .map(attribute => [attribute.name, attribute.meta?.label ?? attribute.name])
      .sort(sortByString(item => item[1]));
  }

  openAssetSelector(assetType, assetIds, multi = false) {
    const dialog = showDialog(new OrAssetSelector(assetType, assetIds ?? [], multi));
    dialog.addEventListener(OrAssetSelectorPickedEvent.NAME, event => {
      this.assetIds = multi ? event.detail : event.detail[0];
    });
  }
}

customElements.define('assettypes-panel', AssettypesPanel);
