const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
    root: true,
    extends: [
        ...[
            '@vercel/style-guide/eslint/node',
            '@vercel/style-guide/eslint/typescript',
            '@vercel/style-guide/eslint/browser',
            '@vercel/style-guide/eslint/react',
            '@vercel/style-guide/eslint/next',
        ].map(require.resolve),
        ...['prettier', 'plugin:tailwindcss/recommended'],
    ],
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
    },
    settings: {
        tailwindcss: {
            callees: ['cn', 'clsx', 'cva'],
            config: 'tailwind.config.ts',
        },
        'import/resolver': {
            typescript: {
                extensions: ['.ts', '.tsx'],
                project,
            },
        },
    },
    ignorePatterns: ['node_modules/', 'dist/', 'drizzle/'],
    rules: {
        'tailwindcss/classnames-order': 'warn',
        'import/no-default-export': 'off',
        'import/named': 'off',
        'import/no-cycle': 'off',
        '@typescript-eslint/no-misused-promises': [
            2,
            {
                checksVoidReturn: {
                    attributes: false,
                },
            },
        ],
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'react/jsx-sort-props': [
            'warn',
            {
                callbacksLast: true,
                shorthandFirst: true,
            },
        ],
        camelcase: 'off',
    },
}
