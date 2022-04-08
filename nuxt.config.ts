import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
    // serverMiddleware: [  { path: '/v1', handler: '~/server/index.js' } ],
    buildModules: [
        // '@inkline/nuxt'
        // pinia plugin - https://pinia.esm.dev

        // "@pinia/nuxt",
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
