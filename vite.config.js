import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import ViteYaml from '@modyfi/vite-plugin-yaml';
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte(), ViteYaml()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
})
