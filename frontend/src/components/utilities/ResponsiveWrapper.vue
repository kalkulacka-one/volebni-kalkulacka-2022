<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  extraSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
  huge?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  extraSmall: false,
  small: false,
  medium: false,
  large: false,
  extraLarge: false,
  huge: false,
});

const classes = computed(() => ({
  'responsive-wrapper--extra-small': props.extraSmall,
  'responsive-wrapper--small': props.small,
  'responsive-wrapper--medium': props.medium,
  'responsive-wrapper--large': props.large,
  'responsive-wrapper--extra-large': props.extraLarge,
  'responsive-wrapper--huge': props.huge,
}));
</script>

<template>
  <div :class="['responsive-wrapper', classes]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/breakpoints.scss';

.responsive-wrapper {
  display: none;

  &--extra-small {
    @media (max-width: calc($breakpoint-extra-small - 1px)) {
      display: contents;
    }
  }

  &--small {
    @media (min-width: $breakpoint-extra-small) and (max-width: calc($breakpoint-small - 1px)) {
      display: contents;
    }
  }

  &--medium {
    @media (min-width: $breakpoint-small) and (max-width: calc($breakpoint-medium - 1px)) {
      display: contents;
    }
  }

  &--large {
    @media (min-width: $breakpoint-medium) and (max-width: calc($breakpoint-large - 1px)) {
      display: contents;
    }
  }

  &--extra-large {
    @media (min-width: $breakpoint-large) and (max-width: calc($breakpoint-extra-large - 1px)) {
      display: contents;
    }
  }

  &--huge {
    @media (min-width: $breakpoint-extra-large) {
      display: contents;
    }
  }
}
</style>
