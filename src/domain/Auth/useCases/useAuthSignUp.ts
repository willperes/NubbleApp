import { MutationOptions } from "@infra";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";
import { SignUpData } from "../authTypes";

interface UseAuthSignUpResult {
  isLoading: boolean;
  signUp: (variables: SignUpData) => void;
}

export function useAuthSignUp(
  options?: MutationOptions<void>,
): UseAuthSignUpResult {
  const { isLoading, mutate } = useMutation<void, Error, SignUpData>({
    mutationFn: variables => authService.signUp(variables),
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message || "Erro ao realizar o cadastro");
      }
    },
  });

  function signUp(variables: SignUpData): void {
    mutate(variables);
  }

  return {
    isLoading,
    signUp,
  };
}
