import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from '@smart-mirror/lib-api/server'
import { firstNotNan, logger } from '@smart-mirror/lib-common'
import cors from 'cors'

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
})

const port = firstNotNan(Number(process.env.PORT), 3000)
logger.info('Server is listening on port:', port)
server.listen(port)
