/**
 * <or-icon icon="chart-line"> shows a Material Design icon, sized and coloured with the same CSS variables as
 * OpenRemote's or-icon (--or-icon-width, --or-icon-height, --or-icon-fill).
 */

import { css, html, LitElement, nothing } from 'lit';
import MDI from './mdi-icons.js';

export class OrIcon extends LitElement {
  static properties = { icon: { type: String, reflect: true } };

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: text-bottom;
      color: var(--or-icon-fill, currentColor);
      fill: var(--or-icon-fill, currentColor);
      line-height: 1;
    }

    :host([hidden]) {
      display: none;
    }

    svg {
      display: block;
      pointer-events: none;
      width: var(--or-icon-width, 24px);
      height: var(--or-icon-height, 24px);
    }
  `;

  render() {
    const path = MDI[this.icon];
    return path ? html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>` : nothing;
  }
}

customElements.define('or-icon', OrIcon);

/**
 * The icon of an asset type in the colour of the type (or the given colour, a hex colour without the #). A type whose
 * icon is not one of those that the page has gets the icon of an unknown type.
 */
export function getAssetDescriptorIconTemplate(descriptor, colour) {
  const hex = colour ?? descriptor?.colour;
  return html`<or-icon
    icon=${MDI[descriptor?.icon] ? descriptor.icon : 'selection-ellipse'}
    style=${hex ? `--or-icon-fill: #${hex}` : ''}
  ></or-icon>`;
}
