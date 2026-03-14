import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Privacy } from "./useUserList";

type ObjectKeys<T> = T extends object ? Extract<keyof T, string> : never;

/**
 * Upsert one list item by key + itemId.
 *
 * ```ts
 * const setPost = useUserListSet<Post>();
 *
 * setPost({
 *   key: "posts", // REQUIRED: list key
 *   itemId: "post_123", // REQUIRED: item id
 *   value: { title: "Hi", body: "..." }, // REQUIRED: item value
 *   privacy: "PUBLIC", // list access mode
 *   filterKey: "status", // exact filter key
 *   searchKeys: ["title", "body"], // search source keys
 *   sortKey: "PROPERTY_LAST_MODIFIED", // stored sort key
 * });
 * ```
 *
 * Output:
 * - returns a Convex mutation promise
 * - creates the item if missing
 * - otherwise replaces stored `value`
 * - list config lives on the shared definition row
 *
 * Important:
 * - `privacy`, `filterKey`, `searchKeys`, and `sortKey` are list-level config
 * - all items in the same `key` share that config
 * - server derives `filterValue`, `searchValue`, and `sortValue`
 *
 * `overwriteStoredConfig` example:
 *
 * ```ts
 * const setPost = useUserListSet<Post>();
 *
 * setPost({
 *   key: "posts",
 *   itemId: "post_123",
 *   value: { title: "Hi", body: "...", status: "draft" },
 *   privacy: "PRIVATE",
 *   filterKey: "status",
 *   searchKeys: ["title", "body"],
 *   sortKey: "status",
 *   overwriteStoredConfig: true,
 * });
 * ```
 *
 * `overwriteStoredConfig` notes:
 * - default behavior keeps the already stored list config
 * - set `overwriteStoredConfig: true` when you intentionally want to replace that config
 * - use this sparingly because it affects every item in the same list key
 */
export function useUserListSet<T = any>() {
  const mutation = useMutation(api.user_lists.set);

  return ({
    key,
    itemId,
    value,
    privacy,
    filterKey,
    searchKeys,
    sortKey,
    overwriteStoredConfig,
  }: {
    key: string;
    itemId: string;
    value: T;
    privacy?: Privacy;
    filterKey?: ObjectKeys<T> | string;
    searchKeys?: (ObjectKeys<T> | string)[];
    sortKey?: ObjectKeys<T> | string;
    overwriteStoredConfig?: boolean;
  }) => {
    const backendPrivacy = Array.isArray(privacy)
      ? { allowList: privacy }
      : privacy;

    return mutation({
      key,
      itemId,
      value,
      privacy: backendPrivacy,
      filterKey,
      searchKeys,
      sortKey,
      overwriteStoredConfig,
    });
  };
}
