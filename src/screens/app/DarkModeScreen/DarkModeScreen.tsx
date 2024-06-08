import React from "react";

import {
  RadioButtonSelector,
  RadioButtonSelectorProps,
  Screen,
} from "@components";

const selectorItems: RadioButtonSelectorProps["items"] = [
  { label: "Ativado" },
  { label: "Desativado" },
  {
    label: "Padrão do sistema",
    description:
      "A aparência será a mesma que você configurou no seu dispositivo",
  },
];

export function DarkModeScreen() {
  return (
    <Screen canGoBack title={"Modo escuro"}>
      <RadioButtonSelector items={selectorItems} />
    </Screen>
  );
}
