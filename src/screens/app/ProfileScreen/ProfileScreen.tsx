import React from "react";

import { useUserGetById } from "@domain";

import {
  ActivityIndicator,
  Box,
  ProfileAvatar,
  Screen,
  Text,
} from "@components";
import { AppScreenProps } from "@routes";

export function ProfileScreen({ route }: AppScreenProps<"ProfileScreen">) {
  const { userId } = route.params;
  const { user, loading } = useUserGetById(userId);

  return (
    <Screen scrollable canGoBack>
      <>
        {loading && <ActivityIndicator color={"primary"} />}
        {user && (
          <Box alignItems={"center"}>
            <ProfileAvatar size={64} imageURL={user.profileUrl} />

            <Text preset={"headingMedium"} weight={"bold"} mt={"s16"}>
              {user.fullName}
            </Text>

            <Text
              preset={"paragraphLarge"}
              color={"gray1"}
            >{`@${user.username}`}</Text>
          </Box>
        )}
      </>
    </Screen>
  );
}
