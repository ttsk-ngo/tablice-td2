import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                $: 'readonly',
                jQuery: 'readonly',
                console: 'readonly',
                Promise: 'readonly',
                localStorage: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                URLSearchParams: 'readonly',
                URL: 'readonly',
                Date: 'readonly'
            }
        },
        plugins: {
            prettier
        },
        rules: {
            'prettier/prettier': 'warn',
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            'no-console': ['warn', { allow: ['error', 'warn'] }],
            'no-debugger': 'warn'
        }
    },
    {
        ignores: ['node_modules/**', 'public/**', '.firebase/**', 'gulpfile.js']
    }
];
