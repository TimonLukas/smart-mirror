/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_BACKEND: string
  readonly VITE_WEBSOCKET_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
