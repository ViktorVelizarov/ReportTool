/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/table-widget.ts): a table with a row
 * per asset of a type and a column per chosen attribute, with sorting and pages. Original: Copyright 2026, OpenRemote
 * Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * The table is drawn here; OpenRemote's is its or-mwc-table.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, nothing } from 'lit';
import { AssetModelUtil, NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import { getAttributeLabel, getAttributeValueAsString } from '../../data/util.js';
import { i18next } from '../../kit/i18n.js';
import '../../kit/or-icon.js';
import { TableSettings } from '../settings/table-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';

/** The icon of a sorted column, by the direction of the sort. */
const SORT_ICONS = { asc: 'sort-ascending', desc: 'sort-descending' };

export class TableWidget extends OrAssetWidget {
  static properties = {
    _sort: { state: true }, // { column, direction }
    _page: { state: true },
    _pageSize: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    #widget-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    .scroll {
      flex: 1;
      min-height: 0;
      overflow: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    th,
    td {
      padding: 8px 12px;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
      white-space: nowrap;
    }

    th.numeric,
    td.numeric {
      text-align: right;
    }

    th {
      position: sticky;
      top: 0;
      background: #fff;
      font-weight: 600;
    }

    th button {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      --or-icon-width: 16px;
      --or-icon-height: 16px;
    }

    .pagination {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      padding: 6px 4px 0;
      color: #6b7280;
      font-size: 13px;
    }

    .pagination select {
      border: 1px solid #c5cbd2;
      border-radius: 4px;
      background: #fff;
      font: inherit;
    }

    .pagination button {
      display: inline-flex;
      padding: 2px;
      border: 0;
      border-radius: 50%;
      background: none;
      color: inherit;
      cursor: pointer;
    }

    .pagination button:disabled {
      opacity: 0.35;
      cursor: default;
    }

    .empty {
      padding: 16px;
      color: #6b7280;
      text-align: center;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.table,
    getContentHtml: config => new TableWidget(config),
    getSettingsHtml: config => new TableSettings(config),
  };

  constructor(config) {
    super(config);
    this._sort = undefined;
    this._page = 0;
    this._pageSize = config?.tableSize ?? 10;
    this._token = 0;
  }

  refreshContent() {
    this.loadAssets();
  }

  // Lit Lifecycle
  willUpdate(changedProps) {
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this._pageSize = this.widgetConfig.tableSize;
      this._page = 0;
      this.loadAssets();
    }
    return super.willUpdate(changedProps);
  }

  async loadAssets() {
    const { allOfType, assetType, assetIds, attributeNames } = this.widgetConfig;
    const token = ++this._token;
    if (!assetType || (!allOfType && !assetIds?.length)) {
      this.loadedAssets = [];
      return;
    }
    const assets = await this.queryAssets({
      types: [assetType], ids: allOfType ? undefined : assetIds, select: { attributes: attributeNames },
    });
    if (token === this._token) this.loadedAssets = assets;
  }

  /** [{ title, numeric }]: the asset name and the chosen attributes. */
  columns() {
    const reference = this.loadedAssets[0];
    const { assetType, attributeNames } = this.widgetConfig;
    return [
      { title: i18next.t('assetName'), numeric: false },
      ...attributeNames.map(name => {
        const attribute = reference?.attributes?.[name];
        const descriptor = AssetModelUtil.getAttributeDescriptor(name, assetType);
        return {
          title: attribute ? getAttributeLabel(attribute, descriptor, true) : name,
          numeric: NUMERIC_VALUE_TYPES.includes(attribute?.type),
        };
      }),
    ];
  }

  /** The rows: the asset name, then the value of every attribute as text and as the value to sort on. */
  rows() {
    return this.loadedAssets.map(asset => [
      { text: asset.name, sort: asset.name },
      ...this.widgetConfig.attributeNames.map(name => {
        const attribute = asset.attributes?.[name];
        if (!attribute) return { text: 'N.A.', sort: undefined };
        if (attribute.value == null) return { text: '-', sort: undefined };
        const descriptor = AssetModelUtil.getAttributeDescriptor(name, asset.type);
        const text = getAttributeValueAsString(attribute, descriptor, false);
        return { text, sort: typeof attribute.value === 'number' ? attribute.value : text };
      }),
    ]);
  }

  sortRows(rows) {
    if (!this._sort) return rows;
    const { column, direction } = this._sort;
    const factor = direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const x = a[column].sort;
      const y = b[column].sort;
      if (x === y) return 0;
      if (x === undefined) return 1;
      if (y === undefined) return -1;
      return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))) * factor;
    });
  }

  toggleSort(column) {
    this._sort = this._sort?.column === column && this._sort.direction === 'asc'
      ? { column, direction: 'desc' }
      : { column, direction: 'asc' };
  }

  render() {
    const { tableOptions } = this.widgetConfig;
    const columns = this.columns();
    const all = this.sortRows(this.rows());
    const pages = Math.max(1, Math.ceil(all.length / this._pageSize));
    const page = Math.min(this._page, pages - 1);
    const rows = all.slice(page * this._pageSize, (page + 1) * this._pageSize);
    const from = all.length ? page * this._pageSize + 1 : 0;
    const to = Math.min(all.length, (page + 1) * this._pageSize);
    const cell = (value, index) => html`<td class=${columns[index].numeric ? 'numeric' : ''}>${value.text}</td>`;
    return html`
      <div id="widget-wrapper">
        <div class="scroll">
          <table>
            <thead>
              <tr>
                ${columns.map((column, index) => html`
                  <th class=${column.numeric ? 'numeric' : ''}>
                    <button @click=${() => this.toggleSort(index)}>
                      ${column.title}
                      ${this._sort?.column === index
                        ? html`<or-icon icon=${SORT_ICONS[this._sort.direction]}></or-icon>`
                        : nothing}
                    </button>
                  </th>`)}
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => html`
                <tr>${row.map(cell)}</tr>`)}
            </tbody>
          </table>
          ${all.length === 0
            ? html`<div class="empty"><or-translate value="report.noAssetsOfType"></or-translate></div>`
            : nothing}
        </div>
        <div class="pagination">
          ${tableOptions?.length > 1 ? html`
            <span>Rows per page</span>
            <select @change=${event => { this._pageSize = Number(event.target.value); this._page = 0; }}>
              ${tableOptions.map(option => html`
                <option value=${option} ?selected=${option === this._pageSize}>${option}</option>`)}
            </select>` : nothing}
          <span>${i18next.t('report.rowsOfRows', { from, to, total: all.length })}</span>
          <button title="Previous" ?disabled=${page === 0} @click=${() => { this._page = page - 1; }}>
            <or-icon icon="chevron-left"></or-icon>
          </button>
          <button title="Next" ?disabled=${page >= pages - 1} @click=${() => { this._page = page + 1; }}>
            <or-icon icon="chevron-right"></or-icon>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('table-widget', TableWidget);
