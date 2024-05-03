import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: ["src/{components,utils,hooks}/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules", "index"],
  moduleDirectories: ["node_modules", "./src/test"],
  modulePathIgnorePatterns: [".*/mockedData/.*"],
  preset: "react-native",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/.pnpm/(?!@react-native|react-native)",
  ],
};

export default config;
