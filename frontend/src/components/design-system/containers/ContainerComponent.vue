<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  padding?: 'small' | 'large';
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: undefined,
  background: 'rgb(var(--color-neutral-bg-container))',
});

const classes = computed(() => ({
  [`container--padding-${props.padding}`]: props.padding,
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

  &--padding {
    &-small {
      padding: var(--spacing-small);
    }
    &-large {
      padding: var(--spacing-large);
    }
  }
}
</style>
