<script lang="ts" setup>
const {
  label,
  unit,
  mono = true,
} = defineProps<{
  label?: string
  unit?: string
  mono?: boolean
}>()

defineSlots<{
  default?(): unknown
  label?(): unknown
}>()
</script>

<template>
  <div class="contents">
    <div class="text-muted-foreground">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="text-right" :class="{ 'font-mono': mono }">
      <slot />
    </div>
    <div class="pl-1">
      <span class="text-muted-foreground font-mono">
        <template v-if="typeof unit !== 'undefined'">{{ unit }}</template>
        <template v-else>&nbsp;&nbsp;</template>
      </span>
    </div>
  </div>
</template>
