import { fileURLToPath, URL } from 'node:url'

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    pluginCustomGreetingUrl(),
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
