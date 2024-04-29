import { api } from "@api";

import { authAdapter } from "./authAdapter";
import { authApi } from "./authApi";
import { AuthCredentials } from "./authTypes";

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentials> {
  try {
    const authAPI = await authApi.signIn(email, password);
    return authAdapter.toAuthCredentials(authAPI);
  } catch (error) {
    throw new Error("Email ou senha inválidos");
  }
}

async function signOut(): Promise<string> {
  const response = await authApi.signOut();
  return response;
}

function updateToken(token: string): void {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken(): void {
  api.defaults.headers.common.Authorization = null;
}

export const authService = { signIn, signOut, updateToken, removeToken };
