import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.js',
      name: 'BlobShare'
    }
  },
  plugins: [svelte({compilerOptions: { customElement: true }})]
})
