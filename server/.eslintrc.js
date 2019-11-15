module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
    ],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
    },
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 9
    },
  };
