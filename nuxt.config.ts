import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  // serverMiddleware: [  { path: '/v1', handler: '~/server/index.js' } ],
  buildModules: [
    "@pinia/nuxt",
  ],
  build: {
    transpile: ['@heroicons/vue'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  vite: {
    logLevel: "info",
    optimizeDeps: {
      include: [
        '@headlessui/vue', '@heroicons/vue/solid', '@heroicons/vue/outline', 'vue', 'pinia'
      ]
    }
  }
});
