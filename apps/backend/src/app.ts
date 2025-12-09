import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from '@smart-mirror/lib-api/server'
import { logger } from '@smart-mirror/lib-common'

const server = createHTTPServer({
  router: appRouter,
})

const overridePort = Number(process.env.PORT)
const port = Number.isNaN(overridePort) ? 3000 : overridePort
logger.info('Server is listening on port:', port)
server.listen(port)
