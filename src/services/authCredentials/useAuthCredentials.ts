import { create } from "zustand";

import { AuthCredentialsService } from "./authCredentialsTypes";

export function useAuthCredentials(): AuthCredentialsService {
  // return {
  //   authCredentials: null,
  //   isLoading: false,
  //   saveCredentials: () => {},
  //   remove: () => {},
  // };

  return useAuthCredentialsZustand();
}

const useAuthCredentialsZustand = create<AuthCredentialsService>(set => ({
  authCredentials: null,
  isLoading: false,
  saveCredentials: async authCredentials => set({ authCredentials }),
  remove: async () => set({ authCredentials: null }),
}));
