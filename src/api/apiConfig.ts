import { AuthCredentials, authService } from "@domain";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:3333/";
export const api = axios.create({
  baseURL: BASE_URL,
});

type InterceptorProps = {
  authCredentials: AuthCredentials | null;
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
};

export function registerInterceptor({
  authCredentials,
  saveCredentials,
  removeCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async error => {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        const failedRequest = error.config;
        const isRefreshTokenRequest = authService.isRefreshTokenRequest(error);
        const hasNoRefreshToken = !authCredentials?.refreshToken;
        if (hasNoRefreshToken || isRefreshTokenRequest || failedRequest.sent) {
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

      return Promise.reject(error);
    },
  );

  return () => {
    api.interceptors.response.eject(interceptor);
  };
}
