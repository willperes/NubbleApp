module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/.pnpm/(?!@react-native|react-native)",
  ],
  coveragePathIgnorePatterns: ["/node_modules", "index"],
  collectCoverageFrom: ["src/{components,utils}/**/*.{js,jsx,ts,tsx}"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
