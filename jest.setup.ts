import "@testing-library/react-native/extend-expect";

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
