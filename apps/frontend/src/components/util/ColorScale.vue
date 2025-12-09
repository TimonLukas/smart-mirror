<template>
  <span class="color-scale">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import type { ColorRgb } from '@smart-mirror/lib-common'
import { computed } from 'vue'
import Color from 'colorjs.io'

const {
  progress,
  colorStart = { r: 0, g: 1, b: 0 },
  colorEnd = { r: 1, g: 0, b: 0 },
} = defineProps<{
  progress: number
  colorStart?: ColorRgb
  colorEnd?: ColorRgb
}>()

const gradient = computed(() => {
  const start = new Color('sRGB', [colorStart.r, colorStart.g, colorStart.b], colorStart.a)
  const end = new Color('sRGB', [colorEnd.r, colorEnd.g, colorEnd.b], colorEnd.a)
  return start.range(end, {
    space: 'oklch',
    outputSpace: 'sRGB',
  })
})

const currentColor = computed(() => gradient.value(progress).toString())
</script>

<style scoped>
.color-scale {
  color: v-bind(currentColor);
}
</style>
