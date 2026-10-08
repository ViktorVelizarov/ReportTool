/**
 * Makes the template of a report (the DashboardTemplate of OpenRemote) from a short description of its widgets, for the
 * tests. The config of a widget is completed with the default config of its type, as a widget that the builder places
 * is.
 */

import { DashboardService } from '../../js/builder/service/dashboard-service.js';
import { WIDGET_SPECS } from '../../js/builder/service/widget-specs.js';
import { mergeObjects } from '../../js/data/util.js';

/**
 * widgets: [{ type, name, box: [x, y, width, height] in grid cells, config }]. The ids are made from idPrefix, so that
 * the same description always gives the same template.
 */
export function buildTemplate(idPrefix, widgets) {
  const template = DashboardService.newTemplate(idPrefix);
  template.widgets = widgets.map(({ type, name, box: [x, y, w, h], config }, index) => {
    const spec = WIDGET_SPECS[type];
    const id = `${idPrefix}-${index + 1}`;
    return {
      id,
      displayName: name,
      widgetTypeId: type,
      gridItem: {
        id, x, y, w, h,
        minW: spec.minColumnWidth,
        minH: spec.minColumnHeight,
        noResize: false,
        noMove: false,
        locked: false,
      },
      widgetConfig: mergeObjects(spec.getDefaultConfig(), structuredClone(config), false),
    };
  });
  return template;
}

/** An attribute reference: the attribute of an asset. */
export const ref = (id, name) => ({ id, name });
