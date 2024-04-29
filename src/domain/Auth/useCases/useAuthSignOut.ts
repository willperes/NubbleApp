import { useMutation } from "@tanstack/react-query";

import { authApi } from "../authApi";

interface UseAuthSignOutResult {
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export function useAuthSignOut(): UseAuthSignOutResult {
  const { isLoading, mutate } = useMutation<string, unknown, void>({
    mutationFn: () => authApi.signOut(),
    retry: false,
  });

  async function signOut() {
    mutate();
  }

  return {
    isLoading,
    signOut,
  };
}
