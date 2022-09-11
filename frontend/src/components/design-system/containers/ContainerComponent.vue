<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  padding?: 'small' | 'medium' | 'large';
  paddingResponsive?: boolean;
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: undefined,
  paddingResponsive: false,
  background: 'rgb(var(--color-neutral-bg-container))',
});

const classes = computed(() => ({
  [`container--padding-${props.padding}${
    props.paddingResponsive ? `-responsive` : ''
  }`]: props.padding,
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

      &-responsive {
        padding: var(--responsive-spacing-small);
      }
    }

    &-medium {
      padding: var(--spacing-medium);

      &-responsive {
        padding: var(--responsive-spacing-medium);
      }
    }

    &-large {
      padding: var(--spacing-large);

      &-responsive {
        padding: var(--responsive-spacing-large);
      }
    }
  }
}
</style>
