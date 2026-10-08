/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/util/widget-settings.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { OrElement } from '../../kit/or-element.js';
import { style } from '../style.js';

/** Sent by the settings of a widget when its config has changed; detail is the config. */
export class WidgetSettingsChangedEvent extends CustomEvent {
  static NAME = 'settings-changed';

  constructor(widgetConfig) {
    super(WidgetSettingsChangedEvent.NAME, { bubbles: true, composed: true, detail: widgetConfig });
  }
}

/**
 * The class the settings of every widget extend. A settings element changes its widgetConfig and calls
 * notifyConfigUpdate(), which tells the builder through a WidgetSettingsChangedEvent.
 */
export class WidgetSettings extends OrElement {
  static properties = { widgetConfig: {} };

  static styles = [style];

  constructor(config) {
    super();
    this.widgetConfig = config;
  }

  // Lit lifecycle for "on every update" which triggers on every property/state change
  willUpdate(changedProps) {
    if (changedProps.has('widgetConfig') && this.widgetConfig) {
      this.dispatchEvent(new WidgetSettingsChangedEvent(this.widgetConfig));
    }
  }

  notifyConfigUpdate() {
    this.requestUpdate('widgetConfig');
  }

  // getDisplayName(), setDisplayName(name), getEditMode() and getWidgetLocation() are put on the settings by the
  // element that shows them.
}
