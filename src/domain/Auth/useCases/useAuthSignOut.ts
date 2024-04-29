import { useAuthCredentials } from "@services";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";

interface UseAuthSignOutResult {
  isLoading: boolean;
  signOut: () => void;
}

export function useAuthSignOut(): UseAuthSignOutResult {
  const { removeCredentials } = useAuthCredentials();

  const { isLoading, mutate } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSuccess: () => {
      removeCredentials();
    },
  });

  function signOut(): void {
    mutate();
  }

  return {
    isLoading,
    signOut,
  };
}
