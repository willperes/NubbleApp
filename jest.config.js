module.exports = {
  collectCoverageFrom: ["src/{components,utils}/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules", "index"],
  moduleDirectories: ["node_modules", "./src/test"],
  modulePathIgnorePatterns: [".*/mockedData/.*"],
  preset: "react-native",
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/.pnpm/(?!@react-native|react-native)",
  ],
};
