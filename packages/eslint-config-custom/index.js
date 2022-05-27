module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    env: {
        node: true,
        es6: true
    },
    overrides: [
        {
            files: ['**/__tests__/**/*'],
            env: {
                jest: true
            }
        }
    ]
};
