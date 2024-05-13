import { useAuthCredentials, useSearchHistoryService } from "@services";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";

interface UseAuthSignOutResult {
  isLoading: boolean;
  signOut: () => void;
}

export function useAuthSignOut(): UseAuthSignOutResult {
  const { removeCredentials } = useAuthCredentials();
  const { clearUserList } = useSearchHistoryService();

  const { isLoading, mutate } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSettled: () => {
      removeCredentials();
      clearUserList();
    },
  });

  return {
    isLoading,
    signOut: mutate,
  };
}
