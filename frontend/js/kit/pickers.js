/**
 * The two dialogs the settings panels open to link a widget to assets: OrAssetAttributePicker to choose attributes of
 * assets, OrAssetSelector to choose assets of a type. They are used the way OpenRemote's dialogs of the same names are:
 * configure with the set... methods, show with showDialog, and listen for the picked event on the dialog.
 */

import { css, html, nothing, ref } from 'lit';
import { AssetModelUtil } from '../data/asset-model.js';
import { AssetService } from '../data/asset-service.js';
import { getAttributeLabel, resolveUnits, sortByString } from '../data/util.js';
import { OrMwcDialog } from './dialog.js';
import { i18next } from './i18n.js';
import { OrElement } from './or-element.js';
import { getAssetDescriptorIconTemplate } from './or-icon.js';
import { showSnackbar } from './snackbar.js';
import './inputs.js';

/** The assets of the query. A failure is reported to the user and gives no assets. */
async function loadAssets(query) {
  try {
    return await AssetService.queryAssets(query);
  } catch (error) {
    console.error(error);
    showSnackbar(undefined, 'errorOccurred');
    return [];
  }
}

const sharedStyles = css`
  :host {
    display: block;
    width: min(720px, 80vw);
    font-size: 14px;
  }

  .search {
    margin-bottom: 8px;
  }

  .list {
    box-sizing: border-box;
    height: 320px;
    overflow: auto;
    border: 1px solid #dde3ea;
    border-radius: 6px;
  }

  .type {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: #f7f9fb;
    border-bottom: 1px solid #eef1f4;
    font-weight: 600;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    border: 0;
    border-bottom: 1px solid #f0f2f4;
    background: none;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .row:hover {
    background: #f7f9fb;
  }

  .row.active {
    background: #eef6e9;
    font-weight: 600;
  }

  .empty {
    padding: 16px;
    color: #6b7280;
  }

  .units {
    margin-left: auto;
    padding: 1px 8px;
    border-radius: 10px;
    background: #eef6e9;
    color: #2c5e17;
    font-size: 12px;
  }
`;

const refKey = ref => `${ref.id}\u0000${ref.name}`;

/* ---- attributes of assets ---- */

export class OrAssetAttributePickerPickedEvent extends CustomEvent {
  static NAME = 'or-asset-attribute-picker-picked';

  constructor(attributeRefs) {
    super(OrAssetAttributePickerPickedEvent.NAME, { detail: attributeRefs, bubbles: true, composed: true });
  }
}

class AssetAttributePickerContent extends OrElement {
  static properties = {
    multi: { type: Boolean },
    onlyDataAttrs: { type: Boolean },
    attributeFilter: { attribute: false },
    selected: { attribute: false },
    _assets: { state: true },
    _activeId: { state: true },
    _search: { state: true },
  };

  static styles = [sharedStyles, css`
    .panes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-height: 28px;
      margin-top: 10px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 4px 2px 10px;
      border-radius: 12px;
      background: #eef6e9;
      font-size: 13px;
    }

    .chip button {
      display: inline-flex;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;
      --or-icon-width: 16px;
      --or-icon-height: 16px;
    }
  `];

  constructor() {
    super();
    this.multi = false;
    this.onlyDataAttrs = false;
    this.attributeFilter = undefined;
    this.selected = [];
    this._assets = undefined;
    this._activeId = undefined;
    this._search = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    this._assets = await loadAssets();
    this._activeId = this.selected[0]?.id ?? this._assets[0]?.id;
  }

  /** The attributes of an asset that can be chosen. */
  _choosable(asset) {
    return Object.values(asset.attributes).filter(attribute =>
      (!this.onlyDataAttrs || attribute.meta?.storeDataPoints)
      && (!this.attributeFilter || this.attributeFilter(attribute)));
  }

  _isSelected(assetId, name) {
    return this.selected.some(ref => ref.id === assetId && ref.name === name);
  }

  _toggle(asset, attribute) {
    const ref = { id: asset.id, name: attribute.name };
    if (this._isSelected(asset.id, attribute.name)) {
      this._remove(ref);
    } else {
      this.selected = this.multi ? [...this.selected, ref] : [ref];
    }
  }

  _remove(ref) {
    this.selected = this.selected.filter(item => refKey(item) !== refKey(ref));
  }

  _typeGroups() {
    const query = this._search.trim().toLowerCase();
    const matches = (asset, descriptor) =>
      !query || asset.name.toLowerCase().includes(query) || descriptor.label.toLowerCase().includes(query);
    return AssetModelUtil.getAssetDescriptors()
      .map(descriptor => ({
        descriptor,
        assets: this._assets
          .filter(asset => asset.type === descriptor.name && this._choosable(asset).length)
          .filter(asset => matches(asset, descriptor)),
      }))
      .filter(group => group.assets.length)
      .sort(sortByString(group => group.descriptor.label));
  }

  /** The attributes of the asset that is open, to choose from. */
  _attributesTemplate(asset) {
    if (!asset) return html`<div class="empty">${i18next.t('noAttributesToShow')}</div>`;
    const label = attribute => getAttributeLabel(attribute, undefined, false);
    return this._choosable(asset).sort(sortByString(label)).map(attribute => html`
      <label class="row">
        <input type=${this.multi ? 'checkbox' : 'radio'} name="attribute"
          .checked=${this._isSelected(asset.id, attribute.name)} @change=${() => this._toggle(asset, attribute)} />
        <span>${label(attribute)}</span>
        ${attribute.meta?.units ? html`<span class="units">${resolveUnits(attribute.meta.units)}</span>` : nothing}
      </label>`);
  }

  render() {
    if (!this._assets) return html`<or-loading-indicator></or-loading-indicator>`;
    const active = this._assets.find(asset => asset.id === this._activeId);
    const chosen = this.selected.map(ref => {
      const asset = this._assets.find(item => item.id === ref.id);
      const label = getAttributeLabel(asset?.attributes[ref.name], undefined, false);
      return { ref, text: `${asset?.name} · ${label}` };
    });
    return html`
      <or-vaadin-text-field class="search" placeholder=${i18next.t('search')} .value=${this._search}
        @input=${event => { this._search = event.target.value; }}></or-vaadin-text-field>
      <div class="panes">
        <div class="list" role="tree">
          ${this._typeGroups().map(({ descriptor, assets }) => html`
            <div class="type">${getAssetDescriptorIconTemplate(descriptor)}<span>${descriptor.label}</span></div>
            ${assets.map(asset => html`
              <button class="row ${asset.id === this._activeId ? 'active' : ''}"
                @click=${() => { this._activeId = asset.id; }}>${asset.name}</button>`)}`)}
        </div>
        <div class="list" role="group">${this._attributesTemplate(active)}</div>
      </div>
      <div class="chips">
        ${chosen.map(({ ref, text }) => html`
          <span class="chip">${text}
            <button title=${i18next.t('delete')} @click=${() => this._remove(ref)}>
              <or-icon icon="close-circle"></or-icon>
            </button>
          </span>`)}
      </div>
    `;
  }
}

customElements.define('or-asset-attribute-picker-content', AssetAttributePickerContent);

export class OrAssetAttributePicker extends OrMwcDialog {
  constructor() {
    super();
    this._multi = false;
    this._selected = [];
    this._onlyDataAttrs = false;
    this._filter = undefined;
    this._content = undefined;
    this.setHeading(i18next.t('selectAttribute'));
    this.setContent(() => this._renderContent());
    this.setActions([
      { default: true, actionName: 'cancel', content: 'cancel' },
      {
        actionName: 'ok',
        content: 'ok',
        action: () => {
          const refs = this._content?.selected ?? [];
          if (refs.length) this.dispatchEvent(new OrAssetAttributePickerPickedEvent(refs));
        },
      },
    ]);
  }

  setMultiSelect(multi) {
    this._multi = multi;
    return this;
  }

  setSelectedAttributes(refs) {
    this._selected = refs ?? [];
    return this;
  }

  setShowOnlyDatapointAttrs(onlyDataAttrs) {
    this._onlyDataAttrs = onlyDataAttrs;
    return this;
  }

  setAttributeFilter(filter) {
    this._filter = filter;
    return this;
  }

  _renderContent() {
    return html`<or-asset-attribute-picker-content
      .multi=${this._multi}
      .onlyDataAttrs=${this._onlyDataAttrs}
      .attributeFilter=${this._filter}
      .selected=${this._selected}
      ${ref(element => { this._content = element; })}
    ></or-asset-attribute-picker-content>`;
  }
}

/* ---- assets of a type ---- */

export class OrAssetSelectorPickedEvent extends CustomEvent {
  static NAME = 'or-asset-selector-picked';

  constructor(assetIds) {
    super(OrAssetSelectorPickedEvent.NAME, { detail: assetIds, bubbles: true, composed: true });
  }
}

class AssetSelectorContent extends OrElement {
  static properties = {
    assetType: { type: String },
    multi: { type: Boolean },
    selected: { attribute: false },
    _assets: { state: true },
  };

  static styles = sharedStyles;

  constructor() {
    super();
    this.multi = true;
    this.selected = [];
    this._assets = undefined;
  }

  async connectedCallback() {
    super.connectedCallback();
    this._assets = await loadAssets({ types: [this.assetType], select: { attributes: [] } });
  }

  _toggle(asset) {
    if (this.selected.includes(asset.id)) this.selected = this.selected.filter(id => id !== asset.id);
    else this.selected = this.multi ? [...this.selected, asset.id] : [asset.id];
  }

  render() {
    if (!this._assets) return html`<or-loading-indicator></or-loading-indicator>`;
    return html`
      <div class="list">
        ${this._assets.length ? this._assets.map(asset => html`
          <label class="row">
            <input type=${this.multi ? 'checkbox' : 'radio'} name="asset" .checked=${this.selected.includes(asset.id)}
              @change=${() => this._toggle(asset)} />
            <span>${asset.name}</span>
          </label>`) : html`<div class="empty">${i18next.t('report.noAssetsOfType')}</div>`}
      </div>
    `;
  }
}

customElements.define('or-asset-selector-content', AssetSelectorContent);

export class OrAssetSelector extends OrMwcDialog {
  constructor(assetType, selectedIds = [], multi = true) {
    super();
    this._content = undefined;
    this.setHeading(i18next.t('linkedAssets'));
    this.setContent(() => html`<or-asset-selector-content
      .assetType=${assetType} .multi=${multi} .selected=${selectedIds}
      ${ref(element => { this._content = element; })}></or-asset-selector-content>`);
    this.setActions([
      { default: true, actionName: 'cancel', content: 'cancel' },
      {
        actionName: 'ok',
        content: 'ok',
        action: () => this.dispatchEvent(new OrAssetSelectorPickedEvent(this._content?.selected ?? selectedIds)),
      },
    ]);
  }
}
