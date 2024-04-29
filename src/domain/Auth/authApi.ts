import { api } from "@api";

import { AuthAPI } from "./authTypes";

async function signIn(email: string, password: string): Promise<AuthAPI> {
  const { data } = await api.post<AuthAPI>("login", { email, password });
  return data;
}

async function signOut(): Promise<string> {
  const { data } = await api.get<{ message: string }>("profile/logout");
  return data.message;
}

export const authApi = { signIn, signOut };
