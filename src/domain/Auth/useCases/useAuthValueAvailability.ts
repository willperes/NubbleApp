import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@hooks";

import { authService } from "../authService";

interface UseAuthValueAvailabilityParams<T> {
  value: T;
  queryKey: QueryKeys;
  queryEnabled: boolean;
  debounceDelay?: number;
  validationFn: (value: T) => Promise<boolean>;
}

interface UseAuthValueAvailabilityResult {
  isUnavailable: boolean;
  isFetching: boolean;
}

function useAuthValueAvailability<T extends { length: number }>(
  params: UseAuthValueAvailabilityParams<T>,
): UseAuthValueAvailabilityResult {
  const debouncedValue = useDebounce<T>(
    params.value,
    params.debounceDelay ?? 1500,
  );
  const { data, isFetching } = useQuery({
    queryKey: [params.queryKey, debouncedValue],
    queryFn: () => params.validationFn(debouncedValue),
    retry: false,
    staleTime: 20 * 1000,
    enabled: params.queryEnabled && debouncedValue?.length > 0,
  });

  const isDebouncing = debouncedValue !== params.value;
  return {
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}

export function useAuthUsernameAvailability({
  username,
  enabled,
}: {
  username: string;
  enabled: boolean;
}) {
  return useAuthValueAvailability({
    value: username,
    queryKey: QueryKeys.IsUsernameAvailable,
    queryEnabled: enabled,
    validationFn: authService.isUsernameAvailable,
  });
}

export function useAuthEmailAvailability({
  email,
  enabled,
}: {
  email: string;
  enabled: boolean;
}) {
  return useAuthValueAvailability({
    value: email,
    queryKey: QueryKeys.IsEmailAvailable,
    queryEnabled: enabled,
    validationFn: authService.isEmailAvailable,
  });
}
