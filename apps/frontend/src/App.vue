<template>
  <div class="app dark bg-black text-white w-dvw h-dvh p-4">
    <div class="w-full h-full relative">
      <AppScaler :scale="1.25">
        <AppTabs />
      </AppScaler>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppScaler from './components/AppScaler.vue'
import AppTabs from './components/AppTabs.vue'
</script>
