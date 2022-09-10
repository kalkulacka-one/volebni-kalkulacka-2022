<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  icon: string;
  color?: string;
  size?: 'small' | 'medium' | 'large' | 'extra-large' | 'extra-huge';
  title?: string;
  loadAnimation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'currentColor',
  title: undefined,
  loadAnimation: false,
});

const classes = computed(() => ({
  [`icon--${props.size}`]: props.size,
  'icon--animation': props.loadAnimation,
}));
</script>

<template>
  <div :class="['icon', classes]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-hidden="!title"
      viewBox="0 0 24 24"
    >
      <title v-if="title">{{ title }}</title>
      <path :d="icon" :fill="color" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  &--small {
    width: var(--spacing-small);
    height: var(--spacing-small);
  }

  &--medium {
    width: var(--spacing-medium);
    height: var(--spacing-medium);
  }

  &--large {
    width: var(--spacing-large);
    height: var(--spacing-large);
  }

  &--extra-large {
    width: var(--spacing-extra-large);
    height: var(--spacing-extra-large);
  }

  &--extra-huge {
    width: var(--spacing-extra-huge);
    height: var(--spacing-extra-huge);
  }

  &--animation {
    :deep(svg) {
      animation: spin 1.2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
