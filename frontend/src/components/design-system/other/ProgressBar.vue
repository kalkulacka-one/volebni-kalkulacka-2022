<script setup lang="ts">
export interface Props {
  progress: number;
}

const props = defineProps<Props>();
const width: number =
  props.progress > 100 ? 100 : props.progress < 0 ? 0 : props.progress;
</script>

<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: width + '%' }"></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  background-color: rgb(var(--palette-neutral-90));
  border-radius: var(--radius-2x-small);
  width: 100%;
  height: 0.375rem;
}

.progress {
  background-color: rgb(var(--palette-primary-50));
  border-radius: var(--radius-2x-small);
  height: 0.375rem;
}
</style>
