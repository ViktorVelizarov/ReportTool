/** <or-mwc-tabs>: a row of tabs. items are { name }; "activated" has the index of the chosen tab in detail. */

import { css, html } from 'lit';
import { OrElement } from './or-element.js';

export class OrMwcTabs extends OrElement {
  static properties = {
    items: { attribute: false },
    activeIndex: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
    }

    [role='tablist'] {
      display: flex;
    }

    button {
      flex: 1 1 0;
      min-height: 48px;
      padding: 0 12px;
      border: 0;
      border-bottom: 2px solid transparent;
      background: none;
      color: var(--or-app-color3, #4c4c4c);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
    }

    button:hover {
      background: #f3f4f6;
    }

    button:focus-visible {
      outline: 2px solid var(--or-app-color4, #4d9d2a);
      outline-offset: -2px;
    }

    button[aria-selected='true'] {
      border-bottom-color: var(--or-app-color4, #4d9d2a);
      color: var(--or-app-color4, #4d9d2a);
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.activeIndex = 0;
  }

  _activate(index) {
    this.activeIndex = index;
    this.dispatchEvent(new CustomEvent('activated', { detail: { index }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div role="tablist">
        ${this.items.map((item, index) => html`
          <button role="tab" aria-selected=${String(index === this.activeIndex)} @click=${() => this._activate(index)}>
            ${item.name}
          </button>`)}
      </div>
    `;
  }
}

customElements.define('or-mwc-tabs', OrMwcTabs);
