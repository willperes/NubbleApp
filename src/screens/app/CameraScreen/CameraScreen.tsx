import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";

import { Box, BoxProps, Icon, PermissionManager } from "@components";
import { useAppSafeArea, useAppState } from "@hooks";
import { AppScreenProps } from "@routes";

const CAMERA_VIEW_SIZE = Dimensions.get("screen").width;
const CONTROL_BOX_SIZE =
  (Dimensions.get("screen").height - CAMERA_VIEW_SIZE) / 2;
const CONTROL_DIFF = 30;

export function CameraScreen({ navigation }: AppScreenProps<"CameraScreen">) {
  const { top, bottom } = useAppSafeArea();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back", {
    physicalDevices: [
      "ultra-wide-angle-camera",
      "wide-angle-camera",
      "telephoto-camera",
    ],
  });
  const format = useCameraFormat(device, Templates.Instagram);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";

  function toggleFlash() {
    setFlashOn(prev => !prev);
  }

  async function takePhoto() {
    if (camera.current?.takePhoto) {
      const photoFile = await camera.current.takePhoto({
        flash: flashOn ? "on" : "off",
      });

      navigation.navigate("PublishPostScreen", {
        imageUri: `file://${photoFile.path}`,
      });
    }
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
        {device != null && (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            format={format}
            isActive={isActive}
            photo={true}
            onInitialized={() => setIsCameraReady(true)}
          />
        )}
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
            {isCameraReady && (
              <Icon
                name={"cameraClick"}
                color={"grayWhite"}
                onPress={takePhoto}
              />
            )}
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
