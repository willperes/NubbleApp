import "@testing-library/react-native/extend-expect";
// import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

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

// jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);
