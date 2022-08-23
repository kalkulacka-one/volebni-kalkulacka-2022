<script setup lang="ts">
import { computed } from 'vue';
import LabelText from '@/components/design-system/typography/LabelText.vue';

export interface Props {
  active?: boolean;
}

const classes = computed(() => ({
  'pill--active': props.active,
}));

const props = withDefaults(defineProps<Props>(), {
  active: false,
});
</script>

<template>
  <div :class="['pill', classes]">
    <LabelText>
      <slot />
    </LabelText>
  </div>
</template>

<style lang="scss" scoped>
.pill {
  border-color: rgb(var(--color-neutral-border));
  border-radius: var(--radius-medium);
  border-style: solid;
  border-width: var(--spacing-pico);
  background-color: rgb(var(--color-neutral-bg));
  color: rgb(var(--color-neutral-fg));
  padding: var(--spacing-extra-small) var(--spacing-small);

  &--active {
    border-color: rgb(var(--color-neutral-border-strong));
    background-color: rgb(var(--color-neutral-bg-active));
    color: rgb(var(--color-neutral-fg-inverse));
  }
}
</style>
