<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { appRoutes } from '@/main';

import AvatarComponent from '@/components/design-system/other/AvatarComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';


export interface Props {
  padding?: 'small' | 'medium' | 'large';
  paddingResponsive?: boolean;
  transparent?: boolean;
  centeredTitle?: boolean;
  withLogo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'large',
  paddingResponsive: true,
  transparent: false,
  centeredTitle: false,
  withLogo: true,
});

const indexPage = computed(() => useRoute()?.path === '/');

const classes = computed(() => ({
  'navigation-bar--centered-title': props.centeredTitle,
}));

const background = computed(() =>
  props.transparent ? 'transparent' : undefined
);

const router = useRouter();

</script>

<template>
  <ContainerComponent
    :class="['navigation-bar', classes]"
    :background="background"
    :padding="padding"
    :padding-responsive="paddingResponsive"
  >
    <div v-if="withLogo" class="logo">
      <EmbedWrapper>
        <ResponsiveWrapper extra-small small>
          <LogoComponent :text="false" :link="!indexPage" />
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <LogoComponent :link="!indexPage" />
        </ResponsiveWrapper>
      </EmbedWrapper>
      <EmbedWrapper embed>
        <ResponsiveWrapper extra-small small>
          <LogoComponent
            :text="false"
            monochromatic="rgb(var(--color-neutral-fg))"
          />
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <LogoComponent monochromatic="rgb(var(--color-neutral-fg))" />
        </ResponsiveWrapper>
      </EmbedWrapper>
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
      <slot name="right">
      </slot>
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
  width: 100%;

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

.user-avatar {
  cursor: pointer;
}
</style>
