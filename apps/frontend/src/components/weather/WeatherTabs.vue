<template>
  <Tabs v-model="currentTab" class="flex flex-col items-center justify-center">
    <TabsList class="mb-2 bg-transparent">
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
import { computed } from 'vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useWeatherStore } from '@/stores/weather'
import WeatherDisplay from './WeatherDisplay.vue'
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()
const weatherStore = useWeatherStore()

const currentTab = computed(() => {
  if (navigationStore.currentSubtab[0] === 'weather') {
    return navigationStore.currentSubtab[1]
  }

  return weatherStore.locations[0]?.id
})
</script>
