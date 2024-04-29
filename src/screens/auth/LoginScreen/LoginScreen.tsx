import React from "react";

import { useAuthSignIn } from "@domain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastService } from "@services";
import { useForm } from "react-hook-form";

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from "@components";
import { AuthScreenProps } from "@routes";

import { LoginSchema, loginSchema } from "./loginSchema";

export function LoginScreen({ navigation }: AuthScreenProps<"LoginScreen">) {
  const { showToast } = useToastService();
  const { isLoading, signIn } = useAuthSignIn({
    onError: message =>
      showToast({ message, type: "error", position: "bottom" }),
  });

  const { control, formState, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  function submitForm({ email, password }: LoginSchema): void {
    signIn({ email, password });
  }

  function navigateToSignUpScreen(): void {
    navigation.navigate("SignUpScreen");
  }

  function navigateToForgotPasswordScreen(): void {
    navigation.navigate("ForgotPasswordScreen");
  }

  return (
    <Screen scrollable>
      <Text preset={"headingLarge"} mb={"s8"}>
        Olá!
      </Text>
      <Text preset={"paragraphLarge"} mb={"s40"}>
        Digite seu e-mail e senha para entrar
      </Text>

      <FormTextInput
        control={control}
        name={"email"}
        label={"E-mail"}
        placeholder={"Digite seu e-mail"}
        boxProps={{ mb: "s20" }}
      />

      <FormPasswordInput
        control={control}
        name={"password"}
        label={"Senha"}
        placeholder={"Digite sua senha"}
        boxProps={{ mb: "s10" }}
      />

      <Text
        preset={"paragraphSmall"}
        weight={"bold"}
        color={"primary"}
        onPress={navigateToForgotPasswordScreen}
      >
        Esqueci minha senha
      </Text>

      <Button
        loading={isLoading}
        disabled={!formState.isValid}
        preset={"primary"}
        title={"Entrar"}
        mt={"s48"}
        onPress={handleSubmit(submitForm)}
      />
      <Button
        preset={"outline"}
        title={"Criar uma conta"}
        mt={"s12"}
        onPress={navigateToSignUpScreen}
      />
    </Screen>
  );
}
