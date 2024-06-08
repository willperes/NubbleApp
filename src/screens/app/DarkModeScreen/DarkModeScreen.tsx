import React from "react";

import { Screen, Text } from "@components";

export function DarkModeScreen() {
  return (
    <Screen canGoBack title={"Modo escuro"}>
      <Text>Dark Mode</Text>
    </Screen>
  );
}
