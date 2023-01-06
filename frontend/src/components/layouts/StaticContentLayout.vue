<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  size?: 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'large',
});

const classes = computed(() => ({
  [`content--${props.size}`]: props.size,
}));
</script>

<template>
  <div :class="['content', classes]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;

  &--large {
    max-width: 1280px;
  }

  &--medium {
    max-width: 670px;
  }
}
</style>
