/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/table-widget.ts): a table with a row
 * per asset of a type and a column per chosen attribute, with sorting and pages. Original: Copyright 2026, OpenRemote
 * Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * The table is OpenRemote's or-mwc-table, from vendor/or-mwc.js: it shows its pages only when there are more rows than
 * the smallest page size.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html } from 'lit';
import '../../../vendor/or-mwc.js';
import { AssetModelUtil, NUMERIC_VALUE_TYPES } from '../../data/asset-model.js';
import { getAttributeLabel, getAttributeValueAsString } from '../../data/util.js';
import { i18next } from '../../kit/i18n.js';
import { TableSettings } from '../settings/table-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';

/** On paper only the count of the rows of a page stays: the select and the buttons of the pager are no use there. */
const PAPER = new CSSStyleSheet();
PAPER.replaceSync(`
  @media print {
    .mdc-data-table__pagination-rows-per-page,
    .mdc-data-table__pagination-button {
      display: none;
    }
  }
`);

export class TableWidget extends OrAssetWidget {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    #widget-wrapper {
      height: 100%;
      overflow: hidden;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.table,
    getContentHtml: config => new TableWidget(config),
    getSettingsHtml: config => new TableSettings(config),
  };

  constructor(config) {
    super(config);
    this._token = 0;
  }

  refreshContent() {
    this.loadAssets();
  }

  // Lit Lifecycle
  willUpdate(changedProps) {
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this.loadAssets();
    }
    return super.willUpdate(changedProps);
  }

  async firstUpdated() {
    const { shadowRoot } = this.renderRoot.querySelector('or-mwc-table');
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, PAPER];
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

  /** The asset name and the chosen attributes, as the columns of the table. */
  getColumns(attributeNames) {
    const reference = this.loadedAssets[0];
    const { assetType } = this.widgetConfig;
    const attributeColumns = attributeNames.map(name => {
      const attribute = reference?.attributes?.[name];
      const descriptor = AssetModelUtil.getAttributeDescriptor(name, assetType);
      return {
        title: attribute ? getAttributeLabel(attribute, descriptor, true) : name,
        isSortable: true,
        isNumeric: NUMERIC_VALUE_TYPES.includes(attribute?.type),
      };
    });
    return [{ title: i18next.t('assetName'), isSortable: true }, ...attributeColumns];
  }

  /** The rows: the asset name, then the value of every attribute, as a number if it is one. */
  getRows(attributeNames) {
    return this.loadedAssets.map(asset => ({
      content: [
        asset.name,
        ...attributeNames.map(name => {
          const attribute = asset.attributes?.[name];
          if (!attribute) return 'N.A.';
          if (attribute.value == null) return '-';
          const descriptor = AssetModelUtil.getAttributeDescriptor(name, asset.type);
          const text = getAttributeValueAsString(attribute, descriptor, false);
          return Number.isNaN(Number(text)) ? text : Number(text);
        }),
      ],
    }));
  }

  render() {
    const { attributeNames, tableOptions, tableSize } = this.widgetConfig;
    const tableConfig = { fullHeight: true, pagination: { enable: true, options: tableOptions } };
    return html`
      <div id="widget-wrapper">
        <or-mwc-table
          .columns=${this.getColumns(attributeNames)}
          .rows=${this.getRows(attributeNames)}
          .config=${tableConfig}
          .paginationSize=${tableSize}
        ></or-mwc-table>
      </div>
    `;
  }
}

customElements.define('table-widget', TableWidget);
