/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/index.ts): the helpers for the screen
 * presets of a dashboard. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** What a dashboard does on a screen narrower than a breakpoint. */
export const DashboardScalingPreset = {
  KEEP_LAYOUT: 'KEEP_LAYOUT',
  WRAP_TO_SINGLE_COLUMN: 'WRAP_TO_SINGLE_COLUMN',
  BLOCK_DEVICE: 'BLOCK_DEVICE',
  REDIRECT: 'REDIRECT',
};

export function sortScreenPresets(presets, largeToSmall = false) {
  return presets.sort((a, b) => {
    if (a.breakpoint != null && b.breakpoint != null) {
      if (a.breakpoint > b.breakpoint) return largeToSmall ? 1 : -1;
      if (a.breakpoint < b.breakpoint) return largeToSmall ? 1 : -1;
    }
    return 0;
  });
}

/** The preset that applies to a grid of the given width: the one with the smallest breakpoint above the width. */
export function getActivePreset(gridWidth, presets) {
  let activePreset;
  sortScreenPresets(presets, true).forEach(preset => {
    if (preset.breakpoint != null && gridWidth <= preset.breakpoint) {
      activePreset = preset;
    }
  });
  return activePreset;
}
