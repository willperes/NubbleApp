import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "./src/components/Text/Text";
import { Button } from "./src/components/Button/Button";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./src/theme/theme";
import { Box } from "./src/components/Box/Box";

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box p={"s20"}>
          <Text preset={"headingLarge"} weight={"semiBold"}>
            NubbleApp
          </Text>

          <Button title={"Botão teste"} marginVertical={"s8"} />

          <Button title={"Segundo botão teste"} loading />
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
