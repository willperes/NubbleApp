import React from "react";

import { Button, Icon, Screen, Text } from "@components";
import { AuthScreenProps } from "@routes";

export function SuccessScreen({
  navigation,
  route,
}: AuthScreenProps<"SuccessScreen">) {
  const { title, description, iconProps } = route.params;

  function goBackToStart(): void {
    navigation.goBack();
  }

  return (
    <Screen>
      <Icon {...iconProps} />

      <Text preset={"headingLarge"} mt={"s24"}>
        {title}
      </Text>
      <Text preset={"paragraphLarge"} mt={"s16"}>
        {description}
      </Text>

      <Button title={"Voltar ao início"} onPress={goBackToStart} mt={"s40"} />
    </Screen>
  );
}
