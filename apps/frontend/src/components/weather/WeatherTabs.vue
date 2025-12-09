<template>
  <Tabs v-model="currentTab" class="flex flex-col items-center justify-center">
    <TabsList>
      <TabsTrigger
        v-for="location in weatherStore.locations"
        :key="location.id"
        :value="location.id"
        >{{ location.label }}</TabsTrigger
      >
    </TabsList>
    <TabsContent v-for="location in weatherStore.locations" :key="location.id" :value="location.id">
      <WeatherDisplay :id="location.id" />
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useWeatherStore } from '@/stores/weather'
import WeatherDisplay from './WeatherDisplay.vue'

const weatherStore = useWeatherStore()
const currentTab = ref(weatherStore.locations[0]?.id)
</script>
