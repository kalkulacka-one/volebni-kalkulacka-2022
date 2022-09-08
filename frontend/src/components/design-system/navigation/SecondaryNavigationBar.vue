<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

export interface Props {
  transparent?: boolean;
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
  centered: false,
});

const classes = computed(() => ({
  'secondary-navigation-bar--centered': props.centered,
}));

const background = computed(() =>
  props.transparent ? 'transparent' : undefined
);
</script>

<template>
  <ContainerComponent
    :class="['secondary-navigation-bar', classes]"
    :background="background"
    padding="medium"
  >
    <div v-if="$slots.before" class="before">
      <slot name="before" />
    </div>
    <div class="title">
      <TitleText tag="h2" size="large">
        <slot />
      </TitleText>
    </div>
    <div v-if="$slots.right" class="right">
      <slot name="right" />
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
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'before title right after';
  gap: var(--spacing-large);

  .before {
    grid-area: before;
  }

  .title {
    grid-area: title;
  }

  .right {
    grid-area: right;
  }

  .after {
    grid-area: after;
  }
}
</style>
