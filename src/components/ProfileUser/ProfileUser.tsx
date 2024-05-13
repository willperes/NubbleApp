import React from "react";
import { GestureResponderEvent } from "react-native";

import { User } from "@domain";
import { useNavigation } from "@react-navigation/native";

import {
  PressableBox,
  PressableBoxProps,
  ProfileAvatar,
  Text,
} from "@components";

type ProfileUserProps = {
  user: Pick<User, "profileUrl" | "id" | "username">;
} & PressableBoxProps;

export function ProfileUser({
  user,
  onPress,
  ...pressableBoxProps
}: ProfileUserProps) {
  const navigation = useNavigation();

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event);
    }

    navigation.navigate("ProfileScreen", { userId: user.id });
  }

  return (
    <PressableBox
      flexDirection={"row"}
      mb={"s16"}
      onPress={handleOnPress}
      {...pressableBoxProps}
    >
      <ProfileAvatar imageURL={user.profileUrl} />
      <Text ml={"s12"} preset={"paragraphMedium"}>
        {user.username}
      </Text>
    </PressableBox>
  );
}
