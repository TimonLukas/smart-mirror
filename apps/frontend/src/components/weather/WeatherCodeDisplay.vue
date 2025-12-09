<template>
  <span class="weather-code">{{ label }}</span>
</template>

<script lang="ts" setup>
import { wmoWeatherCodeToName } from '@smart-mirror/lib-common'
import { computed, toValue } from 'vue'

const { weatherCode } = defineProps<{
  weatherCode: number
}>()

const weatherCodeName = computed(() => wmoWeatherCodeToName(weatherCode))
const label = computed((): string => {
  const codeName = toValue(weatherCodeName)

  if (codeName === null) {
    return '???'
  }

  return {
    'clear-sky': 'Clear sky',
    'mainly-clear': 'Mainly clear',
    'partly-cloudy': 'Partly cloudy',
    overcast: 'Overcast',

    fog: 'Foggy',
    'fog-depositing-rime': 'Depositing rime fog',

    'drizzle-light': 'Light drizzle',
    'drizzle-moderate': 'Moderate drizzle',
    'drizzle-dense': 'Dense drizzle',
    'drizzle-freezing-light': 'Freezing drizzle (light)',
    'drizzle-freezing-dense': 'Freezing drizzle (dense)',

    'rain-slight': 'Slight rain',
    'rain-moderate': 'Moderate rain',
    'rain-heavy': 'Heavy rain',
    'rain-freezing-light': 'Freezing rain (light)',
    'rain-freezing-heavy': 'Freezing rain (heavy)',

    'snow-fall-slight': 'Slight snowfall',
    'snow-fall-moderate': 'Moderate snowfall',
    'snow-fall-heavy': 'Heavy snowfall',
    'snow-grains': 'Snow grains',

    'rain-shower-slight': 'Rain showers (slight)',
    'rain-shower-moderate': 'Rain showers (moderate)',
    'rain-shower-violent': 'Rain showers (violent)',

    'snow-shower-slight': 'Snow showers (slight)',
    'snow-shower-heavy': 'Snow showers (heavy)',

    thunderstorm: 'Thunderstorm',
    'thunderstorm-hail-slight': 'Thunderstorm & slight hail',
    'thunderstorm-hail-heavy': 'Thunderstorm & heavy hail',
  }[codeName]
})
</script>
