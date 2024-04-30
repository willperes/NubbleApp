import { useAuthEmailAvailability, useAuthUsernameAvailability } from "@domain";
import { UseFormGetFieldState, UseFormWatch } from "react-hook-form";

import { SignUpSchema } from "./signUpSchema";

interface Params {
  watch: UseFormWatch<SignUpSchema>;
  getFieldState: UseFormGetFieldState<SignUpSchema>;
}

type ReturnValues = {
  errorMessage?: string;
  notReady: boolean;
  isFetching: boolean;
};

export function useAsyncValidation({ watch, getFieldState }: Params): {
  usernameValidation: ReturnValues;
  emailValidation: ReturnValues;
} {
  const username = watch("username");
  const usernameState = getFieldState("username");
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;
  const usernameQuery = useAuthUsernameAvailability({
    username,
    enabled: usernameIsValid,
  });

  const email = watch("email");
  const emailState = getFieldState("email");
  const emailIsValid = !emailState.invalid && emailState.isDirty;
  const emailQuery = useAuthEmailAvailability({
    email,
    enabled: emailIsValid,
  });

  return {
    usernameValidation: {
      errorMessage: usernameQuery.isUnavailable
        ? "Username indisponível"
        : undefined,
      notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
      isFetching: usernameQuery.isFetching,
    },
    emailValidation: {
      errorMessage: emailQuery.isUnavailable
        ? "E-mail indisponível"
        : undefined,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
      isFetching: emailQuery.isFetching,
    },
  };
}
