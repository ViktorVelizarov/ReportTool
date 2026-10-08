/** The buttons of a widget while the report is not edited: download its chart as an image, or its data. */

import { downloadsOf, WIDGET_SPECS } from '../builder/service/widget-specs.js';
import { exportFileName } from '../model/exports.js';
import { mockExport } from './export.js';

const TOOLS = {
  png: { label: 'PNG', title: 'Download as an image' },
  csv: { label: 'CSV', title: 'Download the data' },
};

/** toolsFor(widget) for the builder: [{ label, icon, title, onClick }]. */
export function widgetTools(store) {
  return widget => downloadsOf(widget.widgetTypeId).map(kind => ({
    ...TOOLS[kind],
    icon: 'download',
    onClick: () => {
      const { name, asOf } = store.get();
      const title = widget.displayName || WIDGET_SPECS[widget.widgetTypeId].displayName;
      mockExport(exportFileName(`${name} ${title}`, asOf, kind));
    },
  }));
}
