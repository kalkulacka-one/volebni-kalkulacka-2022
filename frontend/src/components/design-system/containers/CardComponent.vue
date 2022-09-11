<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  radius?: 'small' | 'large';
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  border?: boolean;
  borderKind?: 'normal' | 'strong';
  shadow?: boolean;
  padding?: 'small' | 'medium' | 'large';
  paddingResponsive?: boolean;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  radius: 'small',
  border: false,
  borderKind: 'normal',
  shadow: false,
  padding: 'small',
  paddingResponsive: false,
  backgroundColor: 'rgb(var(--color-neutral-bg-container))',
});

const classes = computed(() => ({
  [`card--radius-${props.radius}`]: props.radius,
  [`card--corner-${props.corner}`]: props.corner,
  'card--border': props.border,
  [`card--border-${props.borderKind}`]: props.border,
  'card--shadow': props.shadow,
  [`card--padding-${props.padding}${
    props.paddingResponsive ? `-responsive` : ''
  }`]: props.padding,
}));
</script>

<template>
  <div :class="classes" :style="{ 'background-color': backgroundColor }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  &--radius {
    &-small {
      border-radius: var(--radius-small);
    }

    &-large {
      border-radius: var(--radius-large);
    }
  }

  &--corner {
    &-top-left {
      border-top-left-radius: 0;
    }

    &-top-right {
      border-top-right-radius: 0;
    }

    &-bottom-left {
      border-bottom-left-radius: 0;
    }

    &-bottom-right {
      border-bottom-right-radius: 0;
    }
  }

  &--border {
    border-style: solid;
    border-width: var(--spacing-pico);

    &-normal {
      border-color: rgb(var(--color-neutral-border));
    }

    &-strong {
      border-color: rgb(var(--color-neutral-border-strong));
    }
  }

  &--shadow {
    // TODO: Add shadow to theme
    box-shadow: 6px 8px 0px 0px
      rgba(var(--color-neutral-shadow), var(--transparency-20));
  }

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
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-large);
      padding-left: calc(2 * var(--spacing-large));
      padding-right: calc(2 * var(--spacing-large));

      &-responsive {
        padding-top: var(--responsive-spacing-large);
        padding-bottom: var(--responsive-spacing-large);
        padding-left: var(--responsive-spacing-2-large);
        padding-right: var(--responsive-spacing-2-large);
      }
    }
  }
}
</style>
