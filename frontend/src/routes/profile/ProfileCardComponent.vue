<script setup lang="ts">
import { mdiCogOutline } from '@mdi/js';

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
</script>

<template>
  <CardComponent
    corner="top-right"
    padding="medium"
    border
    border-radius="medium"
  >
    <StackComponent spacing="small" horizontal centered spaceBetween>
      <StackComponent spacing="extra-small">
        <TitleText tag="span" size="small">
          {{ props.name }}
        </TitleText>
        <BodyText size="small">
          {{ props.email }}
        </BodyText>
      </StackComponent>

      <ButtonComponent tag="a" kind="link" href=".">
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
