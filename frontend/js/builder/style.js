/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/style.ts), the Insights dashboard builder.
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, unsafeCSS } from 'lit';

// The default colours of the OpenRemote theme (@openremote/core, defaults.ts).
const DefaultColor1 = '#FFFFFF'; // Surface
export const DefaultColor4 = '#4d9d2a'; // Primary
export const DefaultColor5 = '#CCCCCC'; // Borders and lines

export const style = css`
  :host {
    --internal-or-asset-tree-header-color:
      var(--or-asset-tree-header-color, var(--or-app-color4, ${unsafeCSS(DefaultColor4)}));
    --internal-or-asset-tree-header-text-color:
      var(--or-asset-tree-header-text-color, var(--or-app-color7, ${unsafeCSS(DefaultColor1)}));
    --internal-or-asset-tree-header-height: var(--or-asset-tree-header-height, 48px);
    --internal-or-asset-tree-background-color:
      var(--or-asset-tree-background-color, var(--or-app-color1, ${unsafeCSS(DefaultColor1)}));

    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: var(--internal-or-asset-tree-background-color);
  }

  #container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  #menu-header {
    background-color: var(--internal-or-asset-tree-header-color);
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--internal-or-asset-tree-header-height);
    border-bottom: 1px solid var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    z-index: 3;
    line-height: var(--internal-or-asset-tree-header-height);
    color: var(--internal-or-asset-tree-header-text-color);
    --or-icon-fill: var(--internal-or-asset-tree-header-text-color);
  }

  #title-container {
    flex: 1;
    flex-direction: row;
    text-transform: capitalize;
    padding-left: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #title {
    font-weight: 500;
    font-size: 16px;
  }

  .panel-title {
    text-transform: uppercase;
    font-weight: bolder;
    line-height: 1em;
    flex: 0 0 auto;
  }
`;
