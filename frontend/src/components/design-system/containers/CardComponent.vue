<script setup lang="ts">
import type {
  Radius,
  Gap,
} from '@/components/design-system/configurations/sizing-and-spacing';

import { computed } from 'vue';

export interface Props {
  backgroundColor?: string;
  border?: boolean;
  borderKind?: 'normal' | 'strong';
  borderRadius?: Radius;
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  padding?: Gap & ('medium' | 'large');
  paddingAsymmetric?: boolean;
  responsive?: boolean;
  shadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'rgb(var(--color-neutral-bg-container))',
  border: false,
  borderKind: 'normal',
  borderRadius: 'small',
  padding: Object('medium') as Props['padding'],
  responsive: true,
  shadow: false,
});

const responsivePrefix = props.responsive ? 'responsive-' : '';

const border = computed(() => {
  return {
    width: props.border ? `var(--${responsivePrefix}border-thin)` : 0,
    radius: `var(--${responsivePrefix}radius-${props.borderRadius})`,
  };
});

const padding = computed(() => {
  let horizontal = `var(--${responsivePrefix}gap-${props.padding})`;
  let vertical = `var(--${responsivePrefix}gap-${props.padding})`;

  if (props.paddingAsymmetric) {
    horizontal = `2 * var(--${responsivePrefix}gap-${props.padding})`;
  }

  if (props.border) {
    horizontal = `${horizontal} - ${border.value.width}`;
    vertical = `${vertical} - ${border.value.width}`;
  }

  return {
    horizontal: `calc(${horizontal})`,
    vertical: `calc(${vertical})`,
  };
});

const classes = computed(() => ({
  [`card--corner-${props.corner}`]: props.corner,
  'card--border': props.border,
  [`card--border-${props.borderKind}`]: props.border,
  'card--shadow': props.shadow,
}));
</script>

<template>
  <div
    :class="['card', classes]"
    :style="{ 'background-color': backgroundColor }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  border-style: solid;
  border-width: v-bind('border.width');
  border-radius: v-bind('border.radius');
  padding-top: v-bind('padding.vertical');
  padding-right: v-bind('padding.horizontal');
  padding-bottom: v-bind('padding.vertical');
  padding-left: v-bind('padding.horizontal');

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
}
</style>
