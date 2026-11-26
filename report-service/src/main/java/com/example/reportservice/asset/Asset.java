package com.example.reportservice.asset;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import java.util.Map;

/**
 * An OpenRemote asset.
 *
 * @param id               unique asset ID
 * @param name             display name
 * @param type             asset type name, e.g. {@code ThingAsset}
 * @param realm            realm the asset belongs to
 * @param parentId         parent asset ID, null for a root asset
 * @param path             IDs from the root asset down to this asset (inclusive)
 * @param createdOn        creation time, Unix milliseconds
 * @param version          optimistic locking version, incremented on every update
 * @param accessPublicRead whether anonymous users may read this asset
 * @param attributes       attributes by name; left out of the JSON when they were not loaded
 */
record Asset(
        String id,
        String name,
        String type,
        String realm,
        String parentId,
        List<String> path,
        Long createdOn,
        Long version,
        Boolean accessPublicRead,
        @JsonInclude(JsonInclude.Include.NON_NULL) Map<String, Attribute> attributes) { }
