import React from "react";

import { AuthCredentialsProvider, useAppColorScheme } from "@services";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Toast } from "@components";
import { Router } from "@routes";
import { darkTheme, theme } from "@theme";

import { initializeStorage, mmkvStorage } from "./src/services/storage";

const queryClient = new QueryClient();
initializeStorage(mmkvStorage);

function App(): React.JSX.Element {
  const appColorScheme = useAppColorScheme();

  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={appColorScheme === "light" ? theme : darkTheme}>
            <Router />
            <Toast />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
