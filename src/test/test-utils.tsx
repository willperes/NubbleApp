import React from "react";

import { ThemeProvider } from "@shopify/restyle";
import { RenderOptions, render } from "@testing-library/react-native";

import { theme } from "@theme";

function AllTheProviders({ children }: React.PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

function customRender<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> {
  return render(component, { wrapper: AllTheProviders, ...options });
}

export * from "@testing-library/react-native";
export { customRender as render };
