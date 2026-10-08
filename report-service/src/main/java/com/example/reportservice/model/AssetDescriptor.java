package com.example.reportservice.model;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * An asset type.
 *
 * @param descriptorType {@code asset}, or {@code agent} for the asset types that are protocol agents
 * @param name           asset type name, e.g. {@code ThingAsset}; the {@code type} of the assets of this type
 * @param icon           name of a Material Design Icon; left out of the JSON if the type has none
 * @param colour         hex colour without the {@code #}, e.g. {@code 4b5966}; left out of the JSON if the type has
 *                       none
 */
record AssetDescriptor(
        String descriptorType,
        String name,
        @JsonInclude(JsonInclude.Include.NON_NULL) String icon,
        @JsonInclude(JsonInclude.Include.NON_NULL) String colour) { }
