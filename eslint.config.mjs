import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import checkFile from "eslint-plugin-check-file";
import playwright from "eslint-plugin-playwright";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "check-file": checkFile,
      playwright: playwright,
    },
    rules: {
      // --- THE QUOTE RULE (Integrated) ---
      quotes: [
        "error",
        "single",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],

      // --- STRUCTURAL CLEANLINESS ---
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      semi: ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],

      // --- NAMING CONVENTIONS ---
      "@typescript-eslint/naming-convention": [
        "error",
        // Methods must be camelCase
        { selector: "method", format: ["camelCase"] },

        // Functions must be camelCase
        { selector: "function", format: ["camelCase"] },

        // Classes, Interfaces, and Types must be PascalCase
        {
          selector: ["class", "interface", "typeAlias"],
          format: ["PascalCase"],
        },

        // Constants (Global/Exported) can be UPPER_CASE or camelCase
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["UPPER_CASE", "camelCase"],
        },

        // Standard Variables and Parameters must be camelCase
        {
          selector: ["variable", "parameter"],
          format: ["camelCase"],
        },

        // Handle unused variables (allow leading underscore)
        {
          selector: "variable",
          modifiers: ["unused"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
      ],

      // --- FILE SYSTEM RULES ---
      "check-file/filename-naming-convention": [
        "error",
        {
          // This allows kebab-case.
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          // IMPORTANT: This allows 'base.page.ts' or 'login.spec.ts'
          // by ignoring everything between the first dot and the last extension.
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          // Ensures all folders (pages, fixtures, utils) use kebab-case
          "**/*/": "KEBAB_CASE",
        },
      ],
      // --- PLAYWRIGHT BEST PRACTICES ---
      ...playwright.configs["recommended"].rules,
      "playwright/no-skipped-test": "off",
      // --- UNUSED CODE ---
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off", // Turn off default to let TS handle it
      "no-unreachable": "error",
    },
  },

  {
    // Global ignores to keep the linting fast
    ignores: ["test-results/", "playwright-report/", "dist/", "node_modules/"],
  },
];
