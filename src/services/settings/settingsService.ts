import { Appearance, ColorSchemeName, Platform, StatusBar } from "react-native";

import { colors } from "@theme";

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

function handleStatusBar(appColorScheme: AppColorScheme) {
  StatusBar.setBarStyle(
    appColorScheme === "dark" ? "light-content" : "dark-content",
    true,
  );

  if (Platform.OS === "android") {
    StatusBar.setBackgroundColor(
      appColorScheme === "dark"
        ? colors.palette.grayBlack
        : colors.palette.grayWhite,
    );
  }
}

export const settingsService = {
  onChangeThemePreference,
  onSystemThemeChange,
  handleStatusBar,
};
