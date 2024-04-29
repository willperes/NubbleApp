import { useAuthCredentials } from "@services";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";

interface UseAuthSignOutResult {
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export function useAuthSignOut(): UseAuthSignOutResult {
  const { removeCredentials } = useAuthCredentials();

  const { isLoading, mutate } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSuccess: () => {
      authService.removeToken();
      removeCredentials();
    },
  });

  async function signOut() {
    mutate();
  }

  return {
    isLoading,
    signOut,
  };
}
