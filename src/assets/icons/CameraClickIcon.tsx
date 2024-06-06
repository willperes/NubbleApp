import React from "react";

import { Svg, Circle } from "react-native-svg";

import { IconBaseProps } from "../../components/Icon/Icon";

export function CameraClickIcon({ size = 80, color = "white" }: IconBaseProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Circle cx="40" cy="40" r="34" fill={color} />
      <Circle cx="40" cy="40" r="39" stroke={color} stroke-width="2" />
    </Svg>
  );
}
