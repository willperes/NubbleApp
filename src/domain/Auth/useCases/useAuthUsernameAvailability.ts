import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@hooks";

import { authService } from "../authService";

interface Params {
  username: string;
  enabled: boolean;
}

export function useAuthUsernameAvailability({ username, enabled }: Params) {
  const debouncedUsername = useDebounce(username, 1500);
  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.IsUsernameAvailable, debouncedUsername],
    queryFn: () => authService.isUsernameAvailable(debouncedUsername),
    retry: false,
    staleTime: 20 * 1000,
    enabled: enabled && debouncedUsername?.length > 0,
  });

  const isDebouncing = debouncedUsername !== username;
  return {
    isAvailable: !!data,
    isFetching: isFetching || isDebouncing,
  };
}
