/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/widgets/image-widget.ts): an image, with the
 * values of attributes placed on it as markers. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, nothing } from 'lit';
import { AssetModelUtil } from '../../data/asset-model.js';
import { getAttributeValueAsString } from '../../data/util.js';
import { ImageSettings } from '../settings/image-settings.js';
import { WIDGET_SPECS } from '../service/widget-specs.js';
import { OrAssetWidget } from '../util/or-asset-widget.js';

export class ImageWidget extends OrAssetWidget {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    #img-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }

    #img-container {
      position: relative;
      max-height: 100%;
    }

    #img-content {
      display: block;
      height: 100%;
      max-height: 100%;
      max-width: 100%;
    }

    .overlay {
      position: absolute;
      z-index: 3;
      transform: translate(-50%, -50%);
      color: var(--or-app-color2, #f9f9f9);
      background-color: var(--or-app-color3, #4c4c4c);
      border-radius: 15px;
      padding: 3px 8px 5px 8px;
      white-space: nowrap;
      font-size: 13px;
    }
  `;

  static manifest = {
    ...WIDGET_SPECS.image,
    getContentHtml: config => new ImageWidget(config),
    getSettingsHtml: config => new ImageSettings(config),
  };

  constructor(config) {
    super(config);
    this._token = 0;
  }

  refreshContent() {
    this.loadAssets();
  }

  willUpdate(changedProps) {
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      const missing = this.widgetConfig.attributeRefs?.filter(ref => !this.isAttributeRefLoaded(ref));
      if (missing.length > 0) this.loadAssets();
    }
    return super.willUpdate(changedProps);
  }

  async loadAssets() {
    const token = ++this._token;
    const assets = await this.fetchAssets(this.widgetConfig.attributeRefs);
    if (token === this._token) this.loadedAssets = assets;
  }

  /** The values placed on the image. */
  markerTemplates() {
    const { attributeRefs, markers } = this.widgetConfig;
    return attributeRefs.map(ref => {
      const marker = markers.find(item => item.attributeRef.id === ref.id && item.attributeRef.name === ref.name);
      const asset = this.loadedAssets.find(item => item.id === ref.id);
      if (!marker || !asset) return nothing;
      const attribute = asset.attributes?.[ref.name];
      const descriptor = AssetModelUtil.getAttributeDescriptor(ref.name, asset.type);
      const value = getAttributeValueAsString(attribute, descriptor, true, '-');
      const [left, top] = marker.coordinates;
      return html`<span class="overlay" style="left: ${left}%; top: ${top}%;">${value}</span>`;
    });
  }

  render() {
    const { imagePath } = this.widgetConfig;
    return html`
      <div id="img-wrapper">
        ${imagePath
          ? html`
            <div id="img-container">
              <img id="img-content" src=${imagePath} alt="" />
              <div>${this.markerTemplates()}</div>
            </div>`
          : html`<span><or-translate value="dashboard.noImageSelected"></or-translate></span>`}
      </div>
    `;
  }
}

customElements.define('image-widget', ImageWidget);
