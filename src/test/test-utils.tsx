import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { RenderOptions, render } from "@testing-library/react-native";

import { theme } from "@theme";

function AllTheProviders({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
}

function customRender<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> {
  return render(component, { wrapper: AllTheProviders, ...options });
}

export * from "@testing-library/react-native";
export { customRender as render };