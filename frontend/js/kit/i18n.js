/**
 * <or-translate value="key"></or-translate> shows the text of a key, as OpenRemote's element of that name does. The
 * texts, and the i18next that the ported code asks for them with, are in texts.js, which needs no browser; they are
 * also exported from here for the code of the page.
 */

import { html, LitElement } from 'lit';
import { i18next } from './texts.js';

export { i18next };

export class OrTranslate extends LitElement {
  static properties = { value: { type: String } };

  createRenderRoot() {
    return this; // no shadow root: the text takes the style of where it is put, and it can be slotted
  }

  render() {
    return html`${i18next.t(this.value ?? '')}`;
  }
}

customElements.define('or-translate', OrTranslate);
