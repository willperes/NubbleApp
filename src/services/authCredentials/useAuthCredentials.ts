import { useContext } from "react";

import { AuthCredentialsService } from "./authCredentialsTypes";
import { AuthCredentialsContext } from "./providers/AuthCredentialsProvider";

export function useAuthCredentials(): AuthCredentialsService {
  const context = useContext(AuthCredentialsContext);

  if (!context) {
    throw new Error(
      "useAuthCredentials must be used within an AuthCredentialsProvider",
    );
  }

  return context;
}
