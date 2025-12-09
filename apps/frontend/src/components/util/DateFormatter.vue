<template>
  <span class="date-formatter">{{ formattedDate }}</span>
</template>

<script lang="ts" setup>
import { format } from 'date-fns'
import { computed } from 'vue'

const { date, dateFormat = 'yyyy-MM-dd' } = defineProps<{
  date: Date
  dateFormat?: string
}>()

const formattedDate = computed(() => format(date, dateFormat))
</script>
