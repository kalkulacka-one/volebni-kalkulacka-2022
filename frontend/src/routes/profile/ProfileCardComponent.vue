<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiCogOutline } from '@mdi/js';

import { appRoutes } from '@/main';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
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
    corner="top-right"
    spacing="medium"
    border
    border-radius="medium"
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

      <ButtonComponent
        kind="link"
        @click="router.push(appRoutes.profileSettings)"
      >
        <IconComponent
          :icon="mdiCogOutline"
          size="medium"
          color="rgb(var(--color-neutral-fg))"
        />
      </ButtonComponent>
    </StackComponent>
  </CardComponent>
</template>

<style scoped lang="scss"></style>
