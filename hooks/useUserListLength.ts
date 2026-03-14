import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

type PrimitiveIndexValue = string | number | boolean;

interface UseUserListLengthOptions {
  key: string;
  filterFor: PrimitiveIndexValue;
}

/**
 * Exact accessible list-item count for one key + filter.
 *
 * ```ts
 * const commentCount = useUserListLength({
 *   key: "comments", // REQUIRED: list key
 *   filterFor: postId, // REQUIRED: exact filter value
 * });
 * ```
 *
 * Output:
 * - returns `number | undefined`
 * - `undefined` while loading
 * - count is exact for the current viewer
 *
 * This only supports the constant-time `key + filterFor` shape.
 * It does not include search, pagination, or ad hoc `userIds` scoping.
 */
export function useUserListLength({
  key,
  filterFor,
}: UseUserListLengthOptions) {
  return useQuery(api.user_lists.length, {
    key,
    filterFor,
  }) as number | undefined;
}
