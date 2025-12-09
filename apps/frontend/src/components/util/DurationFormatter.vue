<template>
  <span class="duration-formatter">
    <template v-if="values.years > 0 || units.years">
      <span :class="classValue">{{ values.years }}</span>
      <span :class="classUnit">y</span>
    </template>
    <template v-if="values.weeks > 0 || units.weeks">
      <span :class="classValue">{{ values.weeks }}</span>
      <span :class="classUnit">w</span>
    </template>
    <template v-if="values.days > 0 || units.days">
      <span :class="classValue">{{ values.days }}</span>
      <span :class="classUnit">d</span>
    </template>
    <template v-if="values.hours > 0 || units.hours">
      <span :class="classValue">{{ values.hours.toString().padStart(2, '0') }}</span>
      <span :class="classUnit">h</span>
    </template>
    <template v-if="values.minutes > 0 || units.minutes">
      <span :class="classValue">{{ values.minutes.toString().padStart(2, '0') }}</span>
      <span :class="classUnit">m</span>
    </template>
    <template v-if="values.seconds > 0 || units.seconds">
      <span :class="classValue">{{ values.seconds.toString().padStart(2, '0') }}</span>
      <span :class="classUnit">s</span>
    </template>
    <template v-if="values.milliseconds > 0 || units.milliseconds">
      <span :class="classValue">{{ values.milliseconds.toString().padStart(3, '0') }}</span>
      <span :class="classUnit">ms</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
import type { Temporal } from '@smart-mirror/lib-common'
import { computed } from 'vue'

const {
  duration,
  units = {},
  classValue,
  classUnit = 'text-muted-foreground/50',
} = defineProps<{
  duration: Temporal.Duration
  units?: {
    years?: boolean
    weeks?: boolean
    days?: boolean
    hours?: boolean
    minutes?: boolean
    seconds?: boolean
    milliseconds?: boolean
  }
  classValue?: string
  classUnit?: string
}>()

const values = computed(() => ({
  years: duration.years,
  weeks: duration.weeks,
  days: duration.days,
  hours: duration.hours,
  minutes: duration.minutes,
  seconds: duration.seconds,
  milliseconds: duration.milliseconds,
}))
</script>
