<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  last?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  last: false,
});
</script>

<template>
  <li :class="['timeline-item', { 'timeline-item--last': props.last }]">
    <slot />
  </li>
</template>

<style scoped lang="scss">
.timeline-item {
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: rgb(var(--palette-neutral-30));
  }

  &:before {
    top: var(--base-medium);
    left: calc(var(--base-small) * -1);
    width: var(--base-extra-small);
    height: var(--base-extra-small);
    border-radius: 50%;
  }

  &:after {
    top: var(--spacing-huge);
    left: calc(0.65rem * -1);
    height: calc(100% - var(--base-extra-small));
    width: 1px;
  }

  &:last-of-type {
    &:after {
      content: none;
    }
  }

  &--last {
    padding: 1.5rem 0.5rem 0;
  }
}
</style>
