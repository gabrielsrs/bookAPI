import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: [
      'tests/temp/**',
      'node_modules/**',
    ],
  },
})