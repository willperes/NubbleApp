import { api } from "@api";

import { authAdapter } from "./authAdapter";
import { authApi } from "./authApi";
import { AuthCredentials, SignUpData } from "./authTypes";

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

async function signUp(data: SignUpData): Promise<void> {
  await authApi.signUp(data);
}

async function isEmailAvailable(email: string): Promise<boolean> {
  const { isAvailable } = await authApi.isEmailAvailable({ email });
  return isAvailable;
}

async function isUsernameAvailable(username: string): Promise<boolean> {
  const { isAvailable } = await authApi.isUsernameAvailable({
    username,
  });
  return isAvailable;
}

async function requestNewPassword(email: string): Promise<string> {
  const { message } = await authApi.forgotPassword({ email });
  return message;
}

function updateToken(token: string): void {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken(): void {
  api.defaults.headers.common.Authorization = null;
}

export const authService = {
  signIn,
  signOut,
  signUp,
  isEmailAvailable,
  isUsernameAvailable,
  requestNewPassword,
  updateToken,
  removeToken,
};
