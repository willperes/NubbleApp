import React from "react";

import { useAuthSignOut } from "@domain";

import { Button, Screen } from "@components";

export function SettingsScreen() {
  const { isLoading, signOut } = useAuthSignOut();

  return (
    <Screen scrollable canGoBack title={"Configurações"}>
      <Button loading={isLoading} title={"Sair da conta"} onPress={signOut} />
    </Screen>
  );
}
