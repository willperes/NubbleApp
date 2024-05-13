import React, { useState } from "react";

import { Box, Icon, Screen, TextInput } from "@components";

export function SearchScreen() {
  const [search, setSearch] = useState("");

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
      <Box />
    </Screen>
  );
}
