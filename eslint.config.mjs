import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  importPlugin.flatConfigs.electron,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: { projectService: true },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 6,
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: false, typedefs: false },
      ],
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs'],
      'no-console': 'error',
      'import/no-unresolved': 'off',
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*.js'],
              message: 'Drop the .js extension in imports',
            },
          ],
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['src/main/main.ts'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  { ignores: ['**/dist/*', '**/playground/*', 'development/**', '.webpack/**'] },
);
