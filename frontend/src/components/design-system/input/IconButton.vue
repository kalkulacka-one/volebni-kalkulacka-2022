<script setup lang="ts">
import { computed } from 'vue';
import IconComponent from '../icons/IconComponent.vue';
export interface IconButtonProps {
  icon: string;
  color: string;
  size: 'small' | 'medium' | 'large';
}
const buttonClass = computed(() => {
  return ['button', `button--${props.size as string}`];
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
    <IconComponent :icon="icon" :color="color" :size="iconSize"></IconComponent>
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
  background-color: inherit;
  &:hover {
    background: rgba(var(--color-neutral-bg-backdrop-hover));
    cursor: pointer;
  }
  &:active {
    background: rgba(var(--color-neutral-bg-backdrop-active));
  }
  &--small {
    width: var(--spacing-large);
    height: var(--spacing-large);
    border-radius: var(--spacing-large);
  }
  &--medium {
    width: var(--spacing-extra-large);
    height: var(--spacing-extra-large);
    border-radius: var(--spacing-extra-large);
  }
  &--large {
    width: var(--spacing-extra-huge);
    height: var(--spacing-extra-huge);
    border-radius: var(--spacing-extra-huge);
  }
}
</style>
