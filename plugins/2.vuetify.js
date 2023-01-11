import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/lib/util/colors.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.indigo.darken2,
            secondary: colors.grey.darken3,
            accent: colors.blue.accent1,
            error: colors.red.accent2,
            info: colors.blue.base,
            success: colors.green.base,
            warning: colors.red.darken1,
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: colors.blue.darken4,
            secondary: colors.grey.darken1,
            accent: colors.pink.accent2,
            error: colors.red.darken2,
            info: colors.blue.base,
            success: colors.green.darken2,
            warning: colors.orange.darken1,
          },
        },
      },
    },
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})