<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiLogout } from '@mdi/js';

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
const handleLogout = async () => {
  const response = await fetch('/api/auth/logout');
  if (response.ok) {
    router.push(appRoutes.index);
  } else {
    throw Error('Logout failed');
  }
};
</script>

<template>
  <CardComponent
    corner="top-right"
    padding="medium"
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

      <ButtonComponent kind="link" @click.prevent="handleLogout">
        <IconComponent
          :icon="mdiLogout"
          size="medium"
          color="rgb(var(--color-neutral-fg))"
        />
      </ButtonComponent>
    </StackComponent>
  </CardComponent>
</template>

<style scoped lang="scss"></style>
