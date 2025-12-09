import { assert, cacheResults } from '@smart-mirror/lib-common'
import { fetchWeatherApi } from 'openmeteo'
import {
  CoordinatesModel,
  WeatherDailyDataModel,
  WeatherDataModel,
  WeatherHourlyDataModel,
  WeatherMetaModel,
} from '../../../models'
import { WEATHER_API } from '../../../constants'

type WeatherApiResponse = Awaited<ReturnType<typeof fetchWeatherApi>>[number]

const API_PARAMS = {
  timezone: WEATHER_API.timezone,
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset',
    'daylight_duration',
    'sunshine_duration',
    'rain_sum',
    'snowfall_sum',
    'showers_sum',
    'precipitation_sum',
    'precipitation_probability_max',
    'uv_index_max',
  ],
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'snow_depth',
    'weather_code',
    'cloud_cover',
  ],
  past_days: 1,
}

export const fetchWeather = cacheResults(
  async (coordinates: CoordinatesModel): Promise<WeatherDataModel> => {
    const responses = await fetchWeatherApi(WEATHER_API.url, {
      ...API_PARAMS,
      ...coordinates,
    })
    assert.array.hasMinLength(1)(responses, 'responses')
    const response = responses[0]!

    const meta = getWeatherMeta(response)
    const hourly = getWeatherHourlyData(response)
    const daily = getWeatherDailyData(response)

    return { meta, hourly, daily }
  },
  {
    duration: WEATHER_API.cache.duration,
  },
)

function getWeatherMeta(response: WeatherApiResponse): WeatherMetaModel {
  return {
    latitude: response.latitude(),
    longitude: response.longitude(),
    elevation: response.elevation(),
    timezone: response.timezone(),
    timezoneAbbreviation: response.timezoneAbbreviation(),
    utcOffsetSeconds: response.utcOffsetSeconds(),
  }
}

function getWeatherHourlyData(response: WeatherApiResponse): WeatherHourlyDataModel[] {
  const utcOffsetSeconds = response.utcOffsetSeconds()
  const hourly = response.hourly()!

  const times = Array.from(
    { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000),
  )
  const temperature_2m = hourly.variables(0)!.valuesArray()
  assert.null.isNot(temperature_2m, 'temperature_2m')
  const relative_humidity_2m = hourly.variables(1)!.valuesArray()
  assert.null.isNot(relative_humidity_2m, 'relative_humidity_2m')
  const apparent_temperature = hourly.variables(2)!.valuesArray()
  assert.null.isNot(apparent_temperature, 'apparent_temperature')
  const precipitation_probability = hourly.variables(3)!.valuesArray()
  assert.null.isNot(precipitation_probability, 'precipitation_probability')
  const precipitation = hourly.variables(4)!.valuesArray()
  assert.null.isNot(precipitation, 'precipitation')
  const rain = hourly.variables(5)!.valuesArray()
  assert.null.isNot(rain, 'rain')
  const showers = hourly.variables(6)!.valuesArray()
  assert.null.isNot(showers, 'showers')
  const snowfall = hourly.variables(7)!.valuesArray()
  assert.null.isNot(snowfall, 'snowfall')
  const snow_depth = hourly.variables(8)!.valuesArray()
  assert.null.isNot(snow_depth, 'snow_depth')
  const weather_code = hourly.variables(9)!.valuesArray()
  assert.null.isNot(weather_code, 'weather_code')
  const cloud_cover = hourly.variables(10)!.valuesArray()
  assert.null.isNot(cloud_cover, 'cloud_cover')

  return times.map(
    (time, index): WeatherHourlyDataModel => ({
      time,
      temperature2m: temperature_2m[index]!,
      relativeHumidity2m: relative_humidity_2m[index]!,
      apparentTemperature: apparent_temperature[index]!,
      precipitationProbability: precipitation_probability[index]!,
      precipitation: precipitation[index]!,
      rain: rain[index]!,
      showers: showers[index]!,
      snowfall: snowfall[index]!,
      snowDepth: snow_depth[index]!,
      weatherCode: weather_code[index]!,
      cloudCover: cloud_cover[index]!,
    }),
  )
}

function getWeatherDailyData(response: WeatherApiResponse): WeatherDailyDataModel[] {
  const utcOffsetSeconds = response.utcOffsetSeconds()
  const daily = response.daily()!

  const sunrise = daily.variables(5)
  assert.null.isNot(sunrise, 'sunrise')
  const sunrises = [...Array(sunrise.valuesInt64Length())].map(
    (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1_000),
  )

  const sunset = daily.variables(6)
  assert.null.isNot(sunset, 'sunset')
  const sunsets = [...Array(sunrise.valuesInt64Length())].map(
    (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1_000),
  )

  const times = Array.from(
    { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000),
  )
  const weather_code = daily.variables(0)!.valuesArray()
  assert.null.isNot(weather_code, 'weather_code')
  const temperature_2m_max = daily.variables(1)!.valuesArray()
  assert.null.isNot(temperature_2m_max, 'temperature_2m_max')
  const temperature_2m_min = daily.variables(2)!.valuesArray()
  assert.null.isNot(temperature_2m_min, 'temperature_2m_min')
  const apparent_temperature_max = daily.variables(3)!.valuesArray()
  assert.null.isNot(apparent_temperature_max, 'apparent_temperature_max')
  const apparent_temperature_min = daily.variables(4)!.valuesArray()
  assert.null.isNot(apparent_temperature_min, 'apparent_temperature_min')
  const daylight_duration = daily.variables(7)!.valuesArray()
  assert.null.isNot(daylight_duration, 'daylight_duration')
  const sunshine_duration = daily.variables(8)!.valuesArray()
  assert.null.isNot(sunshine_duration, 'sunshine_duration')
  const rain_sum = daily.variables(9)!.valuesArray()
  assert.null.isNot(rain_sum, 'rain_sum')
  const snowfall_sum = daily.variables(10)!.valuesArray()
  assert.null.isNot(snowfall_sum, 'snowfall_sum')
  const showers_sum = daily.variables(11)!.valuesArray()
  assert.null.isNot(showers_sum, 'showers_sum')
  const precipitation_sum = daily.variables(12)!.valuesArray()
  assert.null.isNot(precipitation_sum, 'precipitation_sum')
  const precipitation_probability_max = daily.variables(13)!.valuesArray()
  assert.null.isNot(precipitation_probability_max, 'precipitation_probability_max')
  const uv_index_max = daily.variables(14)!.valuesArray()
  assert.null.isNot(uv_index_max, 'uv_index_max')

  return times.map(
    (time, i): WeatherDailyDataModel => ({
      time,
      sunrise: sunrises[i]!,
      sunset: sunsets[i]!,
      weatherCode: weather_code[i]!,
      temperature2mMax: temperature_2m_max[i]!,
      temperature2mMin: temperature_2m_min[i]!,
      apparentTemperatureMax: apparent_temperature_max[i]!,
      apparentTemperatureMin: apparent_temperature_min[i]!,
      daylightDuration: daylight_duration[i]!,
      sunshineDuration: sunshine_duration[i]!,
      rainSum: rain_sum[i]!,
      snowfallSum: snowfall_sum[i]!,
      showersSum: showers_sum[i]!,
      precipitationSum: precipitation_sum[i]!,
      precipitationProbabilityMax: precipitation_probability_max[i]!,
      uvIndexMax: uv_index_max[i]!,
    }),
  )
}
