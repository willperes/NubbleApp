import { createText } from "@shopify/restyle";
import { Theme } from "@theme";
import React from "react";
import { TextStyle } from "react-native";

const SRText = createText<Theme>();
type SRTextProps = React.ComponentProps<typeof SRText>;

interface TextProps extends SRTextProps {
    preset?: TextVariants;
    weight?: FontWeight;
    italic?: boolean;
}

export function Text({
    preset = "paragraphMedium",
    weight = "regular",
    italic = false,
    children,
    style,
    ...srTextProps
}: TextProps) {
    const fontFamily = getFontFamily(preset, weight, italic);

    return (
        <SRText
            color={"backgroundContrast"}
            style={[$fontSizes[preset], { fontFamily }, style]}
            {...srTextProps}
        >
            {children}
        </SRText>
    );
}

type TextVariants =
    | "headingLarge"
    | "headingSmall"
    | "headingMedium"
    | "paragraphLarge"
    | "paragraphMedium"
    | "paragraphSmall"
    | "paragraphCaption"
    | "paragraphCaptionSmall";

export const $fontSizes: Record<
    TextVariants,
    Pick<TextStyle, "fontSize" | "lineHeight">
> = {
    headingLarge: { fontSize: 32, lineHeight: 38.4 },
    headingMedium: { fontSize: 22, lineHeight: 26.4 },
    headingSmall: { fontSize: 18, lineHeight: 23.4 },

    paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
    paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
    paragraphSmall: { fontSize: 14, lineHeight: 19.6 },

    paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
    paragraphCaptionSmall: { fontSize: 19, lineHeight: 14 },
};

type FontWeight = "bold" | "semiBold" | "regular";
type FontStyle = "normal" | "italic";

export const $fontFamily: Record<FontWeight, Record<FontStyle, string>> = {
    bold: {
        normal: "Satoshi-Bold",
        italic: "Satoshi-BoldItalic",
    },
    semiBold: {
        normal: "Satoshi-Bold",
        italic: "Satoshi-BoldItalic",
    },
    regular: {
        normal: "Satoshi-Regular",
        italic: "Satoshi-Italic",
    },
};

function getFontFamily(
    preset: TextVariants,
    weight: FontWeight,
    italic: boolean,
): string {
    if (preset.match(/^heading/)) {
        weight = "bold";
    }

    return $fontFamily[weight][italic ? "italic" : "normal"];
}
