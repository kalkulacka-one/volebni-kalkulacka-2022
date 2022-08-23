<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  padding?: boolean;
  paddingSize?: 'small' | 'large';
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: false,
  paddingSize: 'small',
  background: 'rgb(var(--color-neutral-bg-container))',
});

const classes = computed(() => ({
  [`container--padding-${props.paddingSize}`]: props.padding,
}));
</script>

<template>
  <div :class="['container', classes]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: v-bind(background);

  &--padding-small {
    padding: var(--spacing-small);
  }
  &--padding-large {
    padding: var(--spacing-large);
  }
}
</style>
