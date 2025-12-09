import z from 'zod'

export const WeatherHourlyDataModel = z.object({
  time: z.coerce.date(),
  weatherCode: z.number(),
  temperature2m: z.number(),
  apparentTemperature: z.number(),
  relativeHumidity2m: z.number(),
  precipitationProbability: z.number(),
  precipitation: z.number(),
  rain: z.number(),
  showers: z.number(),
  snowfall: z.number(),
  snowDepth: z.number(),
  cloudCover: z.number(),
})
export type WeatherHourlyDataModel = z.infer<typeof WeatherHourlyDataModel>

export const WeatherDailyDataModel = z.object({
  time: z.coerce.date(),
  weatherCode: z.number(),
  temperature2mMin: z.number(),
  temperature2mMax: z.number(),
  apparentTemperatureMin: z.number(),
  apparentTemperatureMax: z.number(),
  precipitationSum: z.number(),
  precipitationProbabilityMax: z.number(),
  uvIndexMax: z.number(),
  sunrise: z.coerce.date(),
  sunset: z.coerce.date(),
  daylightDuration: z.number(),
  sunshineDuration: z.number(),
  rainSum: z.number(),
  snowfallSum: z.number(),
  showersSum: z.number(),
})
export type WeatherDailyDataModel = z.infer<typeof WeatherDailyDataModel>

export const WeatherMetaModel = z.object({
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number(),
  timezone: z.string().min(1).nullable(),
  timezoneAbbreviation: z.string().min(1).nullable(),
  utcOffsetSeconds: z.number(),
})
export type WeatherMetaModel = z.infer<typeof WeatherMetaModel>

export const WeatherDataModel = z.object({
  hourly: WeatherHourlyDataModel.array(),
  daily: WeatherDailyDataModel.array(),
  meta: WeatherMetaModel,
})
export type WeatherDataModel = z.infer<typeof WeatherDataModel>
