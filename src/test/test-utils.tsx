import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from "@testing-library/react-native";

import { theme } from "@theme";

export function wrapperAllProviders() {
  const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.log,
      error: process.env.NODE_ENV === "test" ? () => {} : console.error,
    },
    defaultOptions: {
      queries: { retry: false, cacheTime: Infinity },
      mutations: { retry: false, cacheTime: Infinity },
    },
  });

  return ({ children }: React.PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function customRender<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> {
  return render(component, { wrapper: wrapperAllProviders(), ...options });
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, "wrapper">,
) {
  return renderHook(renderCallback, {
    ...options,
    wrapper: wrapperAllProviders(),
  });
}

export * from "@testing-library/react-native";
export { customRender as render, customRenderHook as renderHook };
