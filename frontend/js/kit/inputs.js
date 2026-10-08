/**
 * Form controls with the names and the way of working of the Vaadin based ones in OpenRemote (or-vaadin-text-field,
 * or-vaadin-select, ...), so that the ported settings panels use them as they are: a label in the "label" slot, a
 * "change" event on the element when the user has made a choice, and the choice in value, checked or selectedItems.
 * Under the hood they are the plain HTML controls.
 */

import { css, html, ifDefined, live, nothing } from 'lit';
import { OrElement } from './or-element.js';
import './or-icon.js';

const fieldStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 14px;
  }

  :host([hidden]) {
    display: none;
  }

  .label {
    margin-bottom: 4px;
    color: var(--or-app-color3, #4c4c4c);
    font-size: 13px;
    font-weight: 500;
  }

  .label[hidden] {
    display: none;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 6px;
    box-sizing: border-box;
    height: 36px;
    padding: 0 10px;
    border: 1px solid #c5cbd2;
    border-radius: 6px;
    background: #fff;
  }

  .field:focus-within {
    border-color: var(--or-app-color4, #4d9d2a);
    box-shadow: 0 0 0 2px rgba(77, 157, 42, 0.2);
  }

  .field.invalid {
    border-color: var(--or-app-color6, #be0000);
  }

  :host([readonly]) .field,
  :host([disabled]) .field {
    background: #f3f4f6;
  }

  :host([disabled]) {
    opacity: 0.6;
  }

  input,
  select {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: inherit;
    font: inherit;
  }

  select {
    cursor: pointer;
  }

  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    color: #6b7280;
  }
`;

/** Tells the page that the user made a choice in the control. */
function dispatchChange(element) {
  element.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
}

/** The label of a control is whatever is put in its "label" slot. */
function labelTemplate(control) {
  return html`<div class="label" ?hidden=${!control._hasLabel}>
    <slot name="label" @slotchange=${event => { control._hasLabel = event.target.assignedNodes().length > 0; }}></slot>
  </div>`;
}

export class OrVaadinTextField extends OrElement {
  static properties = {
    value: { type: String },
    required: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    minlength: { type: String },
    maxlength: { type: String },
    min: { type: String },
    max: { type: String },
    step: { type: String },
    placeholder: { type: String },
    _hasLabel: { state: true },
    _invalid: { state: true },
  };

  static styles = fieldStyles;

  constructor() {
    super();
    this.value = '';
    this.required = false;
    this.readonly = false;
    this.disabled = false;
    this._hasLabel = false;
    this._invalid = false;
  }

  get inputType() {
    return 'text';
  }

  get _input() {
    return this.renderRoot.querySelector('input');
  }

  checkValidity() {
    return this._input?.checkValidity() ?? true;
  }

  focus() {
    this._input?.focus();
  }

  _onInput(event) {
    this.value = event.target.value;
  }

  _onChange(event) {
    event.stopPropagation(); // the native event does not leave the shadow root; the element sends its own
    this.value = event.target.value;
    this._invalid = !event.target.checkValidity();
    dispatchChange(this);
  }

  render() {
    return html`
      ${labelTemplate(this)}
      <div class="field ${this._invalid ? 'invalid' : ''}">
        <slot name="prefix"></slot>
        <input
          type=${this.inputType}
          .value=${live(this.value ?? '')}
          ?required=${this.required}
          ?readonly=${this.readonly}
          ?disabled=${this.disabled}
          minlength=${ifDefined(this.minlength || undefined)}
          maxlength=${ifDefined(this.maxlength || undefined)}
          min=${ifDefined(this.min || undefined)}
          max=${ifDefined(this.max || undefined)}
          step=${ifDefined(this.step || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          @input=${this._onInput}
          @change=${this._onChange}
        />
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

export class OrVaadinNumberField extends OrVaadinTextField {
  get inputType() {
    return 'number';
  }
}

/** A drop-down list. items are { value, label } objects or plain strings. */
export class OrVaadinSelect extends OrElement {
  static properties = {
    items: { attribute: false },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    placeholder: { type: String },
    _hasLabel: { state: true },
  };

  static styles = fieldStyles;

  constructor() {
    super();
    this.items = [];
    this.value = '';
    this._hasLabel = false;
  }

  get _options() {
    return (this.items ?? []).map(item =>
      typeof item === 'object' ? { value: String(item.value), label: item.label ?? item.text ?? item.value } :
        { value: String(item), label: String(item) });
  }

  _onChange(event) {
    event.stopPropagation();
    this.value = event.target.value;
    dispatchChange(this);
  }

  render() {
    const options = this._options;
    const selected = options.some(option => option.value === String(this.value));
    return html`
      ${labelTemplate(this)}
      <div class="field">
        <slot name="prefix"></slot>
        <select ?disabled=${this.disabled} ?required=${this.required} @change=${this._onChange}>
          ${selected ? nothing : html`<option value="" selected disabled hidden>${this.placeholder ?? ''}</option>`}
          ${options.map(option => html`
            <option value=${option.value} ?selected=${option.value === String(this.value)}>${option.label}</option>`)}
        </select>
      </div>
    `;
  }
}

/** A switch. */
export class OrVaadinToggle extends OrElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-block;
      flex: none;
    }

    button {
      position: relative;
      width: 40px;
      height: 22px;
      padding: 0;
      border: 0;
      border-radius: 11px;
      background: #c5cbd2;
      cursor: pointer;
      transition: background 0.15s;
    }

    button[aria-checked='true'] {
      background: var(--or-app-color4, #4d9d2a);
    }

    button:focus-visible {
      outline: 2px solid var(--or-app-color4, #4d9d2a);
      outline-offset: 2px;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      transition: transform 0.15s;
    }

    button[aria-checked='true'] .knob {
      transform: translateX(18px);
    }
  `;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
  }

  _toggle() {
    this.checked = !this.checked;
    dispatchChange(this);
  }

  render() {
    return html`
      <button type="button" role="switch" aria-checked=${String(!!this.checked)} ?disabled=${this.disabled}
        @click=${this._toggle}>
        <span class="knob"></span>
      </button>
    `;
  }
}

/** A button. theme is a list of "primary", "icon" and "tertiary"; the prefix slot is for an icon. */
export class OrVaadinButton extends OrElement {
  static properties = {
    theme: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-flex;
    }

    :host([hidden]) {
      display: none;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-sizing: border-box;
      min-height: 36px;
      padding: 0 14px;
      border: 1px solid #c5cbd2;
      border-radius: 6px;
      background: #fff;
      color: var(--or-app-color3, #4c4c4c);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover:not(:disabled) {
      background: #f3f4f6;
    }

    button:focus-visible {
      outline: 2px solid var(--or-app-color4, #4d9d2a);
      outline-offset: 2px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button.primary {
      border-color: #3a8420;
      background: #3a8420;
      color: #fff;
    }

    button.primary:hover:not(:disabled) {
      background: #2f6c19;
    }

    button.tertiary,
    button.icon {
      border-color: transparent;
      background: transparent;
    }

    button.tertiary:hover:not(:disabled),
    button.icon:hover:not(:disabled) {
      background: #eceff1;
    }

    button.icon {
      width: 36px;
      padding: 0;
    }
  `;

  constructor() {
    super();
    this.theme = '';
    this.disabled = false;
  }

  render() {
    return html`
      <button type="button" class=${this.theme ?? ''} ?disabled=${this.disabled}>
        <slot name="prefix"></slot><slot></slot>
      </button>
    `;
  }
}

/**
 * A drop-down with check boxes. items are objects, itemValuePath and itemLabelPath say which fields hold the value and
 * the label; selectedItems are the chosen items.
 */
export class OrVaadinMultiSelectComboBox extends OrElement {
  static properties = {
    items: { attribute: false },
    selectedItems: { attribute: false },
    itemValuePath: { type: String, attribute: 'item-value-path' },
    itemLabelPath: { type: String, attribute: 'item-label-path' },
    disabled: { type: Boolean, reflect: true },
    _hasLabel: { state: true },
    _open: { state: true },
  };

  static styles = [fieldStyles, css`
    .field {
      cursor: pointer;
    }

    .chips {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: 4px;
      min-width: 0;
      padding: 3px 0;
    }

    .chip {
      padding: 1px 8px;
      border-radius: 10px;
      background: #eef6e9;
      color: #2c5e17;
      font-size: 12px;
    }

    .menu {
      position: absolute;
      z-index: 20;
      box-sizing: border-box;
      width: 100%;
      max-height: 220px;
      margin-top: 2px;
      padding: 4px;
      overflow: auto;
      border: 1px solid #c5cbd2;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 4px;
      cursor: pointer;
    }

    .option:hover {
      background: #f3f4f6;
    }

    :host {
      position: relative;
    }
  `];

  constructor() {
    super();
    this.items = [];
    this.selectedItems = [];
    this.itemValuePath = 'value';
    this.itemLabelPath = 'label';
    this.disabled = false;
    this._hasLabel = false;
    this._open = false;
    this._onOutsideClick = event => {
      if (!event.composedPath().includes(this)) this._open = false;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideClick);
  }

  _isSelected(item) {
    return (this.selectedItems ?? []).some(
      selected => selected?.[this.itemValuePath] === item[this.itemValuePath]);
  }

  _toggleItem(item) {
    this.selectedItems = this._isSelected(item)
      ? this.selectedItems.filter(selected => selected[this.itemValuePath] !== item[this.itemValuePath])
      : [...(this.selectedItems ?? []), item];
    dispatchChange(this);
  }

  render() {
    const selected = (this.selectedItems ?? []).filter(Boolean);
    return html`
      ${labelTemplate(this)}
      <div class="field" tabindex="0" @click=${() => { if (!this.disabled) this._open = !this._open; }}
        @keydown=${event => { if (event.key === 'Enter' || event.key === ' ') this._open = !this._open; }}>
        <div class="chips">
          ${selected.map(item => html`<span class="chip">${item[this.itemLabelPath]}</span>`)}
        </div>
        <or-icon icon="chevron-down" style="--or-icon-width: 18px; --or-icon-height: 18px"></or-icon>
      </div>
      ${this._open ? html`
        <div class="menu" role="listbox">
          ${(this.items ?? []).map(item => html`
            <label class="option">
              <input type="checkbox" .checked=${this._isSelected(item)} @change=${() => this._toggleItem(item)} />
              <span>${item[this.itemLabelPath]}</span>
            </label>`)}
        </div>` : nothing}
    `;
  }
}

/** A spinner. */
export class OrLoadingIndicator extends OrElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      min-height: 32px;
    }

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #e0e0e0;
      border-top-color: var(--or-app-color4, #4d9d2a);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`<div class="spinner" role="progressbar" aria-label="Loading"></div>`;
  }
}

/** A colour swatch that opens the colour picker of the browser; sends or-mwc-input-changed with detail.value. */
export class OrColourInput extends OrElement {
  static properties = { value: { type: String } };

  static styles = css`
    :host {
      display: inline-block;
    }

    input {
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid #c5cbd2;
      border-radius: 50%;
      background: none;
      cursor: pointer;
    }

    input::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input::-webkit-color-swatch {
      border: 0;
      border-radius: 50%;
    }
  `;

  _onInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('or-mwc-input-changed', {
      bubbles: true, composed: true, detail: { value: this.value },
    }));
  }

  render() {
    const value = this.value?.startsWith('#') ? this.value : `#${this.value ?? '000000'}`;
    return html`<input type="color" .value=${live(value)} @input=${this._onInput} />`;
  }
}

customElements.define('or-vaadin-text-field', OrVaadinTextField);
customElements.define('or-vaadin-number-field', OrVaadinNumberField);
customElements.define('or-vaadin-select', OrVaadinSelect);
customElements.define('or-vaadin-toggle', OrVaadinToggle);
customElements.define('or-vaadin-button', OrVaadinButton);
customElements.define('or-vaadin-multi-select-combo-box', OrVaadinMultiSelectComboBox);
customElements.define('or-loading-indicator', OrLoadingIndicator);
customElements.define('or-colour-input', OrColourInput);
