// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  [
    globalIgnores(['dist', 'coverage', 'dev-dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        prettier,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        prettier: prettierPlugin,
        import: importPlugin,
      },
      rules: {
        'prettier/prettier': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'react-refresh/only-export-components': 'off',

        'import/order': [
          'warn',
          {
            groups: [
              'builtin', // fs, path 같은 node 기본 모듈
              'external', // 외부 라이브러리 (react, lodash 등)
              'internal', // 절대 경로 import (@/ 로 시작하는 경우 등)
              ['parent', 'sibling', 'index'], // 상대 경로
            ],
            pathGroups: [
              {
                pattern: '@/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: { order: 'asc', caseInsensitive: true },
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
  storybook.configs['flat/recommended']
);
