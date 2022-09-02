<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';

export interface Props {
  desktop?: boolean;
  mobile?: boolean;
  transparent: 'always' | 'never' | 'desktop' | 'mobile';
}

const props = withDefaults(defineProps<Props>(), {
  desktop: true,
  mobile: true,
});

const classes = computed(() => ({
  'bottom-bar--transparent': props.transparent === 'always',
  'bottom-bar--transparent-desktop': props.transparent === 'desktop',
  'bottom-bar--transparent-mobile': props.transparent === 'mobile',
  'bottom-bar--desktop': props.desktop,
  'bottom-bar--mobile': props.mobile,
}));
</script>

<template>
  <ContainerComponent :class="['bottom-bar', classes]" padding="small">
    <slot />
  </ContainerComponent>
</template>

<style scoped lang="scss">
.bottom-bar {
  display: none;

  &--desktop {
    @media (min-width: 700px) {
      display: block;
    }
  }

  &--mobile {
    @media (max-width: 700px) {
      display: block;
    }
  }

  &--transparent {
    background-color: transparent;
  }

  &--transparent-desktop {
    @media (min-width: 700px) {
      background-color: transparent;
    }
  }

  &--transparent-mobile {
    @media (max-width: 700px) {
      background-color: transparent;
    }
  }
}
</style>
