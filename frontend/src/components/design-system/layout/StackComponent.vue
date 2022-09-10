<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  horizontal?: boolean;
  spacing?: 'extra-small' | 'small' | 'medium' | 'large';
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false,
  spacing: undefined,
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

  &--spacing {
    &-extra-small {
      gap: var(--spacing-extra-small);
    }

    &-small {
      gap: var(--spacing-small);
    }

    &-medium {
      gap: var(--spacing-medium);
    }

    &-large {
      gap: var(--spacing-large);
    }
  }

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }

  &--centered {
    align-items: center;
  }
}
</style>
