<script lang="ts" setup>
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'
import CoordinateDegrees from './CoordinateDegrees.vue'

const { id } = defineProps<{ id: string }>()

const weatherStore = useWeatherStore()
const location = computed(() => weatherStore.locations.find((location) => location.id === id))
// const weather = computed(() => weatherStore.weather[id])
</script>

<template>
  <div class="weather-display">
    <div class="flex flex-col" v-if="typeof location !== 'undefined'">
      <div class="flex flex-row items-end">
        <div class="icon"></div>
        <h1 class="text-3xl">{{ location.label }}</h1>
        <h2 class="text-xl text-muted-foreground">, Germany&nbsp;</h2>
        <h3 class="text-md text-muted">
          (Lat: <CoordinateDegrees :coordinate="location.coordinates.latitude" />, Lon:
          <CoordinateDegrees :coordinate="location.coordinates.longitude" />)
        </h3>
      </div>
    </div>
  </div>
</template>
