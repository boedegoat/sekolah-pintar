module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
        'arrow-body-style': 'off',
        'react/function-component-definition': 'off',
        'import/prefer-default-export': 'off',
        'import/prefer-default-import': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
};
