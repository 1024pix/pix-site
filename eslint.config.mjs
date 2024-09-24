import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import vitest from '@vitest/eslint-plugin';

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}, {
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/brace-style': ['error', '1tbs'],
    'vue/quote-props': ['error', 'as-needed'],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
})
  .prepend({
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  })
  .append({
    ignores: ['**/playwright-report/'],
  });
