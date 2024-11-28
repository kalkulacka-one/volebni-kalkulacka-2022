<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  backgroundColor: 'rgb(var(--color-neutral-bg-strong))',
});

const classes = computed(() => ({
  [`filled-circle--${props.size}`]: props.size,
}));
</script>

<template>
  <div
    :class="['filled-circle', classes]"
    :style="{ 'background-color': backgroundColor }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.filled-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: visible;

  &--extra-small {
    width: var(--sizing-medium);
    height: var(--sizing-medium);
  }

  &--small {
    width: calc(2 * var(--sizing-small));
    height: calc(2 * var(--sizing-small));
  }

  &--medium {
    width: var(--sizing-large);
    height: var(--sizing-large);
  }

  &--large {
    width: var(--sizing-extra-large);
    height: var(--sizing-extra-large);
  }

  &--extra-large {
    width: calc(3 * var(--spacing-medium));
    height: calc(3 * var(--spacing-medium));
  }
}
</style>
