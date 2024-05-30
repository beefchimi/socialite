import globals from 'globals';
import configLove from 'eslint-config-love';
// Includes both `config` and `plugin`.
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['coverage/**', 'dist/**'],
  },
  configLove,
  pluginPrettier,
  {
    name: 'custom-rules',
    files: ['**/*.ts', '**/*.js', '**/*.mjs'],
    languageOptions: {
      ...configLove.languageOptions,
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // This is preferred over `tsconfig` equivalents.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Consider this rule:
      /*
      '@typescript-eslint/consistent-indexed-object-style': [
        'error',
        'index-signature',
      ],
      */
    },
  },
];
