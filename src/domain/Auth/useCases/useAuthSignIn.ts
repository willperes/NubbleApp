import { MutationOptions } from "@infra";
import { useAuthCredentials } from "@services";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";
import { AuthCredentials } from "../authTypes";

type SignInVariables = { email: string; password: string };

interface UseAuthSignInResult {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  signIn: (variables: SignInVariables) => void;
}

export function useAuthSignIn(
  options?: MutationOptions<AuthCredentials>,
): UseAuthSignInResult {
  const { saveCredentials } = useAuthCredentials();

  const { isLoading, isSuccess, isError, mutate } = useMutation<
    AuthCredentials,
    Error,
    SignInVariables
  >({
    mutationFn: ({ email, password }) => authService.signIn(email, password),
    retry: false,
    onSuccess: authCredentials => {
      saveCredentials(authCredentials);
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  function signIn(variables: SignInVariables): void {
    mutate(variables);
  }

  return {
    isLoading,
    isSuccess,
    isError,
    signIn,
  };
}
