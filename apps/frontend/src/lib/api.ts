import { createTRPCClient, httpBatchLink, loggerLink, retryLink } from '@trpc/client'
import { type AppRouter } from '@smart-mirror/lib-api'
import { logger } from '@smart-mirror/lib-common'

export const api = createTRPCClient<AppRouter>({
  links: [
    retryLink({
      retry: (opts) => {
        if (opts.error.data && opts.error.data.code !== 'INTERNAL_SERVER_ERROR') {
          // Only retry on 500s
          return false
        }

        if (opts.op.type !== 'query') {
          // Only retry queries
          return false
        }

        return opts.attempts <= 3
      },
      retryDelayMs: (attempts) => Math.min(250 * 2 ** attempts, 10_000),
    }),
    loggerLink({
      enabled: (opts) =>
        (import.meta.env.DEV && typeof window !== 'undefined') ||
        (opts.direction === 'down' && opts.result instanceof Error),
      console: logger,
    }),
    httpBatchLink({
      url: import.meta.env.VITE_BACKEND,
    }),
  ],
})
