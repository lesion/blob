import vuetify from 'vite-plugin-vuetify'
import dotenv from 'dotenv/config'

export default defineNuxtConfig({
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css', 'assets/main.css'],
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    uploadPath: process.env.UPLOAD_PATH || './upload',
    public: {
      baseURL: process.env.NUXT_BASE_URL
    }
  },

  app: {
    head: {
      script: [{ src: '/blob-share.js', async: true, body: true, defer: true }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  ssr: true,
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use './assets/styles/settings.scss' as *;`,
    //     },
    //   },
    // },
  },
  modules: [
    // "@nuxtjs/tailwindcss",
    'formidable',
    '@nuxt/image',
    '@nuxtjs/i18n',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins?.push(vuetify({ autoImport: true }))
      )
    }
  ],

  image: {
    dir: 'assets/images',
    domains: ['localhost:4000']
  },

  // build: {
  //   transpile: ['vuetify'],
  // },

  i18n: {
    runtimeOnly: false,
      // defaultLocale: 'it-IT',
      strategy: 'no_prefix',
      locales: [
        { code: 'en-US', iso: 'en-EN', file: 'en.json', name: 'English' },
        { code: 'it-IT', iso: 'it-IT', file: 'it.json', name: 'Italiano' },
        { code: 'fr-FR', iso: 'fr-FR', file: 'fr.json', name: 'Francais' },
      ],
      langDir: './locales/',
      lazy: true,
      //   legacy: false,
      //   fallbackLocale: 'en'
      // }
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
