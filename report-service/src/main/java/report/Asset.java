package report;

import java.util.List;

/**
 * An OpenRemote asset without its attributes (those are added in a later step).
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
        Boolean accessPublicRead) { }
