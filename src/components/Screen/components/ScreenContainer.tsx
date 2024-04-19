import React from "react";
import { ScrollView, View } from "react-native";

interface Props {
  children: React.ReactElement;
  backgroundColor: string;
}

export function ScrollViewContainer({ children, backgroundColor }: Props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={{ flex: 1, backgroundColor }}
    >
      {children}
    </ScrollView>
  );
}

export function ViewContainer({ children, backgroundColor }: Props) {
  return <View style={{ flex: 1, backgroundColor }}>{children}</View>;
}
