<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  radius?: 'small' | 'large';
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  border?: boolean;
  borderKind?: 'normal' | 'strong';
  shadow?: boolean;
  padding?: 'small' | 'small-mixed' | 'large';
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  radius: 'small',
  border: false,
  borderKind: 'normal',
  shadow: false,
  padding: 'small',
  backgroundColor: 'rgb(var(--color-neutral-bg-container))',
});

const classes = computed(() => ({
  [`card--radius-${props.radius}`]: props.radius,
  [`card--corner-${props.corner}`]: props.corner,
  'card--border': props.border,
  [`card--border-${props.borderKind}`]: props.border,
  'card--shadow': props.shadow,
  [`card--padding-${props.padding}`]: props.padding,
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
    box-shadow: 6px 8px 0px 0px
      rgba(var(--color-neutral-shadow), var(--transparency-20));
  }

  &--padding {
    &-small {
      padding: var(--spacing-small);
    }
    &-small-mixed {
      // TODO: fix breakpoint
      padding: var(--spacing-small) var(--spacing-small);

      @media (min-width: 700px) {
        padding: var(--spacing-small) var(--spacing-large);
      }
    }

    &-large {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-large);
      padding-left: calc(2 * var(--spacing-large));
      padding-right: calc(2 * var(--spacing-large));
    }
  }
}
</style>
