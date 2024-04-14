import React from "react";
import { Screen } from "../../../components/Screen/Screen";
import { Icon } from "../../../components/Icon/Icon";
import { Text } from "../../../components/Text/Text";
import { Button } from "../../../components/Button/Button";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../routes/Routes";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "SuccessScreen">;

export function SuccessScreen({ route }: ScreenProps) {
    const { title, description, iconProps } = route.params;

    function goBackToStart(): void {
        // TODO: this
    }

    return (
        <Screen>
            <Icon {...iconProps} />

            <Text preset={"headingLarge"} mt={"s24"}>
                {title}
            </Text>
            <Text preset={"paragraphLarge"} mt={"s16"}>
                {description}
            </Text>

            <Button
                title={"Voltar ao início"}
                onPress={goBackToStart}
                mt={"s40"}
            />
        </Screen>
    );
}
