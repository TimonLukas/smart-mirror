<template>
  <div class="weather">{{ weather?.meta.elevation }}</div>
</template>

<script lang="ts" setup>
import { useWeatherStore } from '@/stores/weather'
import { computed, watchEffect } from 'vue'

const { id } = defineProps<{ id: string }>()
const weatherStore = useWeatherStore()

const weather = computed(() => weatherStore.weather[id])
watchEffect(() => console.log(weather.value))
</script>

<style scoped>
.weather {
  color: white;
}
</style>
