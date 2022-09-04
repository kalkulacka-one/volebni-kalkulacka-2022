<script setup lang="ts">
import { computed } from 'vue';
import IconComponent from '../icons/IconComponent.vue';
export interface IconButtonProps {
  icon: string;
  color?: string;
  size: 'small' | 'medium' | 'large';
  title?: string;
}
const buttonClass = computed(() => {
  return ['button', `button--${props.size}`];
});
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
const props = defineProps<IconButtonProps>();
</script>

<template>
  <button :class="buttonClass">
    <IconComponent
      :title="title"
      :icon="icon"
      :color="color"
      :size="iconSize"
    ></IconComponent>
  </button>
</template>

<style scoped lang="scss">
/* Auto layout */
.button {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: var(--spacing-extra-small);
  border-width: 0px;
  box-sizing: content-box;

  background-color: inherit;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background: inherit !important;
  }
  &:hover {
    background: rgba(var(--color-neutral-bg-backdrop-hover));
  }
  &:active {
    background: rgba(var(--color-neutral-bg-backdrop-active));
  }
  &--small {
    width: var(--spacing-small);
    height: var(--spacing-small);
    border-radius: 50%;
  }
  &--medium {
    width: var(--spacing-medium);
    height: var(--spacing-medium);
    border-radius: 50%;
  }
  &--large {
    width: var(--spacing-large);
    height: var(--spacing-large);
    border-radius: 50%;
  }
}
</style>
