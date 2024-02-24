// prettier.config.js
module.exports = {
  bracketSpacing: true,
  semi: true,
  trailingComma: "es5",
  printWidth: 180,
  tabWidth: 2,
  singleQuote:true,
  importOrder: ["^(next/(.*)$)|^(next$)", "^(react/(.*)$)|^(react$)", "<THIRD_PARTY_MODULES>", "^@/components/(.*)$|^components/(.*)$", "^@styles/(.*)$", "^[./]"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  // plugins: ["prettier-plugin-tailwindcss"],
};
