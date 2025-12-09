import { logger } from '@smart-mirror/lib-common'
import { publicProcedure } from '../trpc'
import { CoordinatesModel } from '../../models'

export const getWeather = publicProcedure.input(CoordinatesModel).query(async ({ input }) => {
  logger.info('Received weather query for:', input)

  return {
    now: 'unknown',
  }
})
