import React from "react";

import { useAuthSignUp } from "@domain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ActivityIndicator,
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from "@components";
import { useResetNavigationSuccess } from "@hooks";
import { AuthStackParamList } from "@routes";

import { SignUpSchema, signUpSchema } from "./signUpSchema";
import { useAsyncValidation } from "./useAsyncValidation";

const resetParams: AuthStackParamList["SuccessScreen"] = {
  title: "Sua conta foi criada com sucesso!",
  description: "Agora é só fazer login na nossa plataforma",
  iconProps: {
    name: "checkRound",
    color: "greenSuccess",
  },
};

export function SignUpScreen() {
  const { reset } = useResetNavigationSuccess();
  const { isLoading, signUp } = useAuthSignUp({
    onSuccess: () => reset(resetParams),
  });

  const { control, formState, getFieldState, watch, handleSubmit } =
    useForm<SignUpSchema>({
      mode: "onChange",
      resolver: zodResolver(signUpSchema),
    });

  function submitForm(formValues: SignUpSchema): void {
    signUp(formValues);
  }

  const { usernameValidation, emailValidation } = useAsyncValidation({
    watch,
    getFieldState,
  });

  return (
    <Screen canGoBack scrollable>
      <Text preset={"headingLarge"} mb={"s32"}>
        Criar uma conta
      </Text>

      <FormTextInput
        control={control}
        name={"username"}
        label={"Seu username"}
        placeholder={"@"}
        errorMessage={usernameValidation.errorMessage}
        boxProps={{ mb: "s20" }}
        TrailingComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator size={"small"} />
          ) : undefined
        }
      />

      <FormTextInput
        control={control}
        name={"firstName"}
        label={"Nome"}
        placeholder={"Digite seu nome"}
        boxProps={{ mb: "s20" }}
      />

      <FormTextInput
        control={control}
        name={"lastName"}
        label={"Sobrenome"}
        placeholder={"Digite seu sobrenome"}
        boxProps={{ mb: "s20" }}
      />

      <FormTextInput
        control={control}
        name={"email"}
        label={"E-mail"}
        placeholder={"Digite seu e-mail"}
        errorMessage={emailValidation.errorMessage}
        boxProps={{ mb: "s20" }}
        TrailingComponent={
          emailValidation.isFetching ? (
            <ActivityIndicator size={"small"} />
          ) : undefined
        }
      />

      <FormPasswordInput
        control={control}
        name={"password"}
        label={"Senha"}
        placeholder={"Digite sua senha"}
        boxProps={{ mb: "s48" }}
      />

      <Button
        loading={isLoading}
        disabled={
          !formState.isValid ||
          usernameValidation.notReady ||
          emailValidation.notReady
        }
        title={"Criar uma conta"}
        preset={"primary"}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
