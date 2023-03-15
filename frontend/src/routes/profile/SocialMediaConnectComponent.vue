<script setup lang="ts">
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import SocialMediaIcon from '@/components/design-system/icons/SocialMediaIcon.vue';
import type { Question } from '@/types/question';

export interface Props {
  googleUrl: string;
  facebookUrl: string;
}

defineProps<Props>();
</script>

<template>
  <ButtonComponent kind="filled" color="white" tag="a" :href="googleUrl">
    <template #icon>
      <SocialMediaIcon type="google" />
    </template>
    Pokračovat přes Google
  </ButtonComponent>
  <ButtonComponent kind="filled" color="facebook" tag="a" :href="facebookUrl">
    <template #icon>
      <SocialMediaIcon type="facebook" color="white" />
    </template>
    Pokračovat přes Facebook
  </ButtonComponent>
</template>
