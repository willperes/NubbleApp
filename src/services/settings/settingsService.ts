import { Appearance, ColorSchemeName } from "react-native";

import { AppColorScheme, ThemePreference } from "./settingsTypes";

function onChangeThemePreference(
  themePreference: ThemePreference,
): AppColorScheme {
  if (themePreference !== "system") {
    return themePreference;
  }

  const systemColorScheme = Appearance.getColorScheme();
  return systemColorScheme ?? "light";
}

function onSystemThemeChange(
  colorScheme: ColorSchemeName,
  themePreference: ThemePreference,
): AppColorScheme | null {
  if (themePreference !== "system") {
    return null;
  }

  return colorScheme ?? "light";
}

export const settingsService = { onChangeThemePreference, onSystemThemeChange };
