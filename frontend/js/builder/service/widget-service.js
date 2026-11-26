/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/service/widget-service.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateUniqueUUID, mergeObjects, objectsEqual } from '../../data/util.js';
import { widgetTypes } from './widget-registry.js';

export class WidgetService {
  static getManifest(widgetTypeId) {
    const manifest = widgetTypes.get(widgetTypeId);
    if (!manifest) {
      throw new Error(`Widget manifest could not be found during widget creation. [ID=${widgetTypeId}]`);
    }
    return manifest;
  }

  /** A new widget of a type at a position of the grid, with the default config of the type. */
  static async placeNew(widgetTypeId, x, y) {
    const randomId = generateUniqueUUID();
    const manifest = this.getManifest(widgetTypeId);
    return {
      id: randomId,
      displayName: manifest.displayName,
      gridItem: {
        id: randomId,
        x,
        y,
        w: manifest.defaultColumnWidth ?? 2,
        h: manifest.defaultColumnHeight ?? 2,
        minW: manifest.minColumnWidth,
        minH: manifest.minColumnHeight,
        minPixelW: manifest.minPixelWidth,
        minPixelH: manifest.minPixelHeight,
        noResize: false,
        noMove: false,
        locked: false,
      },
      widgetConfig: manifest.getDefaultConfig(),
      widgetTypeId,
    };
  }

  /**
   * Corrects the config of a widget to the specification of its type: fields that were added since the widget was saved
   * get their default. Gives back the same object when nothing changes, so that nothing is redrawn needlessly.
   */
  static correctToConfigSpec(manifest, widgetConfig) {
    const newConfig = mergeObjects(manifest.getDefaultConfig(), widgetConfig, false);
    return objectsEqual(newConfig, widgetConfig) ? widgetConfig : newConfig;
  }
}
