<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';

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
  'navigation-bar--centered-title': props.centeredTitle,
}));

const background = computed(() =>
  props.transparent ? 'transparent' : undefined
);
</script>

<template>
  <ContainerComponent
    :class="['navigation-bar', classes]"
    :background="background"
    :padding="padding"
    :padding-responsive="paddingResponsive"
  >
    <div class="logo">
      <ResponsiveWrapper extra-small small>
        <LogoComponent :text="false" />
      </ResponsiveWrapper>
      <ResponsiveWrapper medium large extra-large huge>
        <LogoComponent />
      </ResponsiveWrapper>
    </div>
    <ResponsiveWrapper extra-small>
      <div class="title">
        <BodyText size="extra-small">
          <slot name="title" />
        </BodyText>
      </div>
    </ResponsiveWrapper>
    <ResponsiveWrapper small>
      <div class="title title--centered">
        <BodyText size="small">
          <slot name="title" />
        </BodyText>
      </div>
    </ResponsiveWrapper>
    <ResponsiveWrapper medium large extra-large huge>
      <div class="title">
        <BodyText size="small">
          <slot name="title" />
        </BodyText>
      </div>
    </ResponsiveWrapper>
    <StackComponent
      class="right"
      horizontal
      spacing="medium"
      spacing-responsive
    >
      <slot name="right" />
    </StackComponent>
  </ContainerComponent>
</template>

<style scoped lang="scss">
.navigation-bar {
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-areas: 'logo title right';
  align-items: center;
  gap: var(--responsive-spacing-large);

  .logo {
    grid-area: logo;
  }

  .title {
    grid-area: title;

    &--centered {
      grid-column-start: logo;
      grid-column-end: right;
      justify-self: center;
    }
  }

  .right {
    grid-area: right;
    justify-content: end;
  }
}
</style>
