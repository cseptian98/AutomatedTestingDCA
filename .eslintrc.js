module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    '@react-native-community',
    'airbnb',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier', 'react'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': [0],
    'import/prefer-default-export': [0],
    'no-underscore-dangle': [0],
    'prettier/prettier': 'error',
    'react/forbid-prop-types': [0],
    'react/no-did-update-set-state': [0],
    'react/jsx-props-no-spreading': [0],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    react: {
      version: 'detect',
    },
  },
};
