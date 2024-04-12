import { ThemeColor } from "../../theme/theme";
import { TouchableOpacityBoxProps } from "../Box/Box";

export type ButtonPreset = "primary" | "outline";

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: ThemeColor;
}

const primary: ButtonUI = {
  container: {
    backgroundColor: "primary",
  },
  content: "primaryContrast",
};

const outline: ButtonUI = {
  container: {
    borderWidth: 1,
    borderColor: "primary",
  },
  content: "primary",
};

export const buttonPresets: Record<ButtonPreset, ButtonUI> = {
  primary,
  outline,
};