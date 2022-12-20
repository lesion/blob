export default defineNuxtConfig({
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  },

  app: {
    head: {
      script: [{ src: '/blob-share.js', async: true, body: true, defer: true }]
    }
  },


  modules: [
    "@nuxtjs/tailwindcss",
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
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => ['blob-share'].includes(tag)
    }
  },

  nitro: {
    routeRules: {
      '/api/**': { cors: true, headers: { 'access-control-allowed-methods': 'GET' } },
    }
  },
  // vite: {
  //   logLevel: "info",
  //   optimizeDeps: {
  //     include: [
  //       '@headlessui/vue', '@heroicons/vue/solid', '@heroicons/vue/outline', 'vue', 'pinia'
  //     ]
  //   }
  // }
});
