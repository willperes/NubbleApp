import { QueryKeys, usePaginatedList } from "@infra";

import { userService } from "../userService";
import { User } from "../userTypes";

export function useUserList(searchQuery: string) {
  return usePaginatedList<User>(
    [QueryKeys.UserList, searchQuery],
    () => userService.searchUser(searchQuery),
    { enabled: searchQuery.length > 0, staleTime: 30 * 1000 },
  );
}
