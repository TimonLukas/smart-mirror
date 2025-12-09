import { fileURLToPath, URL } from 'node:url'

import { defineConfig, Plugin } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import pluginVueDevTools from 'vite-plugin-vue-devtools'
import pluginTailwindcss from '@tailwindcss/vite'
import pluginTsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    pluginVue(),
    pluginVueDevTools(),
    pluginCustomGreetingUrl(),
    pluginTailwindcss(),
    pluginTsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

function pluginCustomGreetingUrl(): Plugin {
  return {
    name: "custom-greeting-url",
    configureServer(server) {
      const printUrls = server.printUrls
      server.printUrls = () => {
        server.resolvedUrls?.local.push('http://localhost:5173/simulator.html')
        printUrls()
      }
    }
  }
}
