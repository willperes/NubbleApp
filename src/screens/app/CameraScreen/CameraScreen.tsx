import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Box, BoxProps, Icon, PermissionManager } from "@components";
import { useAppSafeArea } from "@hooks";
import { AppScreenProps } from "@routes";

const CAMERA_VIEW_SIZE = Dimensions.get("screen").width;
const CONTROL_BOX_SIZE =
  (Dimensions.get("screen").height - CAMERA_VIEW_SIZE) / 2;
const CONTROL_DIFF = 30;

export function CameraScreen({ navigation }: AppScreenProps<"CameraScreen">) {
  const { top, bottom } = useAppSafeArea();
  const [flashOn, setFlashOn] = useState(false);

  function toggleFlash() {
    setFlashOn(prev => !prev);
  }

  return (
    <PermissionManager
      permissionName={"camera"}
      description={
        "Permita o Nubble acessar sua câmera para criar um novo post."
      }
    >
      <Box flex={1}>
        <Box backgroundColor={"grayWhite"} style={StyleSheet.absoluteFill} />
        <Box flex={1} justifyContent={"space-between"}>
          <Box {...$controlAreaTop} style={{ paddingTop: top }}>
            <Icon
              name={"arrowLeft"}
              size={20}
              color={"grayWhite"}
              onPress={navigation.goBack}
            />
            <Icon
              name={flashOn ? "flashOn" : "flashOff"}
              size={20}
              color={"grayWhite"}
              onPress={toggleFlash}
            />
            <Box height={20} width={20} />
          </Box>
          <Box {...$controlAreaBottom} style={{ paddingBottom: bottom }}>
            <Icon name={"cameraClick"} color={"grayWhite"} />
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  );
}

const $controlAreaTop: BoxProps = {
  height: CONTROL_BOX_SIZE - CONTROL_DIFF,
  backgroundColor: "black60",
  paddingHorizontal: "s24",
  flexDirection: "row",
  justifyContent: "space-between",
};

const $controlAreaBottom: BoxProps = {
  height: CONTROL_BOX_SIZE + CONTROL_DIFF,
  backgroundColor: "black60",
  justifyContent: "center",
  alignItems: "center",
};
