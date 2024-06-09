import { create } from "zustand";
import { persist } from "zustand/middleware";

import { storage } from "../storage";

import { settingsService } from "./settingsService";
import { SettingsStore } from "./settingsTypes";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      appColorScheme: "light",
      themePreference: "system",
      onSystemThemeChange: color => {
        const updatedTheme = settingsService.onSystemThemeChange(
          color,
          get().themePreference,
        );
        if (updatedTheme) {
          set({ appColorScheme: updatedTheme });
        }
      },
      setThemePreference: themePreference => {
        const updatedTheme =
          settingsService.onChangeThemePreference(themePreference);
        set({ appColorScheme: updatedTheme, themePreference });
      },
    }),
    {
      name: "@Settings",
      storage: storage,
    },
  ),
);

export function useAppColorScheme(): SettingsStore["appColorScheme"] {
  const appTheme = useSettingsStore(state => state.appColorScheme);
  return appTheme;
}

export function useThemePreference(): SettingsStore["themePreference"] {
  const themePreference = useSettingsStore(state => state.themePreference);
  return themePreference;
}

export function useSettingsService(): Pick<
  SettingsStore,
  "onSystemThemeChange" | "setThemePreference"
> {
  const onSystemThemeChange = useSettingsStore(
    state => state.onSystemThemeChange,
  );
  const setThemePreference = useSettingsStore(
    state => state.setThemePreference,
  );

  return { onSystemThemeChange, setThemePreference };
}
