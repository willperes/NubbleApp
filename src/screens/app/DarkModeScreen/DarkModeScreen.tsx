import React, { useState } from "react";

import { RadioButtonSelector, Screen } from "@components";

type ThemePreference = "light" | "dark" | "system";
type Options = {
  label: string;
  description?: string;
  value: ThemePreference;
};
const selectorItems: Options[] = [
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
  const [selectedOption, setSelectedOption] = useState<Options>();

  return (
    <Screen canGoBack title={"Modo escuro"}>
      <RadioButtonSelector
        items={selectorItems}
        selectedItem={selectedOption}
        onSelect={setSelectedOption}
        labelKey={"label"}
        descriptionKey={"description"}
        valueKey={"label"}
      />
    </Screen>
  );
}
