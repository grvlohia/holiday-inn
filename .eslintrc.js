module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  rules: {
    // ESLINT
    'no-unused-vars': 'off',
    'no-use-before-define': 'error',

    // Sorting imports
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          ['internal', 'sibling', 'parent', 'index'],
          'object',
          'type',
        ],
      },
    ],
    // TypeScript ESLint
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: [
          'tsconfig.base.json',
          'server/tsconfig.json',
          'apps/admin/tsconfig.json',
          'apps/store/tsconfig.json',
        ],
        extension: ['.ts', '.tsx'],
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: ['.eslintrc.*'],
}
