module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
            tsx: false,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
    rules: {
        // js/ts https://eslint.org/docs/rules
        'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'eol-last': 'error',
        'no-trailing-spaces': 'error',
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'always-multiline'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        camelcase: 0,
        semi: ['error', 'never'],
        // indent: ['error', 4, { SwitchCase: 1 }],
        'object-curly-spacing': ['error', 'always'],
        'arrow-parens': ['error', 'as-needed'],
        'quote-props': ['error', 'as-needed'],
        'prefer-template': 'error',
        /* https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules */
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: false,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        // vue https://eslint.vuejs.org/rules/
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 5,
                multiline: 1,
            },
        ],
        'vue/require-default-prop': 'off',
        'vue/html-closing-bracket-spacing': 'error',
        'vue/no-mutating-props': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/v-on-event-hyphenation': 'off',
    },
    ignorePatterns: [],
}
