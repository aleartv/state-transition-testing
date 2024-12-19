import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    ...eslintPluginReact.configs.flat.all.languageOptions,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.strictTypeChecked,
    eslintPluginReact.configs.flat.all,
    eslintPluginReact.configs.flat["jsx-runtime"],
    eslintPluginPrettier,
    eslintPluginReactRefresh.configs.vite,
  ],
  plugins: {
    reactHooks: eslintPluginReactHooks.configs.recommended,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
