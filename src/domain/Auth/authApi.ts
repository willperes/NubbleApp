import { api } from "@api";

import { UserAPI } from "../User";

import { AuthAPI, FieldAvailabilityAPI, SignUpDataAPI } from "./authTypes";

async function signIn(email: string, password: string): Promise<AuthAPI> {
  const { data } = await api.post<AuthAPI>("login", { email, password });
  return data;
}

async function signOut(): Promise<string> {
  const { data } = await api.get<{ message: string }>("profile/logout");
  return data.message;
}

async function signUp(_data: SignUpDataAPI): Promise<UserAPI> {
  const { data } = await api.post<UserAPI>("register", _data);
  return data;
}

async function isEmailAvailable(params: {
  email: string;
}): Promise<FieldAvailabilityAPI> {
  const { data } = await api.get<FieldAvailabilityAPI>("validate-email", {
    params,
  });
  return data;
}

async function isUsernameAvailable(params: {
  username: string;
}): Promise<FieldAvailabilityAPI> {
  const { data } = await api.get<FieldAvailabilityAPI>("validate-username", {
    params,
  });
  return data;
}

export const authApi = {
  signIn,
  signOut,
  signUp,
  isEmailAvailable,
  isUsernameAvailable,
};
