<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  horizontal?: boolean;
  spacing?: 'extra-small' | 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false,
  spacing: 'small',
});

const classes = computed(() => ({
  'stack--horizontal': props.horizontal,
  [`stack--${props.spacing}`]: props.spacing,
}));
</script>

<template>
  <div :class="['stack', classes]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.stack {
  display: flex;
  flex-direction: column;

  &--horizontal {
    flex-direction: row;
  }

  &--extra-small:deep() * + * {
    margin-top: var(--spacing-extra-small);
  }

  &--small:deep() * + * {
    margin-top: var(--spacing-small);
  }

  &--medium:deep() * + * {
    margin-top: var(--spacing-medium);
  }

  &--large:deep() * + * {
    margin-top: var(--spacing-large);
  }
}
</style>
