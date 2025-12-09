import { Temporal } from '@smart-mirror/lib-common'

export const WEATHER_API = {
  url: 'https://api.open-meteo.com/v1/forecast',
  timezone: 'Europe/Berlin',
  cache: {
    duration: Temporal.Duration.from({
      minutes: 5,
    }),
  },
}
