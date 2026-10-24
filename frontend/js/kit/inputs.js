/**
 * The controls of the settings panels, of the top of the page and of the dialogs. The text, number and select fields,
 * the text area, the toggle, the checkbox and radio button, the button, the multi-select combo box, the menu bar, the
 * badge and the dialogs are OpenRemote's own: or-vaadin-text-field, or-vaadin-select and the others come from the
 * component library, bundled in vendor/or-vaadin.js and styled by vendor/or-theme.css, and the ported panels use them
 * as they are. This file has the two small controls that the library does not have: a loading indicator and a colour
 * input.
 */

import { css, html, live } from 'lit';
import { OrElement } from './or-element.js';
import '../../vendor/or-vaadin.js';

/** A spinner. */
class OrLoadingIndicator extends OrElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      min-height: 32px;
    }

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #e0e0e0;
      border-top-color: var(--or-app-color4, #4d9d2a);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`<div class="spinner" role="progressbar" aria-label="Loading"></div>`;
  }
}

/** A colour swatch that opens the colour picker of the browser; sends or-mwc-input-changed with detail.value. */
class OrColourInput extends OrElement {
  static properties = { value: { type: String } };

  static styles = css`
    :host {
      display: inline-block;
    }

    input {
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid #c5cbd2;
      border-radius: 50%;
      background: none;
      cursor: pointer;
    }

    input::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input::-webkit-color-swatch {
      border: 0;
      border-radius: 50%;
    }
  `;

  _onInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('or-mwc-input-changed', {
      bubbles: true, composed: true, detail: { value: this.value },
    }));
  }

  render() {
    const value = this.value?.startsWith('#') ? this.value : `#${this.value ?? '000000'}`;
    return html`<input type="color" .value=${live(value)} @input=${this._onInput} />`;
  }
}

customElements.define('or-loading-indicator', OrLoadingIndicator);
customElements.define('or-colour-input', OrColourInput);
