import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import pluginDepend from "eslint-plugin-depend";
import pluginImport from "eslint-plugin-import-x";
import pluginJson from "@eslint/json";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginReact from "@eslint-react/eslint-plugin";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginSonarjs from "eslint-plugin-sonarjs";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import pluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, ".gitignore");

const jsPlugins = [
  eslint.configs.all,
  pluginPrettier,
  pluginUnicorn.configs.recommended,
  pluginImport.flatConfigs.typescript,
  pluginSonarjs.configs.recommended,
  pluginDepend.configs["flat/recommended"],
];

const tsPlugins = [...jsPlugins, tseslint.configs.strictTypeChecked];

const tsxPlugins = [
  ...tsPlugins,
  pluginReactRefresh.configs.vite,
  pluginReact.configs.all,
  pluginTestingLibrary.configs["flat/react"],
];

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    language: "json/json",
    ...pluginJson.configs.recommended,
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  {
    files: ["*.js"],
    extends: jsPlugins,
    rules: {
      "unicorn/filename-case": ["error", { cases: { camelCase: true } }],
    },
  },
  {
    files: ["**/*.ts"],
    extends: tsPlugins,
    rules: {
      "unicorn/filename-case": ["error", { cases: { camelCase: true } }],
    },
  },
  {
    files: ["src/**/*.tsx"],
    extends: tsxPlugins,
    plugins: {
      reactHooks: pluginReactHooks.configs.recommended,
    },
    rules: {
      "unicorn/filename-case": ["error", { cases: { pascalCase: true } }],
    },
  },
  {
    rules: {
      "one-var": "off",
      "sort-keys": "off",
      "no-ternary": "off",
      "capitalized-comments": "off",
    },
  },
]);
