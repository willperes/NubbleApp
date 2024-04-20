import React from "react";

import { Screen, Text } from "@components";

export function SettingsScreen() {
  return (
    <Screen scrollable canGoBack>
      <Text preset={"headingSmall"}>Settings Screen</Text>
    </Screen>
  );
}
