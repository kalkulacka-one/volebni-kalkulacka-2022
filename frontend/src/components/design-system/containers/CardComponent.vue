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
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'rgba(var(--color-neutral-bg-container), 1)', // default with no transparency
  border: false,
  borderKind: 'normal',
  borderRadius: 'small',
  padding: 'medium' as Props['padding'],
  responsive: true,
  shadow: false,
  disabled: false,
});

const responsivePrefix = props.responsive ? 'responsive-' : '';

const border = computed(() => ({
  width: props.border ? `var(--${responsivePrefix}border-thin)` : '0',
  radius: `var(--${responsivePrefix}radius-${props.borderRadius})`,
}));

const padding = computed(() => {
  let horizontal = `var(--${responsivePrefix}gap-${props.padding})`;
  let vertical = `var(--${responsivePrefix}gap-${props.padding})`;

  if (props.paddingAsymmetric) {
    horizontal = `calc(2 * var(--${responsivePrefix}gap-${props.padding}))`;
  }

  if (props.border) {
    horizontal = `calc(${horizontal} - ${border.value.width})`;
    vertical = `calc(${vertical} - ${border.value.width})`;
  }

  return {
    horizontal,
    vertical,
  };
});

const classes = computed(() => ({
  [`card--corner-${props.corner}`]: props.corner,
  'card--border': props.border,
  [`card--border-${props.borderKind}`]: props.border,
  'card--shadow': props.shadow,
  'card--disabled': props.disabled,
}));
</script>

<template>
  <div
    :class="['card', classes]"
    :style="{
      'background-color': backgroundColor,
      'border-width': border.value.width,
      'border-radius': border.value.radius,
      'padding-top': padding.value.vertical,
      'padding-right': padding.value.horizontal,
      'padding-bottom': padding.value.vertical,
      'padding-left': padding.value.horizontal,
    }"
    :tabindex="props.disabled ? -1 : 0"
    @click="!props.disabled && $emit('click')"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  display: inline-block;
  border-style: solid;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-sizing: border-box;

  /* Hover, active, focus, and disabled states */
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(var(--color-neutral-shadow), 0.2);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(var(--color-neutral-shadow), 0.2);
  }

  &:focus {
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  /* Sharp corners */
  &--corner-top-left {
    border-top-left-radius: 0;
  }
  &--corner-top-right {
    border-top-right-radius: 0;
  }
  &--corner-bottom-left {
    border-bottom-left-radius: 0;
  }
  &--corner-bottom-right {
    border-bottom-right-radius: 0;
  }

  /* Border styles */
  &--border {
    &-normal {
      border-color: rgb(var(--color-neutral-border));
    }
    &-strong {
      border-color: rgb(var(--color-neutral-border-strong));
    }
  }

  /* Shadow */
  &--shadow {
    box-shadow: 0 4px 6px rgba(var(--color-neutral-shadow), 0.2);
  }
}
</style>
