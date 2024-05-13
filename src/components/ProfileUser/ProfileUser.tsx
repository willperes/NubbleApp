import React from "react";
import { GestureResponderEvent } from "react-native";

import { User } from "@domain";
import { useNavigation } from "@react-navigation/native";

import {
  Box,
  PressableBox,
  PressableBoxProps,
  ProfileAvatar,
  ProfileAvatarProps,
  Text,
} from "@components";

type ProfileUserProps = {
  user: Pick<User, "profileUrl" | "id" | "username">;
  avatarProps?: Partial<Omit<ProfileAvatarProps, "imageURL">>;
  TrailingComponent?: React.ReactElement;
} & PressableBoxProps;

export function ProfileUser({
  user,
  avatarProps,
  TrailingComponent,
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
      alignItems={"center"}
      justifyContent={"space-between"}
      mb={"s16"}
      onPress={handleOnPress}
      {...pressableBoxProps}
    >
      <Box flexDirection={"row"} alignItems={"center"}>
        <ProfileAvatar {...avatarProps} imageURL={user.profileUrl} />
        <Text ml={"s12"} preset={"paragraphMedium"}>
          {user.username}
        </Text>
      </Box>
      {TrailingComponent && TrailingComponent}
    </PressableBox>
  );
}
