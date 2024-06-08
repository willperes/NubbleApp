import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { useAuthSignOut } from "@domain";

import { Button, Screen, Separator } from "@components";
import { AppScreenProps } from "@routes";

import { MenuItem, MenuItemProps } from "./components/MenuItem/MenuItem";

export function SettingsScreen({
  navigation,
}: AppScreenProps<"SettingsScreen">) {
  const { isLoading, signOut } = useAuthSignOut();

  const items: MenuItemProps[] = [
    { label: "Termos de uso", onPress: () => {} },
    { label: "Política de privacidade", onPress: () => {} },
    {
      label: "Modo escuro",
      onPress: () => {
        navigation.navigate("DarkModeScreen");
      },
    },
  ];

  function renderItem({ item }: ListRenderItemInfo<MenuItemProps>) {
    return <MenuItem {...item} />;
  }

  return (
    <Screen canGoBack title={"Configurações"}>
      <FlatList
        data={items}
        bounces={false}
        keyExtractor={({ label }) => label}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={
          <Button
            mt={"s32"}
            loading={isLoading}
            title={"Sair da conta"}
            onPress={signOut}
          />
        }
      />
    </Screen>
  );
}
