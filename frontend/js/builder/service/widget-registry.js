/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/index.ts, widgetTypes).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * The widget types: a unique identifier as key and the WidgetManifest of the widget (name, icon, minimum size and the
 * factories for its content and its settings) as value. The widget browser lists them, and the widget service creates
 * widgets from them. See registerWidgetTypes() in index.js for where they are added.
 */
export const widgetTypes = new Map();
