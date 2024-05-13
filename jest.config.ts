import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: [
    "src/{components,domain,hooks,screens,utils}/**/*.{js,jsx,ts,tsx}",
  ],
  coveragePathIgnorePatterns: ["/node_modules", "index"],
  moduleDirectories: ["node_modules", "./src/test"],
  modulePathIgnorePatterns: [".*/mockedData/.*"],
  preset: "react-native",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context|@react-navigation)/)",
  ],
};

export default config;
