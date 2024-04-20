import React from "react";

import { Button, Screen, Text } from "@components";
import { AppTabScreenProps } from "@routes";

export function HomeScreen({ navigation }: AppTabScreenProps<"HomeScreen">) {
  return (
    <Screen scrollable>
      <Text preset={"headingLarge"}>Home Screen</Text>

      <Button
        title={"Settings"}
        onPress={() => navigation.navigate("SettingsScreen")}
      />

      <Button
        title={"My Profile"}
        onPress={() => navigation.navigate("MyProfileScreen")}
        mt={"s16"}
      />
    </Screen>
  );
}
