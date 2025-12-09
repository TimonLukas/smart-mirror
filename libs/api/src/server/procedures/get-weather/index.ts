import { logger } from '@smart-mirror/lib-common'
import { loggedProcedure } from '../../trpc'
import { CoordinatesModel } from '../../../models'
import { fetchWeather } from './api'

export const getWeather = loggedProcedure.input(CoordinatesModel).query(async ({ input }) => {
  logger.info('Received weather query for:', input)
  return fetchWeather(input)
})
