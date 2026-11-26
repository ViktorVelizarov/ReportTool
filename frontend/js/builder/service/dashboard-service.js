/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/service/dashboard-service.ts), the part that
 * makes the template of a new dashboard. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateUniqueUUID } from '../../data/util.js';
import { DashboardScalingPreset } from '../util/screen-presets.js';

export const DashboardService = {
  /** The template of an empty dashboard for desktop screens: 12 columns, and one column on a mobile screen. */
  newTemplate(id = generateUniqueUUID()) {
    return {
      id,
      columns: 12,
      maxScreenWidth: 4000,
      screenPresets: [{
        id: 'mobile',
        displayName: 'dashboard.size.mobile',
        breakpoint: 640,
        scalingPreset: DashboardScalingPreset.WRAP_TO_SINGLE_COLUMN,
      }],
      widgets: [],
    };
  },
};
