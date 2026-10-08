/**
 * What OpenRemote calls the asset model: the asset types, their attributes and the value types. It is read from the
 * report service (the model of the manager) when the page starts. The functions have the names of OpenRemote's
 * AssetModelUtil, so the ported builder code uses them unchanged.
 */

import { i18next } from '../kit/texts.js';
import { ServiceClient } from './service-client.js';
import { camelCaseToSentenceCase } from './util.js';

/** The value types of the attributes that hold a number. */
export const NUMERIC_VALUE_TYPES = [
  'positiveInteger', 'positiveNumber', 'number', 'long', 'integer', 'bigInteger', 'negativeInteger', 'negativeNumber',
  'bigNumber', 'integerByte', 'direction',
];

/** The asset types by name: { assetDescriptor, attributeDescriptors }, as read by loadAssetModel. */
let types = new Map();

/**
 * Reads the asset model from the service. It is needed before the builder draws, because the descriptors are asked for
 * without waiting. An asset type has a label, as OpenRemote shows it, and an attribute descriptor has the label and the
 * units where the widgets look for them: in its meta.
 */
export async function loadAssetModel() {
  const assetInfos = await ServiceClient.getJson('/model/assetInfos');
  types = new Map(assetInfos.map(({ assetDescriptor, attributeDescriptors }) => [assetDescriptor.name, {
    assetDescriptor: {
      ...assetDescriptor,
      label: i18next.t(`label.asset.${assetDescriptor.name}`,
        { defaultValue: camelCaseToSentenceCase(assetDescriptor.name) }),
    },
    attributeDescriptors: attributeDescriptors.map(({ name, type, units }) => ({
      name, type, meta: { label: camelCaseToSentenceCase(name), ...(units ? { units } : {}) },
    })),
  }]));
}

export const AssetModelUtil = {
  getAssetDescriptors: () => [...types.values()].map(info => info.assetDescriptor),

  getAssetDescriptor: typeName => types.get(typeName)?.assetDescriptor,

  getAssetTypeInfo: descriptor => types.get(typeof descriptor === 'string' ? descriptor : descriptor.name)
    ?? { assetDescriptor: descriptor, attributeDescriptors: [] },

  getAttributeDescriptor: (attributeName, assetType) =>
    types.get(assetType)?.attributeDescriptors.find(descriptor => descriptor.name === attributeName),

  /** [attribute descriptor, value type] for an attribute of an asset of the type. */
  getAttributeAndValueDescriptors: (assetType, attributeName, attribute) => {
    const descriptor = assetType ? AssetModelUtil.getAttributeDescriptor(attributeName, assetType) : undefined;
    return [descriptor, { name: attribute?.type ?? descriptor?.type }];
  },
};
