const WMO_WEATHER_CODE_TO_NAME = {
  0: 'clear-sky',
  1: 'mainly-clear',
  2: 'partly-cloudy',
  3: 'overcast',

  45: 'fog',
  48: 'fog-depositing-rime',

  51: 'drizzle-light',
  53: 'drizzle-moderate',
  55: 'drizzle-dense',
  56: 'drizzle-freezing-light',
  57: 'drizzle-freezing-dense',

  61: 'rain-slight',
  63: 'rain-moderate',
  65: 'rain-heavy',
  66: 'rain-freezing-light',
  67: 'rain-freezing-heavy',

  71: 'snow-fall-slight',
  73: 'snow-fall-moderate',
  75: 'snow-fall-heavy',
  77: 'snow-grains',

  80: 'rain-shower-slight',
  81: 'rain-shower-moderate',
  82: 'rain-shower-violent',

  85: 'snow-shower-slight',
  86: 'snow-shower-heavy',

  95: 'thunderstorm',
  96: 'thunderstorm-hail-slight',
  99: 'thunderstorm-hail-heavy',
} as const satisfies Record<number, string>
export type WmoWeatherCodeName =
  (typeof WMO_WEATHER_CODE_TO_NAME)[keyof typeof WMO_WEATHER_CODE_TO_NAME]

export function wmoWeatherCodeToName(
  code: keyof typeof WMO_WEATHER_CODE_TO_NAME,
): WmoWeatherCodeName
export function wmoWeatherCodeToName(code: number): WmoWeatherCodeName | null
export function wmoWeatherCodeToName(code: number): WmoWeatherCodeName | null {
  if (code in WMO_WEATHER_CODE_TO_NAME) {
    return WMO_WEATHER_CODE_TO_NAME[code as keyof typeof WMO_WEATHER_CODE_TO_NAME]
  }

  return null
}
