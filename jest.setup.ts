import "@testing-library/react-native/extend-expect";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { initializeStorage } from "./src/services/storage";
import { inMemoryStorage } from "./src/services/storage/implementation/jest/inMemoryStorage";

jest.mock("@react-navigation/native", () => {
  const originalModule = jest.requireActual("@react-navigation/native");

  return {
    ...originalModule,
    useNavigation: () => ({
      ...originalModule.useNavigation,
      navigate: jest.fn(),
    }),
  };
});

jest.mock("react-native-safe-area-context", () => ({
  ...mockSafeAreaContext,
  useSafeAreaInsets: jest.fn(mockSafeAreaContext.useSafeAreaInsets),
}));

jest.mock("@react-native-camera-roll/camera-roll", () => ({
  CameraRoll: {
    getPhotos: jest.fn(async () => ({
      edges: [
        { node: { image: { uri: "image-1" } } },
        { node: { image: { uri: "image-2" } } },
        { node: { image: { uri: "image-3" } } },
      ],
    })),
  },
}));

initializeStorage(inMemoryStorage);
