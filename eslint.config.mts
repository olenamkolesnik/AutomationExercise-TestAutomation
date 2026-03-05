/* eslint.config.js */
module.exports = [
  {
    files: ["**/*.{js,ts}"],

    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "playwright": require("eslint-plugin-playwright"),
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
      "unused-imports": require("eslint-plugin-unused-imports"),
    },

    rules: {
      // TypeScript safety
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off", // handled by unused-imports

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",

      // Playwright best practices
      "playwright/no-focused-test": "error",
      "playwright/no-page-pause": "warn",

      // General
      "no-console": "warn",
    },
  },
];