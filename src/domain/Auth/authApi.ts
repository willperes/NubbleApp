import { api } from "@api";

import { UserAPI } from "../User";

import {
  AuthCredentialsAPI,
  FieldAvailabilityAPI,
  ForgotPasswordParamsAPI,
  SignUpDataAPI,
} from "./authTypes";

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const { data } = await api.post<AuthCredentialsAPI>("auth/login", {
    email,
    password,
  });
  return data;
}

async function signOut(): Promise<string> {
  const { data } = await api.get<{ message: string }>("auth/profile/logout");
  return data.message;
}

async function signUp(_data: SignUpDataAPI): Promise<UserAPI> {
  const { data } = await api.post<UserAPI>("auth/register", _data);
  return data;
}

async function isEmailAvailable(params: {
  email: string;
}): Promise<FieldAvailabilityAPI> {
  const { data } = await api.get<FieldAvailabilityAPI>("auth/validate-email", {
    params,
  });
  return data;
}

async function isUsernameAvailable(params: {
  username: string;
}): Promise<FieldAvailabilityAPI> {
  const { data } = await api.get<FieldAvailabilityAPI>(
    "auth/validate-username",
    {
      params,
    },
  );
  return data;
}

async function forgotPassword(
  params: ForgotPasswordParamsAPI,
): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(
    "auth/forgot-password",
    params,
  );
  return data;
}

async function refreshToken(token: string): Promise<AuthCredentialsAPI> {
  const { data } = await api.post<AuthCredentialsAPI>("auth/refresh-token", {
    refreshToken: token,
  });
  return data;
}

export const authApi = {
  signIn,
  signOut,
  signUp,
  isEmailAvailable,
  isUsernameAvailable,
  forgotPassword,
  refreshToken,
};
