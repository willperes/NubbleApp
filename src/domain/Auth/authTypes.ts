import { User, UserAPI } from "../User";

export interface AuthCredentials {
  token: string;
  tokenExpiresAt: string;
  refreshToken: string;
  user: User;
}

export interface AuthCredentialsAPI {
  auth: {
    type: string;
    token: string;
    refreshToken: string;
    expires_at: string;
  };
  user: UserAPI;
}

export type SignInData = {
  username?: string;
  email?: string;
  password: string;
};

export type SignUpData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type SignUpDataAPI = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export interface FieldAvailabilityAPI {
  message: string;
  isAvailable: boolean;
}

export interface ForgotPasswordParamsAPI {
  email: string;
}
