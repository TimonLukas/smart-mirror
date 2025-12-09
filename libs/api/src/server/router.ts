import { router } from './trpc'
import * as procedures from './procedures/index'

export const appRouter = router(procedures)
export type AppRouter = typeof appRouter
