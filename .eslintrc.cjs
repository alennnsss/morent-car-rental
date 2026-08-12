module.exports = {
    root: true,
    env: {node: true, browser: true},
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier'
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-console': 'warn',
        'no-unused-vars': 'warn'
    }
}