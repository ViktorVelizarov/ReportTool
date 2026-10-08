/**
 * Dialogs in the way of OpenRemote's OrMwcDialog: build one with setHeading, setContent and setActions, then show it
 * with showDialog. The dialog is a native <dialog>, so it is modal and closes on Escape.
 */

import { html, render } from 'lit';
import { i18next } from './i18n.js';
import './inputs.js';

export class OrMwcDialog extends EventTarget {
  constructor() {
    super();
    this.heading = '';
    this.content = undefined;
    this.actions = [];
    this.element = undefined;
  }

  setHeading(heading) {
    this.heading = heading;
    return this;
  }

  /** A Lit template, or a function returning one (called whenever the dialog renders). */
  setContent(content) {
    this.content = content;
    return this;
  }

  /** actions: [{ actionName, content (text or text key), default?, action? }] */
  setActions(actions) {
    this.actions = actions;
    return this;
  }

  /** Closes the dialog without running an action. */
  close() {
    if (this.element?.open) this.element.close();
  }

  _run(action) {
    action?.action?.();
    this.close();
  }

  _template() {
    const content = typeof this.content === 'function' ? this.content() : this.content;
    return html`
      <h2 class="or-dialog-heading">${this.heading}</h2>
      <div class="or-dialog-content">${content}</div>
      <div class="or-dialog-actions">
        ${this.actions.map(action => html`
          <or-vaadin-button theme=${action.default ? '' : 'primary'} @click=${() => this._run(action)}>
            ${i18next.t(action.content)}
          </or-vaadin-button>`)}
      </div>
    `;
  }

  /** Draws the dialog again, for content that changes while the dialog is open. */
  update() {
    if (this.element) render(this._template(), this.element);
  }
}

/** Shows the dialog and returns it. */
export function showDialog(dialog) {
  const element = document.createElement('dialog');
  element.className = 'or-dialog';
  element.addEventListener('close', () => {
    element.remove();
    dialog.element = undefined;
  });
  document.body.append(element);
  dialog.element = element;
  dialog.update();
  element.showModal();
  return dialog;
}
