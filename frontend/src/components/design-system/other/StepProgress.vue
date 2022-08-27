<script setup lang="ts">
export interface Props {
  current: number;
}

defineProps<Props>();

const totalSteps = 4;
</script>

<template>
  <div class="step-progress">{{ current }} / {{ totalSteps }}</div>
</template>
