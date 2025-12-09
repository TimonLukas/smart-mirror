<template>
  <div class="app-scaler flex flex-col items-center justify-center absolute top-0 left-0">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const { scale = 1 } = defineProps<{ scale?: number }>()
const inverse = computed(() => 1 / scale)
</script>

<style scoped>
.app-scaler {
  width: calc(100% * v-bind(inverse));
  height: calc(100% * v-bind(inverse));
  transform: translate(calc((v-bind(scale) - 1) * 50%), calc((v-bind(scale) - 1) * 50%))
    scale(v-bind(scale));
}
</style>
