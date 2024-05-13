import React from "react";
import { Pressable } from "react-native";

import { User } from "@domain";
import { useNavigation } from "@react-navigation/native";

import { Box, ProfileAvatar, Text } from "@components";

type ProfileUserProps = { user: Pick<User, "profileUrl" | "id" | "username"> };

export function ProfileUser({ user }: ProfileUserProps) {
  const navigation = useNavigation();

  function navigateToProfile() {
    navigation.navigate("ProfileScreen", { userId: user.id });
  }

  return (
    <Pressable onPress={navigateToProfile}>
      <Box flexDirection={"row"} mb={"s16"}>
        <ProfileAvatar imageURL={user.profileUrl} />
        <Text ml={"s12"} preset={"paragraphMedium"}>
          {user.username}
        </Text>
      </Box>
    </Pressable>
  );
}