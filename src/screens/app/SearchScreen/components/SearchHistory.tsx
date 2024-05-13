import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { User } from "@domain";
import { useSearchHistory } from "@services";

import { ProfileUser, Text } from "@components";

export function SearchHistory() {
  const userList = useSearchHistory();

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return <ProfileUser user={item} />;
  }

  return (
    <FlatList
      data={userList}
      renderItem={renderItem}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      ListHeaderComponent={
        <Text preset={"headingMedium"} weight={"bold"} mb={"s16"}>
          Buscas recentes
        </Text>
      }
    />
  );
}
