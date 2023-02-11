import vuetify from 'vite-plugin-vuetify'


export default defineNuxtConfig({
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css'],
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    public: {
      baseURL: process.env.BASE_URL
    }
  },

  app: {
    head: {
      script: [{ src: '/blob-share.js', async: true, body: true, defer: true }]
    }
  },


  modules: [
    // "@nuxtjs/tailwindcss",
    'formidable',
    ['@nuxtjs/i18n', {
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
    }],
      async (options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', (config) =>
          config.plugins?.push(vuetify())
        )
      }
  ],

  build: {
    transpile: ['vuetify'],
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
  }
});
