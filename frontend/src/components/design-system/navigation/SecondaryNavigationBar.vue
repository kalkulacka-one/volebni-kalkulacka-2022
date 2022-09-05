<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

export interface Props {
  transparent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
});

const background = computed(() =>
  props.transparent ? 'transparent' : undefined
);
</script>

<template>
  <ContainerComponent
    class="secondary-navigation-bar"
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
    <div v-if="$slots.right" class="after">
      <slot name="right" />
    </div>
  </ContainerComponent>
</template>

<style scoped lang="scss">
.secondary-navigation-bar {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-large);

  @media (max-width: 700px) {
    grid-template-columns: 1fr auto 1fr;

    .title {
      justify-self: center;
    }

    .after {
      display: none;
    }
  }
}
</style>
