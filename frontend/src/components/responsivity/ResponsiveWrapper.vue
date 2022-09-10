<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  desktop?: boolean;
  mobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  desktop: false,
  mobile: false,
});

const classes = computed(() => ({
  'responsive-wrapper--desktop': props.desktop,
  'responsive-wrapper--mobile': props.mobile,
}));
</script>

<template>
  <div :class="['responsive-wrapper', classes]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.responsive-wrapper {
  display: none;

  &--desktop {
    @media (min-width: 601px) {
      display: initial;
    }
  }

  &--mobile {
    @media (max-width: 600px) {
      display: initial;
    }
  }
}
</style>
