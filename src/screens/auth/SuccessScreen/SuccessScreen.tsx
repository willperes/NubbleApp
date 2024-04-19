import React from "react";
import { Screen, Icon, Text, Button } from "@components";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../routes/Routes";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "SuccessScreen">;

export function SuccessScreen({ navigation, route }: ScreenProps) {
    const { title, description, iconProps } = route.params;

    function goBackToStart(): void {
        navigation.goBack();
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
