/**
 * <or-icon icon="chart-line"> shows a Material Design icon, sized and coloured with the same CSS variables as
 * OpenRemote's or-icon (--or-icon-width, --or-icon-height, --or-icon-fill). As in OpenRemote the name can have the set
 * in front: "mdi:close" is the icon "close", and "or:trash" is the red trash can of OpenRemote's own icons.
 */

import { css, html, LitElement, nothing, svg } from 'lit';
import MDI from './mdi-icons.js';

/** The icons that OpenRemote draws itself (the set "or"), with the colours they have. */
const OR_ICONS = {
  trash: svg`
    <path d="M6 9V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V9" stroke="#E21D12" stroke-width="2"/>
    <path d="M14 11L14 16" stroke="#E21D12" stroke-width="2" stroke-linecap="round"/>
    <path d="M10 11V16" stroke="#E21D12" stroke-width="2" stroke-linecap="round"/>
    <path d="M5 6H8.5H19" stroke="#E21D12" stroke-width="2" stroke-linecap="round"/>
    <path fill="#E21D12" d="M8.09516 4.02871L7 6H17L15.9048 4.02871C15.5521 3.39378 14.8829 3 14.1565 3H9.84347C9.11714
      3 8.4479 3.39378 8.09516 4.02871Z"/>`,
};

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
    const [set, name] = this.icon?.includes(':') ? this.icon.split(':') : ['mdi', this.icon];
    const drawing = set === 'or' ? OR_ICONS[name] : MDI[name] && svg`<path d=${MDI[name]}></path>`;
    return drawing ? html`<svg viewBox="0 0 24 24" aria-hidden="true">${drawing}</svg>` : nothing;
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
