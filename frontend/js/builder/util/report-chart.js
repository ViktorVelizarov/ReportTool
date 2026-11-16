/*
 * OpenRemote's line chart (or-chart) and bar chart (or-attribute-barchart) changed for a report:
 * - no time controls: the toolbar of the report chooses the time frame, so the chart has neither the buttons to change
 *   it nor the "from" and "to" of a custom time span;
 * - a compact legend under the chart, as Report Studio had before it used OpenRemote's charts: one line per attribute,
 *   with a mark in its colour, the asset and the attribute, and notes such as the methods of the bars or the right
 *   axis. It never scrolls, because a report is printed. OpenRemote's legend has an icon and three lines per attribute,
 *   beside the chart or under it with a scroll bar, so that it filled a small widget.
 * With its time controls and legend switched off, an OpenRemote chart draws only the chart; the legend comes after it.
 * Derived from the legends of those charts. Original: Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later
 * (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, html, when } from 'lit';
import { AssetModelUtil } from '../../data/asset-model.js';
import { camelCaseToSentenceCase, getAttributeLabel, sortByString } from '../../data/util.js';
import { i18next } from '../../kit/i18n.js';
import { hasRef, sameRef } from './chart-helpers.js';

const FAINT_OPACITY = 0.31; // of a faint line or bar in OpenRemote's charts

const styles = css`
  .report-chart {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
  }

  #container {
    flex: 1 1 0;
    min-height: 0;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px 16px;
    font-size: 12px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .legend-mark {
    flex: none;
    border-radius: 2px;
  }

  .legend-mark.bar {
    width: 14px;
    height: 10px;
  }

  .legend-mark.line {
    position: relative;
    width: 20px;
    height: 2px;
  }

  .legend-mark.line::after {
    content: '';
    position: absolute;
    left: 6px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: inherit;
  }

  .legend-note {
    color: grey;
  }
`;

/** The legend of a chart: mark is 'line' or 'bar', notesOf and sorted are those of reportChart. */
function legendTemplate(chart, { mark, notesOf, sorted }) {
  const config = chart.attributeConfig ?? {};
  const items = (chart.assetAttributes ?? []).map(([assetIndex, attribute], index) => {
    const asset = chart.assets?.[assetIndex];
    if (!asset) return { attribute, label: attribute.name ?? '' }; // a broken reference, which stays in the legend
    const ref = { id: asset.id, name: attribute.name };
    const [descriptor] = AssetModelUtil.getAttributeAndValueDescriptors(asset.type, attribute.name, attribute);
    return {
      asset,
      ref,
      label: getAttributeLabel(attribute, descriptor, true),
      color: chart.attributeColors?.find(([colorRef]) => sameRef(colorRef, ref))?.[1]
        ?? chart.colors[index % chart.colors.length],
      notes: [...notesOf(ref, config), ...(hasRef(config.rightAxisAttributes, ref) ? [i18next.t('right')] : [])],
      faint: hasRef(config.faintAttributes, ref),
    };
  });
  if (sorted) items.sort(sortByString(item => item.label));
  return html`
    <div class="legend">
      ${items.map(({ asset, attribute, ref, label, color, notes, faint }) => (asset
        ? html`
          <div class="legend-item" @mouseenter=${() => chart._addDatasetHighlight(ref)}
            @mouseleave=${() => chart._removeDatasetHighlights()}>
            <span class="legend-mark ${mark}"
              style="background-color: ${color}; opacity: ${faint ? FAINT_OPACITY : 1}"></span>
            <span>${asset.name} | ${label}</span>
            ${when(notes.length, () => html`<span class="legend-note">(${notes.join(', ')})</span>`)}
          </div>`
        : html`
          <div class="legend-item legend-note">
            <i>${i18next.t('brokenReference')}</i> ${camelCaseToSentenceCase(attribute.name ?? '')}
          </div>`))}
    </div>`;
}

/**
 * The report version of an OpenRemote chart class (or-chart or or-attribute-barchart, whose assets, assetAttributes,
 * attributeColors, colors and attributeConfig the legend reads). Its property showReportLegend shows the legend, in
 * place of showLegend. mark is 'line' or 'bar'; notesOf(ref, attributeConfig) gives the notes of an attribute besides
 * the right axis; sorted orders the attributes by their label, as or-chart does.
 */
export function reportChart(Chart, { mark, notesOf = () => [], sorted = false }) {
  return class extends Chart {
    static properties = { showReportLegend: { type: Boolean } };

    static styles = [...Chart.styles, styles];

    constructor() {
      super();
      this.timestampControls = false;
      this.showLegend = false;
      this.showReportLegend = true;
    }

    render() {
      return html`
        <div class="report-chart">
          ${super.render()}
          ${when(this.showReportLegend, () => legendTemplate(this, { mark, notesOf, sorted }))}
        </div>`;
    }
  };
}
