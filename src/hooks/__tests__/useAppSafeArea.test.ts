import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { renderHook } from "test-utils";

import { theme } from "@theme";

import { useAppSafeArea } from "../useAppSafeArea";

const mockedUseSafeAreaInsets = jest.mocked(useSafeAreaInsets);

describe("useAppSafeArea", () => {
  it("should return static values when they exceed safe area values", () => {
    mockedUseSafeAreaInsets.mockImplementation(
      () => ({ top: 10, bottom: 10 } as EdgeInsets),
    );

    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(theme.spacing.s20);
    expect(result.current.bottom).toEqual(theme.spacing.s20);
  });

  it("should return safe area values when they exceed static values", () => {
    mockedUseSafeAreaInsets.mockImplementation(
      () => ({ top: 30, bottom: 30 } as EdgeInsets),
    );

    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(30);
    expect(result.current.bottom).toEqual(30);
  });
});
