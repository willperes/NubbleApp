import { MutationOptions } from "@infra";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";

type RequestNewPasswordVariables = { email: string };

interface UseAuthRequestNewPasswordResult {
  isLoading: boolean;
  requestNewPassword: (variables: RequestNewPasswordVariables) => void;
}

export function useAuthRequestNewPassword(
  options?: MutationOptions<string>,
): UseAuthRequestNewPasswordResult {
  const { isLoading, mutate } = useMutation<
    string,
    Error,
    RequestNewPasswordVariables
  >({
    mutationFn: ({ email }) => authService.requestNewPassword(email),
    onSuccess: message => {
      if (options?.onSuccess) {
        options.onSuccess(message);
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message || "Erro ao realizar o cadastro");
      }
    },
  });

  function requestNewPassword(variables: RequestNewPasswordVariables): void {
    mutate(variables);
  }

  return {
    isLoading,
    requestNewPassword,
  };
}
