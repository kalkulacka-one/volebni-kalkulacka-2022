<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiCogOutline } from '@mdi/js';

import { appRoutes } from '@/main';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

export interface Props {
  name?: string;
  email?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  email: '',
});

const router = useRouter();
</script>

<template>
  <CardComponent
    class="card"
    corner="top-right"
    spacing="medium"
    border
    border-radius="medium"
    @click.prevent="router.push(appRoutes.profileSettings)"
  >
    <StackComponent spacing="small" horizontal centered space-between>
      <StackComponent spacing="extra-small">
        <TitleText tag="span" size="small">
          {{ props.name }}
        </TitleText>
        <BodyText size="small">
          {{ props.email }}
        </BodyText>
      </StackComponent>

      <IconComponent
        :icon="mdiCogOutline"
        size="medium"
        color="rgb(var(--color-neutral-fg))"
      />
    </StackComponent>
  </CardComponent>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;
  z-index: 1;
  &:hover {
    box-shadow: 6px 8px 0px 0px
      rgba(var(--color-neutral-shadow), var(--transparency-20));
  }
}
</style>
