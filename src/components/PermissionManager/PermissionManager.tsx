import React from "react";
import { Linking } from "react-native";

import { PermissionName, usePermission } from "@services";

import { ActivityIndicator, Button, Screen, Text } from "@components";

interface PermissionManagerProps {
  permissionName: PermissionName;
  description: string;
}

export function PermissionManager({
  permissionName,
  description,
  children,
}: React.PropsWithChildren<PermissionManagerProps>) {
  const { status, isLoading } = usePermission(permissionName);

  if (status === "granted") {
    return <>{children}</>;
  }

  return (
    <Screen flex={1} justifyContent={"center"} alignItems={"center"}>
      <Text preset={"headingSmall"} textAlign={"center"}>
        {description}
      </Text>
      {isLoading && <ActivityIndicator color={"primary"} />}
      {status === "never_ask_again" && (
        <Button
          title={"Abrir Configurações"}
          onPress={Linking.openSettings}
          mt={"s16"}
        />
      )}
    </Screen>
  );
}
