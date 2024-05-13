import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { User } from "@domain";
import { useSearchHistory, useSearchHistoryService } from "@services";

import { Icon, ProfileUser, Text } from "@components";

export function SearchHistory() {
  const userList = useSearchHistory();
  const { removeUser } = useSearchHistoryService();

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={item}
        avatarProps={{ size: 48, borderRadius: 14 }}
        TrailingComponent={
          <Icon
            name={"trash"}
            onPress={() => removeUser(item.id)}
            color={"primary"}
          />
        }
      />
    );
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
