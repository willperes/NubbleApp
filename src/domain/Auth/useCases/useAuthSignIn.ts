import { MutationOptions } from "@infra";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../authService";
import { AuthCredentials } from "../authTypes";

type SignInVariables = { email: string; password: string };

interface UseAuthSignInResult {
  isLoading: boolean;
  signIn: (variables: SignInVariables) => Promise<void>;
}

export function useAuthSignIn(
  options?: MutationOptions<AuthCredentials>,
): UseAuthSignInResult {
  const { isLoading, mutate } = useMutation<
    AuthCredentials,
    Error,
    SignInVariables
  >({
    mutationFn: ({ email, password }) => authService.signIn(email, password),
    retry: false,
    onSuccess: authCredentials =>
      authService.updateToken(authCredentials.token),
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  async function signIn(variables: SignInVariables) {
    mutate(variables);
  }

  return {
    isLoading,
    signIn,
  };
}
