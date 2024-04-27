import React from "react";
import { ScrollView, RefreshControl } from "react-native";

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
  const { user, isLoading, isFetching, refetch } = useUserGetById(userId);

  return (
    <Screen flex={1} canGoBack>
      <>
        {isLoading && <ActivityIndicator color={"primary"} />}
        {user && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
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
          </ScrollView>
        )}
      </>
    </Screen>
  );
}
