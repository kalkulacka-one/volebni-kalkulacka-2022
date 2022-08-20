<script setup lang="ts">
export interface Props {
  icon: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
  title?: string;
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'currentColor',
  title: undefined,
});
</script>

<template>
  <span :class="size">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-hidden="!title"
      viewBox="0 0 24 24"
    >
      <title v-if="title">{{ title }}</title>
      <path :d="icon" :fill="color" />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.small {
  width: var(--spacing-small);
  height: var(--spacing-small);
}

.medium {
  width: var(--spacing-medium);
  height: var(--spacing-medium);
}

.large {
  width: var(--spacing-large);
  height: var(--spacing-large);
}
</style>
