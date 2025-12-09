<script lang="ts" setup>
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'
import CoordinateDegrees from '../util/CoordinateDegrees.vue'
import WeatherDaily from './daily/WeatherDaily.vue'

const { id } = defineProps<{ id: string }>()

const weatherStore = useWeatherStore()
const location = computed(() => weatherStore.locations.find((location) => location.id === id))
const weather = computed(() => weatherStore.weather[id])
</script>

<template>
  <div class="weather-display">
    <div class="flex flex-col" v-if="typeof location !== 'undefined'">
      <div class="flex flex-row items-end justify-center mb-6">
        <div class="icon"></div>
        <h1 class="text-3xl">{{ location.label }}</h1>
        <h2 class="text-xl text-muted-foreground">, Germany&nbsp;</h2>
        <h3 class="text-md text-muted">
          (Lat: <CoordinateDegrees :coordinate="location.coordinates.latitude" />, Lon:
          <CoordinateDegrees :coordinate="location.coordinates.longitude" />)
        </h3>
      </div>
      <div class="grid grid-cols-5" v-if="typeof weather !== 'undefined'">
        <WeatherDaily :weather="weather.daily[0]!" class="flex-1">
          <template #label>Yesterday</template>
        </WeatherDaily>
        <WeatherDaily :weather="weather.daily[1]!" class="flex-1">
          <template #label>Today</template>
        </WeatherDaily>
        <WeatherDaily :weather="weather.daily[2]!" class="flex-1">
          <template #label>Tomorrow</template>
        </WeatherDaily>
        <WeatherDaily
          v-for="daily in weather.daily.slice(3, 5)"
          :key="daily.time.toDateString()"
          :weather="daily"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>
