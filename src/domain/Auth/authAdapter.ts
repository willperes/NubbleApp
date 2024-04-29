import { userAdapter } from "../User/userAdapter";

import { AuthCredentials, AuthAPI } from "./authTypes";

function toAuthCredentials(authAPI: AuthAPI): AuthCredentials {
  return {
    token: authAPI.auth.token,
    user: userAdapter.toUser(authAPI.user),
  };
}

export const authAdapter = { toAuthCredentials };
