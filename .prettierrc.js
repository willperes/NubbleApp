module.exports = {
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  singleQuote: false,
  trailingComma: "all",
  importOrder: ["^@assets/(.*)$", "^@components/(.*)$", "^@hooks/(.*)$", "^@routes/(.*)$", "^@screens/(.*)$", "^@theme/(.*)$", "<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"]
};
