<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  horizontal?: boolean;
  spacing?: 'extra-small' | 'small' | 'medium' | 'large';
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false,
  spacing: 'small',
  centered: false,
});

const classes = computed(() => ({
  'stack--vertical': !props.horizontal,
  'stack--horizontal': props.horizontal,
  [`stack--spacing-${props.spacing}`]: props.spacing,
  'stack--centered': props.centered,
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
  align-items: start;

  &--vertical {
    flex-direction: column;

    &.stack--spacing-extra-small:deep() > * + * {
      margin-top: var(--spacing-extra-small);
    }

    &.stack--spacing-small:deep() > * + * {
      margin-top: var(--spacing-small);
    }

    &.stack--spacing-medium:deep() > * + * {
      margin-top: var(--spacing-medium);
    }

    &.stack--spacing-large:deep() > * + * {
      margin-top: var(--spacing-large);
    }
  }

  &--horizontal {
    flex-direction: row;

    &.stack--spacing-extra-small:deep() > * + * {
      margin-left: var(--spacing-extra-small);
    }

    &.stack--spacing-small:deep() > * + * {
      margin-left: var(--spacing-small);
    }

    &.stack--spacing-medium:deep() > * + * {
      margin-left: var(--spacing-medium);
    }

    &.stack--spacing-large:deep() > * + * {
      margin-left: var(--spacing-large);
    }
  }

  &--centered {
    align-items: center;
  }
}
</style>
