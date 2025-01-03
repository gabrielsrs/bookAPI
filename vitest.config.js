import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: [
      'tests/temp/**',
      'tests/users/**',
      'node_modules/**',
      'tests/book/rating.test.js',
      'tests/book/bookFilter.test.js',
    ],
  },
})