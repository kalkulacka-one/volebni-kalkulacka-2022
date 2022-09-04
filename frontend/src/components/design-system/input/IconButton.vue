<script setup lang="ts">
import { computed } from 'vue';

import IconComponent from '@/components/design-system/icons/IconComponent.vue';

export interface IconButtonProps {
  icon: string;
  color?: string;
  size: 'small' | 'medium' | 'large';
  title: string;
}

const props = defineProps<IconButtonProps>();

const iconSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 'small';
    case 'medium':
      return 'medium';
    case 'large':
      return 'extra-large';
    default:
      return 'medium';
  }
});
</script>

<template>
  <button class="icon-button">
    <IconComponent
      :title="title"
      :icon="icon"
      :color="color"
      :size="iconSize"
    />
  </button>
</template>

<style scoped lang="scss">
/* Auto layout */
.icon-button {
  padding: var(--spacing-extra-small);
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:disabled {
    color: rgb(var(--color-neutral-fg-disabled));
    background: transparent !important;
    cursor: not-allowed;
  }

  &:hover {
    background: rgba(var(--color-neutral-bg-backdrop-hover));
  }

  &:active {
    background: rgba(var(--color-neutral-bg-backdrop-active));
  }
}
</style>
