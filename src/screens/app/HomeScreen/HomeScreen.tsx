import React from "react";

import { Button, Screen, Text } from "@components";
import { AppScreenProps } from "@routes";

export function HomeScreen({ navigation }: AppScreenProps<"HomeScreen">) {
  return (
    <Screen scrollable>
      <Text preset={"headingLarge"}>Home Screen</Text>

      <Button
        title={"settings"}
        onPress={() => navigation.navigate("SettingsScreen")}
      />
    </Screen>
  );
}
