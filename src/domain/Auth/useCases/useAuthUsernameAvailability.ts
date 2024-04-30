import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@hooks";

import { authService } from "../authService";

interface Params {
  username: string;
}

export function useAuthUsernameAvailability({ username }: Params) {
  const debouncedUsername = useDebounce(username);
  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.IsUsernameAvailable, debouncedUsername],
    queryFn: () => authService.isUsernameAvailable(debouncedUsername),
    retry: false,
    staleTime: 20 * 1000,
  });

  return {
    isAvailable: !!data,
    isFetching,
  };
}
