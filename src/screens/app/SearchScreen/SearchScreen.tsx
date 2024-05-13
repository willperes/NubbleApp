import React, { useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { User, useUserList } from "@domain";
import { useSearchHistoryService } from "@services";

import { Icon, ProfileUser, Screen, TextInput } from "@components";
import { useDebounce } from "@hooks";

import { SearchHistory } from "./components/SearchHistory";

export function SearchScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { list } = useUserList(debouncedSearch);
  const { addUser } = useSearchHistoryService();

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={item}
        onPress={() => addUser(item)}
        avatarProps={{ size: 48, borderRadius: 14 }}
      />
    );
  }

  return (
    <Screen
      flex={1}
      canGoBack
      HeaderComponent={
        <TextInput
          value={search}
          onChangeText={setSearch}
          LeadingComponent={<Icon name={"search"} color={"gray3"} size={16} />}
          placeholder={"Digite sua busca"}
        />
      }
    >
      {search.length === 0 ? (
        <SearchHistory />
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Screen>
  );
}
