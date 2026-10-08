/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-engine.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** GridStack's engine, with the one change that Insights makes to it. */
export class OrDashboardEngine extends window.GridStack.Engine {
  // Cancelling move when it collides with the same widget.
  // Apparently during some rerenders, the widget moved downwards after colliding with itself.
  // Now cancelling the movement when the IDs are the same.
  moveNode(node, options) {
    if (options.skip && options.skip.id === node.id) {
      options.x = options.skip.x;
      options.y = options.skip.y;
      options.w = options.skip.w;
      options.h = options.skip.h;
    }
    return super.moveNode(node, options);
  }
}
