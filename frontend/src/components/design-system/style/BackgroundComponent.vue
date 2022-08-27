<script setup lang="ts">
import { computed } from 'vue';

const classes = computed(() => ({}));
</script>

<template>
  <div :class="['background', classes]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.background {
  background-color: var(--color-neutral-bg);
}
</style>
