import React from "react";

import {
  ThemePreference,
  useSettingsService,
  useThemePreference,
} from "@services";

import { RadioButtonSelector, Screen } from "@components";

type Option = {
  label: string;
  description?: string;
  value: ThemePreference;
};
const selectorItems: Option[] = [
  { label: "Ativado", value: "dark" },
  { label: "Desativado", value: "light" },
  {
    label: "Padrão do sistema",
    description:
      "A aparência será a mesma que você configurou no seu dispositivo",
    value: "system",
  },
];

export function DarkModeScreen() {
  const { setThemePreference } = useSettingsService();
  const themePreference = useThemePreference();
  const selectedItem = selectorItems.find(
    item => item.value === themePreference,
  );

  function setSelectedItem(item: Option) {
    setThemePreference(item.value);
  }

  return (
    <Screen canGoBack title={"Modo escuro"}>
      <RadioButtonSelector
        items={selectorItems}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        labelKey={"label"}
        descriptionKey={"description"}
        valueKey={"label"}
      />
    </Screen>
  );
}
