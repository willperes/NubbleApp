import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from "@components";
import { useResetNavigationSuccess } from "@hooks";

import { SignUpSchema, signUpSchema } from "./signUpSchema";

export function SignUpScreen() {
  const { control, formState, handleSubmit } = useForm<SignUpSchema>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const { reset } = useResetNavigationSuccess();

  function submitForm(formValues: SignUpSchema): void {
    console.log("SignUpScreen formValues", formValues);
    reset({
      title: "Sua conta foi criada com sucesso!",
      description: "Agora é só fazer login na nossa plataforma",
      iconProps: {
        name: "checkRound",
        color: "greenSuccess",
      },
    });
  }

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
        boxProps={{ mb: "s20" }}
      />

      <FormTextInput
        control={control}
        name={"fullName"}
        label={"Nome completo"}
        placeholder={"Digite seu nome completo"}
        boxProps={{ mb: "s20" }}
      />

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
        boxProps={{ mb: "s48" }}
      />

      <Button
        disabled={!formState.isValid}
        title={"Criar uma conta"}
        preset={"primary"}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
