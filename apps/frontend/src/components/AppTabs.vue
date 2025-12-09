<template>
  <Tabs v-model="currentTab" class="flex flex-col items-center w-full h-full">
    <TabsList class="text-md p-1 bg-transparent">
      <TabsTrigger value="weather">Weather</TabsTrigger>
      <TabsTrigger value="calendar">Calendar</TabsTrigger>
      <TabsTrigger value="smart-home">Smart Home</TabsTrigger>
    </TabsList>
    <TabsContent value="weather">
      <WeatherTabs />
    </TabsContent>
    <TabsContent value="calendar">calendar</TabsContent>
    <TabsContent value="smart-home">smart home</TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ref } from 'vue'
import WeatherTabs from './weather/WeatherTabs.vue'

const currentTab = ref('weather')
</script>
