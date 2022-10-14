import vue from '@vitejs/plugin-vue'
export default defineNuxtConfig({
  // serverMiddleware: [  { path: '/v1', handler: '~/server/index.js' } ],
  app: {
    head: {
      script: [{ src: 'http://localhost:3000/blob-share.js', async: true, body: true, defer: true }]
    }
  },
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
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['blob-share'].includes(tag)
    }
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
