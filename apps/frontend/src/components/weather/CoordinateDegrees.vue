<template>
  <span>{{ degrees.degrees }}° {{ degrees.minutes }}' {{ degrees.seconds }}''</span>
</template>

<script setup lang="ts">
import { decimalCoordinateToDegrees } from '@smart-mirror/lib-common'
import { computed } from 'vue'

const { coordinate } = defineProps<{
  coordinate: number
}>()

const degrees = computed(() => decimalCoordinateToDegrees(coordinate))
</script>
