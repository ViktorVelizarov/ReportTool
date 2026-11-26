/*
 * Ported to plain JavaScript from OpenRemote's or-dashboard-builder (src/panels/thresholds-panel.ts), the list of
 * colour thresholds of the gauge and the map. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, ifDefined, unsafeCSS } from 'lit';
import '../../kit/inputs.js';
import { OrElement } from '../../kit/or-element.js';
import '../../kit/or-icon.js';
import { DefaultColor5, style } from '../style.js';

const NUMBER_TYPES = ['number', 'integer', 'positiveInteger', 'positiveNumber', 'negativeInteger', 'negativeNumber'];

/** Sent when the thresholds of a number change; detail is [[value, colour]]. */
class ThresholdChangeEvent extends CustomEvent {
  static NAME = 'threshold-change';

  constructor(thresholds) {
    super(ThresholdChangeEvent.NAME, { bubbles: true, composed: true, detail: thresholds });
  }
}

/** Sent when the colours of text values change; detail is [[text, colour]]. */
class TextColorsChangeEvent extends CustomEvent {
  static NAME = 'text-colors-change';

  constructor(textColors) {
    super(TextColorsChangeEvent.NAME, { bubbles: true, composed: true, detail: textColors });
  }
}

/** Sent when the colours of a boolean change; detail is { type, false, true }. */
class BoolColorsChangeEvent extends CustomEvent {
  static NAME = 'bool-colors-change';

  constructor(boolColors) {
    super(BoolColorsChangeEvent.NAME, { bubbles: true, composed: true, detail: boolColors });
  }
}

const styling = css`
  #thresholds-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .threshold-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }

  .threshold-list-item-colour {
    height: 100%;
    padding: 0 4px 0 0;
  }

  .threshold-list-item:hover .button-clear {
    visibility: visible;
  }

  .button-clear {
    background: none;
    visibility: hidden;
    color: var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    --or-icon-fill: var(--or-app-color5, ${unsafeCSS(DefaultColor5)});
    --or-icon-width: 22px;
    --or-icon-height: 22px;
    display: inline-block;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .button-clear:hover {
    --or-icon-fill: var(--or-app-color4);
  }
`;

/**
 * Colours for the values of an attribute: for a number a colour from each threshold upwards (the lowest threshold is
 * locked), for a boolean one colour per value, for a text one colour per text. valueType says which one is shown.
 */
export class ThresholdsPanel extends OrElement {
  static properties = {
    thresholds: { attribute: false },
    textColors: { attribute: false },
    boolColors: { attribute: false },
    min: {},
    max: {},
    valueType: { type: String },
  };

  static styles = [styling, style];

  constructor() {
    super();
    this.thresholds = [];
    this.textColors = [];
  }

  updated(changedProps) {
    if (changedProps.has('thresholds') && this.thresholds) {
      this.dispatchEvent(new ThresholdChangeEvent(this.thresholds));
    }
    if (changedProps.has('textColors') && this.textColors) {
      this.dispatchEvent(new TextColorsChangeEvent(this.textColors));
    }
    if (changedProps.has('boolColors') && this.boolColors) {
      this.dispatchEvent(new BoolColorsChangeEvent(this.boolColors));
    }
  }

  colorValue(color) {
    if (!color) return '#000000';
    return color.startsWith('#') ? color : `#${color}`;
  }

  render() {
    return html`
      <div id="thresholds-list" class="expanded-panel">
        <!-- Thresholds by number -->
        ${NUMBER_TYPES.includes(this.valueType) ? html`
          ${[...this.thresholds].sort((x, y) => (x[0] < y[0] ? -1 : 1)).map((threshold, index) => html`
            <div class="threshold-list-item">
              <div class="threshold-list-item-colour">
                <or-colour-input .value=${threshold[1]}
                  @or-mwc-input-changed=${event => {
                    threshold[1] = event.detail.value;
                    this.thresholds = [...this.thresholds];
                  }}></or-colour-input>
              </div>
              <or-vaadin-number-field .value=${String(threshold[0])}
                min=${ifDefined(this.min)} max=${ifDefined(this.max)} ?disabled=${index === 0 && this.max}
                @change=${event => {
                  const element = event.currentTarget;
                  if (element.checkValidity()) {
                    threshold[0] = Number(element.value);
                    this.thresholds = [...this.thresholds];
                  }
                }}></or-vaadin-number-field>
              ${index === 0
                ? html`<button class="button-clear" style="margin-left: 8px;"><or-icon icon="lock"></or-icon></button>`
                : html`
                  <button class="button-clear" style="margin-left: 8px;"
                    @click=${() => this.removeThreshold(threshold)}><or-icon icon="close-circle"></or-icon></button>`}
            </div>`)}
          <or-vaadin-button style="margin-top: 8px;" @click=${() => this.addNewThreshold()}>
            <or-icon slot="prefix" icon="plus" style="--or-icon-width: 20px; --or-icon-height: 20px"></or-icon>
            <or-translate value="threshold"></or-translate>
          </or-vaadin-button>` : null}

        <!-- Thresholds by boolean -->
        ${this.valueType === 'boolean' && this.boolColors ? html`
          ${[[true, 'True'], [false, 'False']].map(([isTrue, text]) => html`
            <div class="threshold-list-item">
              <div class="threshold-list-item-colour">
                <or-colour-input .value=${this.colorValue(this.boolColors?.[isTrue ? 'true' : 'false'])}
                  @or-mwc-input-changed=${event => this.onBoolColorChange(isTrue, event.detail.value)}>
                </or-colour-input>
              </div>
              <or-vaadin-text-field .value=${text} readonly></or-vaadin-text-field>
            </div>`)}` : null}

        <!-- Thresholds by string -->
        ${this.valueType === 'text' && this.textColors ? html`
          ${this.textColors.map((threshold, index) => html`
            <div class="threshold-list-item">
              <div class="threshold-list-item-colour">
                <or-colour-input .value=${threshold[1]}
                  @or-mwc-input-changed=${event => {
                    this.textColors[index][1] = event.detail.value;
                    this.textColors = [...this.textColors];
                  }}></or-colour-input>
              </div>
              <or-vaadin-text-field .value=${threshold[0]}
                @change=${event => {
                  this.textColors[index][0] = event.currentTarget.value;
                  this.textColors = [...this.textColors];
                }}></or-vaadin-text-field>
              <button class="button-clear" style="margin-left: 8px;" @click=${() => this.removeThreshold(threshold)}>
                <or-icon icon="close-circle"></or-icon>
              </button>
            </div>`)}
          <or-vaadin-button style="margin-top: 8px;" @click=${() => this.addNewThreshold()}>
            <or-icon slot="prefix" icon="plus" style="--or-icon-width: 20px; --or-icon-height: 20px"></or-icon>
            <or-translate value="threshold"></or-translate>
          </or-vaadin-button>` : null}
      </div>
    `;
  }

  onBoolColorChange(isTrue, newColor) {
    // in case newColor already has '#' prefix
    const color = newColor.startsWith('#') ? newColor.substring(1) : newColor;
    this.boolColors = {
      ...(this.boolColors ?? { type: 'boolean', true: '4caf50', false: 'ef5350' }),
      [isTrue ? 'true' : 'false']: color,
    };
  }

  removeThreshold(threshold) {
    if (typeof threshold[0] === 'number') {
      this.thresholds = this.thresholds.filter(item => item !== threshold);
    } else {
      this.textColors = this.textColors.filter(item => item !== threshold);
    }
  }

  addNewThreshold() {
    if (this.valueType === 'text') {
      this.textColors = [...this.textColors, ['new', '#000000']];
    } else {
      const highest = Math.max(...this.thresholds.map(threshold => threshold[0]));
      const suggestedValue = highest + 10;
      this.thresholds = [...this.thresholds,
        [!this.max || suggestedValue <= this.max ? suggestedValue : this.max, '#000000']];
    }
  }
}

customElements.define('thresholds-panel', ThresholdsPanel);
