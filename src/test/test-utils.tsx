import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthCredentialsProvider, ToastProvider } from "@services";
import { ThemeProvider } from "@shopify/restyle";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from "@testing-library/react-native";

import { Toast } from "@components";
import { theme } from "@theme";

const queryClientConfig: QueryClientConfig = {
  logger: {
    log: console.log,
    warn: console.log,
    error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  },
  defaultOptions: {
    queries: { retry: false, cacheTime: Infinity },
    mutations: { retry: false, cacheTime: Infinity },
  },
};

export function wrapAllProviders() {
  const queryClient = new QueryClient(queryClientConfig);

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
  return render(component, { wrapper: wrapAllProviders(), ...options });
}

export function wrapScreenProviders() {
  const queryClient = new QueryClient(queryClientConfig);

  return ({ children }: React.PropsWithChildren) => (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <NavigationContainer>{children}</NavigationContainer>
            <Toast />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export function renderScreen<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> {
  return render(component, { wrapper: wrapScreenProviders(), ...options });
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, "wrapper">,
) {
  return renderHook(renderCallback, {
    ...options,
    wrapper: wrapAllProviders(),
  });
}

export * from "@testing-library/react-native";
export { customRender as render, customRenderHook as renderHook };
