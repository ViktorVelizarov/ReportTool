/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/or-dashboard-keyhandler.ts).
 * Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const EDITABLE = 'input, textarea, select, [contenteditable="true"]';

/**
 * Turns the keys of the dashboard builder into events: Delete ("delete"), Escape ("deselect") and Ctrl+S ("save").
 * Delete and Escape are left alone while the user is typing in a field or has a dialog open. The emitter listens for as
 * long as the page lives.
 */
export class DashboardKeyEmitter {
  constructor() {
    this._listeners = new Map();
    window.addEventListener('keydown', event => {
      const name = this._eventFor(event);
      if (name && this._listeners.get(name)?.size) {
        event.preventDefault();
        this._listeners.get(name).forEach(listener => listener(event));
      }
    });
  }

  _eventFor(event) {
    if (event.key === 's' && event.ctrlKey) return 'save';
    const path = event.composedPath();
    if (path[0]?.matches?.(EDITABLE) || path.some(node => node.localName === 'dialog')) return undefined;
    if (event.key === 'Delete') return 'delete';
    if (event.key === 'Escape') return 'deselect';
    return undefined;
  }

  addListener(name, listener) {
    if (!this._listeners.has(name)) this._listeners.set(name, new Set());
    this._listeners.get(name).add(listener);
  }
}
