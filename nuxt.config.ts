export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: '/blob-share.js', async: true, body: true, defer: true }]
    }
  },
  buildModules: [
    "@pinia/nuxt",
  ],
  modules: [
    '@nuxtjs/i18n',
    '@inkline/nuxt'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en', file: 'en.json' },
      { code: 'it', iso: 'it', file: 'it.json' }
    ],
    langDir: './locales/',
    lazy: true,
    vueI18n: {
      legacy: false,
      fallbackLocale: 'en'
    }
  },
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
