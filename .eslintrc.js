module.exports = {
  env: {
    jest: true,
  },
  root: true,
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
