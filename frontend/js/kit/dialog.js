/**
 * Dialogs in the way of OpenRemote's OrMwcDialog: build one with setHeading, setContent and setActions, then show it
 * with showDialog. The dialog is OpenRemote's or-vaadin-dialog, so it is modal and closes on Escape.
 */

import { html, render } from 'lit';
import { i18next } from './i18n.js';
import './inputs.js';
import './or-icon.js';

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
    this.element?.close();
  }

  _run(action) {
    action?.action?.();
    this.close();
  }

  /** The close button, the content and the actions, which are the parts that or-vaadin-dialog has slots for. */
  _template() {
    const content = typeof this.content === 'function' ? this.content() : this.content;
    return html`
      <div slot="header-content">
        <or-vaadin-button theme="icon tertiary" aria-label=${i18next.t('close')} @click=${() => this.close()}>
          <or-icon icon="close"></or-icon>
        </or-vaadin-button>
      </div>
      <div>${content}</div>
      <div slot="footer" class="dialog-footer">
        ${this.actions.map(action => html`
          <or-vaadin-button theme=${action.default ? 'tertiary' : 'primary'} @click=${() => this._run(action)}>
            ${i18next.t(action.content)}
          </or-vaadin-button>`)}
      </div>
    `;
  }

  /** Draws the dialog again, for content that changes while the dialog is open. */
  update() {
    if (!this.element) return;
    this.element.headerTitle = this.heading;
    render(this._template(), this.element);
  }
}

/** Shows the dialog and returns it. */
export function showDialog(dialog) {
  const element = document.createElement('or-vaadin-dialog');
  element.noCloseOnOutsideClick = true;
  element.addEventListener('closed', () => {
    element.remove();
    dialog.element = undefined;
  });
  document.body.append(element);
  dialog.element = element;
  dialog.update();
  element.open();
  return dialog;
}
