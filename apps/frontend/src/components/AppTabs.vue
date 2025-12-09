<template>
  <Tabs v-model="model" class="flex flex-col items-center w-full h-full">
    <TabsList class="text-md p-1">
      <TabsTrigger v-for="tab in APP_TABS" :key="tab.id" :value="tab.id">{{
        tab.label
      }}</TabsTrigger>
    </TabsList>
    <TabsContent value="weather" class="pt-8">
      <WeatherTabs />
    </TabsContent>
    <TabsContent value="calendar">calendar</TabsContent>
    <TabsContent value="smart-home">smart home</TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { computed } from 'vue'
import WeatherTabs from './weather/WeatherTabs.vue'
import { APP_TABS, useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()

const model = computed({
  get: () => navigationStore.currentSubtab[0],
  set: (tabId: string) => {
    navigationStore.navigate(tabId)
  },
})
</script>
