import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";

import { userService } from "../userService";

export function useUserGetById(id: number) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userService.getById(id),
    staleTime: 30 * 1000,
  });

  return {
    user: data,
    isLoading: isLoading,
    isError,
    isFetching,
    refetch,
  };
}
