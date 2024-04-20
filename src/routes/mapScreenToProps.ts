import { IconProps } from "@components";

import { AppTabBottomTabParamList } from "./AppTabNavigator";

type AppTabScreen = keyof AppTabBottomTabParamList;
type Props = {
  label: string;
  icon: {
    focused: IconProps["name"];
    unfocused: IconProps["name"];
  };
};

export const mapScreenToProps: Record<AppTabScreen, Props> = {
  HomeScreen: {
    label: "Início",
    icon: {
      focused: "homeFill",
      unfocused: "home",
    },
  },
  NewPostScreen: {
    label: "Novo post",
    icon: {
      focused: "newPost",
      unfocused: "newPost",
    },
  },
  FavoriteScreen: {
    label: "Favoritos",
    icon: {
      focused: "bookmarkFill",
      unfocused: "bookmark",
    },
  },
  MyProfileScreen: {
    label: "Meu perfil",
    icon: {
      focused: "profileFill",
      unfocused: "profile",
    },
  },
};
