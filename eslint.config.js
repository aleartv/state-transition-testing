import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.all,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    "rules": {
      "no-console": process.env.NODE_ENV === 'DEV' ? 'off': 'error'
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
