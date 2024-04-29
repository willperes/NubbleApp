import { User, UserAPI } from "../User";

export interface AuthCredentials {
  token: string;
  user: User;
}

export interface AuthAPI {
  auth: {
    type: string;
    token: string;
  };
  user: UserAPI;
}

export type SignInData = {
  username?: string;
  email?: string;
  password: string;
};
