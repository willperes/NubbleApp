module.exports = {
  root: true,
  extends: [
    "@react-native",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["import", "@tanstack/query"],
  rules: {
    "object-curly-spacing": 0,
    "array-bracket-spacing": 2,
    "react-native/no-inline-styles": 0,
    "react-hooks/exhaustive-deps": 0,
    quotes: [2, "double"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "import/order": [
          "error",
          {
            groups: ["external", "builtin", "internal", "parent", "sibling"],
            pathGroups: [
              {
                pattern: "react+(|-native)",
                group: "external",
                position: "before",
              },
              {
                pattern: "@+(routes|screens|components|hooks|theme)",
                group: "internal",
                position: "before",
              },
              {
                pattern: "./",
                group: "internal",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: ["react+(|-native)"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
          },
        ],
      },
    },
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
