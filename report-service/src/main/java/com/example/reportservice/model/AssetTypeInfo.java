package com.example.reportservice.model;

import java.util.List;

/**
 * An asset type of the manager's asset model with its attributes: what the manager calls an {@code AssetTypeInfo},
 * without the lists of meta items and value types that it repeats for every type.
 *
 * @param assetDescriptor      the asset type
 * @param attributeDescriptors the attributes that the assets of the type have, in the order of the model
 */
record AssetTypeInfo(AssetDescriptor assetDescriptor, List<AttributeDescriptor> attributeDescriptors) { }
