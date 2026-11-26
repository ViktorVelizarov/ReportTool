/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/util/or-widget.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { OrElement } from '../../kit/or-element.js';

/*
 * A WidgetManifest describes a widget type to the builder:
 *
 *   displayName, displayIcon          shown in the widget browser (the icon is a Material Design icon name)
 *   minColumnWidth, minColumnHeight   the smallest size of the widget, in grid cells
 *   defaultColumnWidth/Height         the size a new widget gets, in grid cells (OpenRemote uses 2x2 for all)
 *   minPixelWidth, minPixelHeight     below this size the widget says it is too small
 *   getContentHtml(config)            the OrWidget element that shows the widget
 *   getSettingsHtml(config)           the WidgetSettings element that changes the config
 *   getDefaultConfig()                the config of a new widget
 */

/**
 * The class every widget extends. The widget gets its configuration (widgetConfig) and shows itself in render();
 * refreshContent(force) is called when the data should be fetched again.
 */
export class OrWidget extends OrElement {
  static properties = { widgetConfig: { type: Object } };

  constructor(config) {
    super();
    this.widgetConfig = config;
  }

  static getManifest() {
    if (!this.manifest) {
      throw new Error(`No manifest present on ${this.name}`);
    }
    return this.manifest;
  }

  /** Fetches the data of the widget again. Widgets override this. */
  refreshContent(_force) {}

  // getDisplayName(), getEditMode() and getWidgetLocation() are put on the widget by its container.
}
