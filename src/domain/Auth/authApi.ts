import { api } from "@api";

import { UserAPI } from "../User";

import { AuthAPI, SignUpDataAPI } from "./authTypes";

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

export const authApi = { signIn, signOut, signUp };
