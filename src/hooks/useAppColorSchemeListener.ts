import { useEffect } from "react";
import { Appearance } from "react-native";

import { useSettingsService } from "@services";

/** Listen to device color scheme changes. */
export function useAppColorSchemeListener() {
  const { onSystemThemeChange } = useSettingsService();

  useEffect(() => {
    /**
     * Call the onSystemThemeChange function on app start because
     * the listener won't be called until the device color scheme changes.
     */
    onSystemThemeChange(Appearance.getColorScheme());

    const appearenceSubscription = Appearance.addChangeListener(preferences => {
      onSystemThemeChange(preferences.colorScheme);
    });

    return () => {
      appearenceSubscription.remove();
    };
  }, [onSystemThemeChange]);
}
