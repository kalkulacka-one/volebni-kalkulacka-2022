<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

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
    class="navigation-bar"
    :background="background"
    padding="medium"
  >
    <div class="grid">
      <LogoComponent />
      <div class="title">
        <BodyText size="small">
          <slot name="title" />
        </BodyText>
      </div>
      <StackComponent class="right" horizontal>
        <slot name="right" />
      </StackComponent>
    </div>
  </ContainerComponent>
</template>

<style scoped lang="scss">
.navigation-bar {
  .grid {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto 1fr;

    @media (max-width: 700px) {
      grid-template-columns: 1fr auto 1fr;
    }

    .title {
      justify-self: center;
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }

    .right {
      justify-content: end;
    }
  }
}
</style>
