import { logger } from '@smart-mirror/lib-common'
import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const router = t.router
export const baseProcedure = t.procedure

export const loggedProcedure = baseProcedure.use(async (opts) => {
  const start = Date.now()

  const result = await opts.next()

  const durationInMs = Date.now() - start
  const meta = {
    path: opts.path,
    type: opts.type,
    durationInMs,
  }

  if (result.ok) {
    logger.info('    OK request timing:', meta)
  } else {
    logger.error('Non-OK request timing:', meta)
  }

  return result
})
