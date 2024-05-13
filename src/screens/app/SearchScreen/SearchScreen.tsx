import React, { useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { User, useUserList } from "@domain";

import { Icon, ProfileUser, Screen, TextInput } from "@components";
import { useDebounce } from "@hooks";

export function SearchScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { list } = useUserList(debouncedSearch);

  function renderItem(items: ListRenderItemInfo<User>) {
    return <ProfileUser user={items.item} />;
  }

  return (
    <Screen
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
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </Screen>
  );
}
