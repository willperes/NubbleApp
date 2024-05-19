import React from "react";
import { Linking, Platform } from "react-native";

import { PermissionName, usePermission } from "@services";

import { ActivityIndicator, Box, Button, Screen, Text } from "@components";

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
        <Box>
          {Platform.OS === "android" && (
            <Text
              preset={"paragraphMedium"}
              marginVertical={"s16"}
              textAlign={"center"}
              color={"error"}
              weight={"semiBold"}
            >
              É necessário fechar e abrir o App novamente após alterar as
              configurações
            </Text>
          )}
          <Button
            title={"Abrir Configurações"}
            onPress={Linking.openSettings}
          />
        </Box>
      )}
    </Screen>
  );
}
