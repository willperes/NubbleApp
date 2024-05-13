import React, { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

import { Toast as ToastType, useToast, useToastService } from "@services";

import { ToastContent } from "./components/ToastContent";

const DEFAULT_DURATION = 5000;

export function Toast() {
  const toast = useToast();
  const { hideToast } = useToastService();

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const runEnterAnimation = useCallback(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  const runExitAnimation = useCallback(
    (callback: Animated.EndCallback) => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(callback);
    },
    [fadeAnimation],
  );

  useEffect(() => {
    if (toast) {
      runEnterAnimation();

      setTimeout(() => {
        runExitAnimation(hideToast);
      }, toast?.duration || DEFAULT_DURATION);
    }
  }, [toast]);

  if (!toast) {
    return null;
  }

  const position: ToastType.Position = toast?.position || "top";

  return (
    <Animated.View
      testID={"Toast"}
      style={{
        position: "absolute",
        alignSelf: "center",
        [position]: 75,
        opacity: fadeAnimation,
      }}
    >
      <ToastContent toast={toast} />
    </Animated.View>
  );
}
