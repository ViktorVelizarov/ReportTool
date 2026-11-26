/** A report of the fake service's assets with a widget of every type, for the tests of the report and its state. */

import { IDS } from './service.js';
import { buildTemplate, ref } from './templates.js';

const GREEN = '#4caf50';
const ORANGE = '#ff9800';
const RED = '#ef5350';

const FLOW_1 = ref(IDS.drip1, 'flowWater');
const FLOW_2 = ref(IDS.drip2, 'flowWater');
const TANK_1 = ref(IDS.drip1, 'tankLevel');
const SALINITY = ref(IDS.sensor, 'salinity');
const TEMPERATURE = ref(IDS.sensor, 'temperature');

/** The ids of the widgets are irrigation-1 to irrigation-8, in the order that the report is read. */
export const REPORT = {
  name: 'Irrigation report',
  periodId: 'last7',
  template: buildTemplate('irrigation', [
    {
      type: 'linechart',
      name: 'Water flow',
      box: [0, 0, 8, 5],
      config: {
        attributeRefs: [FLOW_1, FLOW_2],
        attributeConfig: { smoothAttributes: [FLOW_1], areaAttributes: [FLOW_1] },
      },
    },
    {
      type: 'gauge',
      name: 'Tank level',
      box: [8, 0, 4, 5],
      config: {
        attributeRefs: [TANK_1],
        max: 1500,
        decimals: 0,
        thresholds: [[0, RED], [200, ORANGE], [500, GREEN]],
      },
    },
    {
      type: 'barchart',
      name: 'Nutrients',
      box: [0, 5, 6, 5],
      config: {
        attributeRefs: [ref(IDS.drip1, 'flowNutrients'), ref(IDS.drip2, 'flowNutrients')],
        attributeSettings: {
          methodAvgAttributes: [ref(IDS.drip1, 'flowNutrients'), ref(IDS.drip2, 'flowNutrients')],
        },
        decimals: 1,
      },
    },
    { type: 'kpi', name: 'Salinity', box: [6, 5, 3, 2], config: { attributeRefs: [SALINITY], decimals: 1 } },
    {
      type: 'kpi',
      name: 'Soil temperature',
      box: [9, 5, 3, 2],
      config: { attributeRefs: [TEMPERATURE], decimals: 1, deltaFormat: 'percentage' },
    },
    {
      type: 'table',
      name: 'Irrigation',
      box: [6, 7, 6, 3],
      config: { assetType: 'IrrigationAsset', allOfType: true, attributeNames: ['flowWater', 'tankLevel'] },
    },
    {
      type: 'map',
      name: 'Irrigation map',
      box: [0, 10, 6, 5],
      config: {
        assetType: 'IrrigationAsset',
        attributeName: 'tankLevel',
        valueType: 'positiveNumber',
        showLabels: true,
        thresholds: [[0, RED], [200, ORANGE], [500, GREEN]],
      },
    },
    {
      type: 'image',
      name: 'Site plan',
      box: [6, 10, 6, 5],
      config: {
        imagePath: 'https://example.com/plan.png',
        attributeRefs: [FLOW_1, TANK_1, TEMPERATURE],
        markers: [
          { attributeRef: FLOW_1, coordinates: [48, 19] },
          { attributeRef: TANK_1, coordinates: [69, 19] },
          { attributeRef: TEMPERATURE, coordinates: [20, 72] },
        ],
      },
    },
  ]),
};
