/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/index.ts), the Insights dashboard builder.
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * The dashboard builder is made of the elements in this folder: or-dashboard-preview (the grid), or-dashboard-browser
 * (the widget types to drag onto it), or-dashboard-sidebar (browser, dashboard settings and widget settings),
 * or-dashboard-widgetcontainer (a widget in the grid) and the widgets themselves in widgets/ with their settings in
 * settings/. The page puts them together; see ui/builder.js.
 *
 * Widgets not ported: the attribute input (it writes to an attribute) and the gateway (it opens tunnels); they have no
 * place in a report.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './or-dashboard-preview.js';
import './or-dashboard-sidebar.js';
import { widgetTypes } from './service/widget-registry.js';
import { BarChartWidget } from './widgets/barchart-widget.js';
import { ChartWidget } from './widgets/chart-widget.js';
import { GaugeWidget } from './widgets/gauge-widget.js';
import { ImageWidget } from './widgets/image-widget.js';
import { KpiWidget } from './widgets/kpi-widget.js';
import { MapWidget } from './widgets/map-widget.js';
import { TableWidget } from './widgets/table-widget.js';

/** Registers the widget types, the key is the identifier that is saved with a widget (widgetTypeId). */
export function registerWidgetTypes() {
  widgetTypes.set('barchart', BarChartWidget.getManifest());
  widgetTypes.set('gauge', GaugeWidget.getManifest());
  widgetTypes.set('image', ImageWidget.getManifest());
  widgetTypes.set('kpi', KpiWidget.getManifest());
  widgetTypes.set('linechart', ChartWidget.getManifest());
  widgetTypes.set('map', MapWidget.getManifest());
  widgetTypes.set('table', TableWidget.getManifest());
}
