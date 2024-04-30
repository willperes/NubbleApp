import { useAuthUsernameAvailability } from "@domain";
import { UseFormGetFieldState, UseFormWatch } from "react-hook-form";

import { SignUpSchema } from "./signUpSchema";

interface Params {
  watch: UseFormWatch<SignUpSchema>;
  getFieldState: UseFormGetFieldState<SignUpSchema>;
}

export function useAsyncValidation({ watch, getFieldState }: Params) {
  const username = watch("username");
  const usernameState = getFieldState("username");
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;
  const usernameQuery = useAuthUsernameAvailability({
    username,
    enabled: usernameIsValid,
  });

  return {
    errorMessage: usernameQuery.isUnavailable
      ? "Username indisponível"
      : undefined,
    notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
    isFetching: usernameQuery.isFetching,
  };
}
