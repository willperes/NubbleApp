import React, { useState } from "react";

import { useUserList } from "@domain";

import { Icon, Screen, Text, TextInput } from "@components";
import { useDebounce } from "@hooks";

export function SearchScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { list } = useUserList(debouncedSearch);

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
      {list.map(user => (
        <Text key={user.id}>{user.username}</Text>
      ))}
    </Screen>
  );
}
