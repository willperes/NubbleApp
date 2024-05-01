import React, { useEffect, useState } from "react";

import { api } from "@api";
import { AuthCredentials, authService } from "@domain";

import { authCredentialsStorage } from "../authCredentialsStorage";
import { AuthCredentialsService } from "../authCredentialsTypes";

export const AuthCredentialsContext =
  React.createContext<AuthCredentialsService>({
    authCredentials: null,
    isLoading: true,
    saveCredentials: async () => {},
    removeCredentials: async () => {},
  });

export function AuthCredentialsProvider({ children }: React.PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function saveCredentials(
    _authCredentials: AuthCredentials,
  ): Promise<void> {
    authService.updateToken(_authCredentials.token);
    await authCredentialsStorage.set(_authCredentials);
    setAuthCredentials(_authCredentials);
  }

  async function removeCredentials(): Promise<void> {
    authService.removeToken();
    await authCredentialsStorage.remove();
    setAuthCredentials(null);
  }

  async function startAuthCredentials(): Promise<void> {
    setIsLoading(true);

    // Simulate loading time on app start
    await new Promise(resolve => setTimeout(() => resolve(null), 500));

    try {
      const credentials = await authCredentialsStorage.get();
      if (credentials) {
        authService.updateToken(credentials.token);
        setAuthCredentials(credentials);
      }
    } catch (err) {
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    startAuthCredentials();
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      async error => {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          const failedRequest = error.config;
          const isRefreshTokenRequest =
            authService.isRefreshTokenRequest(error);
          const hasNoRefreshToken = !authCredentials?.refreshToken;
          if (
            hasNoRefreshToken ||
            isRefreshTokenRequest ||
            failedRequest.sent
          ) {
            removeCredentials();
            return Promise.reject(error);
          }

          failedRequest.sent = true;

          const updatedCredentials = await authService.refreshToken(
            authCredentials.refreshToken,
          );
          saveCredentials(updatedCredentials);

          failedRequest.headers.Authorization = `Bearer ${updatedCredentials.token}`;
          return api(failedRequest);
        }
      },
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [authCredentials?.refreshToken]);

  return (
    <AuthCredentialsContext.Provider
      value={{ authCredentials, isLoading, saveCredentials, removeCredentials }}
    >
      {children}
    </AuthCredentialsContext.Provider>
  );
}
