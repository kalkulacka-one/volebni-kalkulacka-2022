<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';

export interface Props {
  padding?: 'small' | 'medium' | 'large';
  paddingResponsive?: boolean;
  transparent?: boolean;
  centeredTitle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'large',
  paddingResponsive: true,
  transparent: false,
  centeredTitle: false,
});

const classes = computed(() => ({
  'secondary-navigation-bar--centered-title': props.centeredTitle,
}));

const background = computed(() =>
  props.transparent ? 'transparent' : undefined,
);
</script>

<template>
  <ContainerComponent
    :class="['secondary-navigation-bar', classes]"
    :background="background"
    :padding="padding"
    :padding-responsive="paddingResponsive"
  >
    <div v-if="$slots.before" class="before">
      <slot name="before" />
    </div>
    <div class="title">
      <slot />
    </div>
    <div v-if="$slots.after" class="after">
      <slot name="after" />
    </div>
  </ContainerComponent>
</template>

<style scoped lang="scss">
.secondary-navigation-bar {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'before title after';
  gap: var(--responsive-spacing-large);

  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);

  .before {
    grid-area: before;
  }

  .title {
    grid-area: title;
  }

  .after {
    grid-area: after;
  }

  &--centered-title {
    .title {
      grid-column-start: before;
      grid-column-end: after;
      justify-self: center;
    }
  }
}
</style>
