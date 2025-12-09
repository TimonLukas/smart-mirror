<template>
  <div
    class="weather-daily flex flex-col mt-3 not-last:border-r-2 not-first:pl-4 not-last:pr-4 border-muted-foreground whitespace-nowrap nth-[2n]:bg-white/5"
  >
    <div class="content -translate-y-5.5">
      <div class="date flex flex-col">
        <h3 class="text-sm text-center text-muted-foreground mb-2.5">
          <slot name="label">&nbsp;</slot>
        </h3>
        <h3
          class="text-xl text-center underline underline-offset-6 mb-2 decoration-muted-foreground"
        >
          <DateFormatter :date="weather.time" />
        </h3>
      </div>
      <div class="text-sm">
        <div class="text-center mb-2">
          <WeatherCodeDisplay :weather-code="weather.weatherCode" />
        </div>
        <div class="grid daily-grid">
          <WeatherDailyGridRow label="Temp." unit="°C">
            <span>{{ Math.round(weather.temperature2mMin) }}</span>
            <div class="inline-block px-1">-</div>
            <span>{{ Math.round(weather.temperature2mMax) }}</span>
          </WeatherDailyGridRow>
          <WeatherDailyGridRow label="Temp. (felt)" unit="°C">
            <span>{{ Math.round(weather.apparentTemperatureMin) }}</span>
            <div class="inline-block px-1">-</div>
            <span>{{ Math.round(weather.apparentTemperatureMax) }}</span>
          </WeatherDailyGridRow>

          <WeatherDailyGridSpacer class="h-2" />

          <WeatherDailyGridRow label="Precip. chance" unit="%">
            {{ weather.precipitationProbabilityMax }}
          </WeatherDailyGridRow>
          <WeatherDailyGridRow label="Precip. sum" unit="mm">
            {{ weather.precipitationSum.toFixed(1) }}
          </WeatherDailyGridRow>
          <WeatherDailyGridRow unit="mm" class="text-[10px]">
            <template #label><div class="ml-2">Rainfall sum</div></template>
            {{ weather.rainSum.toFixed(1) }}
          </WeatherDailyGridRow>
          <WeatherDailyGridRow unit="mm" class="text-[10px]">
            <template #label><div class="ml-2">Showers sum</div></template>
            {{ weather.showersSum.toFixed(1) }}
          </WeatherDailyGridRow>
          <WeatherDailyGridRow unit="mm" class="text-[10px]">
            <template #label><div class="ml-2">Snowfall sum</div></template>
            {{ weather.snowfallSum.toFixed(1) }}
          </WeatherDailyGridRow>

          <WeatherDailyGridSpacer class="h-2" />

          <WeatherDailyGridRow label="Sunrise">
            <div class="-mr-4">
              <DateFormatter :date="weather.sunrise" date-format="HH:MM:ss" />
            </div>
          </WeatherDailyGridRow>
          <WeatherDailyGridRow label="Sunset">
            <div class="-mr-4">
              <DateFormatter :date="weather.sunset" date-format="HH:MM:ss" />
            </div>
          </WeatherDailyGridRow>

          <WeatherDailyGridSpacer class="h-2" />

          <WeatherDailyGridRow label="Daylight">
            <DurationFormatter
              class="-mr-4"
              :duration="daylightDuration"
              :units="{ hours: true, minutes: true, seconds: true, milliseconds: false }"
            />
          </WeatherDailyGridRow>
          <WeatherDailyGridRow label="Sunshine">
            <DurationFormatter
              class="-mr-4"
              :duration="sunshineDuration"
              :units="{ hours: true, minutes: true, seconds: true, milliseconds: false }"
            />
          </WeatherDailyGridRow>
          <WeatherDailyGridRow label="Rel. sunshine" unit="%">
            {{ ((weather.sunshineDuration / weather.daylightDuration) * 100).toFixed(1) }}
          </WeatherDailyGridRow>

          <WeatherDailyGridSpacer class="h-2" />

          <WeatherDailyGridRow label="UV Index">
            <ColorScale class="-mr-4" :progress="uvIndexProgress">{{
              Math.round(weather.uvIndexMax)
            }}</ColorScale>
          </WeatherDailyGridRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WeatherDailyDataModel } from '@smart-mirror/lib-api'
import DateFormatter from '@/components/util/DateFormatter.vue'
import DurationFormatter from '@/components/util/DurationFormatter.vue'
import WeatherCodeDisplay from '../WeatherCodeDisplay.vue'
import WeatherDailyGridSpacer from './WeatherDailyGridSpacer.vue'
import WeatherDailyGridRow from './WeatherDailyGridRow.vue'
import ColorScale from '@/components/util/ColorScale.vue'
import { computed } from 'vue'
import { Temporal } from '@smart-mirror/lib-common'

const { weather } = defineProps<{
  weather: WeatherDailyDataModel
}>()

defineSlots<{
  label?(): unknown
}>()

const uvIndexProgress = computed(() => {
  if (weather.uvIndexMax < 0) {
    return 0
  }

  if (weather.uvIndexMax >= 10) {
    return 1
  }

  return weather.uvIndexMax / 10
})

const daylightDuration = computed(() => {
  const base = Temporal.Instant.fromEpochMilliseconds(0)
  return base.until(base.add({ milliseconds: Math.floor(weather.daylightDuration * 1_000) }), {
    smallestUnit: 'seconds',
    largestUnit: 'hours',
  })
})
const sunshineDuration = computed(() => {
  const base = Temporal.Instant.fromEpochMilliseconds(0)
  return base.until(base.add({ milliseconds: Math.floor(weather.sunshineDuration * 1_000) }), {
    smallestUnit: 'seconds',
    largestUnit: 'hours',
  })
})
</script>

<style scoped>
.weather-daily {
  .daily-grid {
    grid-template-columns: max-content 1fr min-content;
  }
}
</style>
