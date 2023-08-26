<script setup lang="ts">
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import SocialMediaIcon from '@/components/design-system/icons/SocialMediaIcon.vue';
import type { DeprecatedQuestion } from '@/types/question';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
    {{ $t('routes.profile.SocialMediaConnectCompponent.google') }}
  </ButtonComponent>
  <ButtonComponent kind="filled" color="facebook" tag="a" :href="facebookUrl">
    <template #icon>
      <SocialMediaIcon type="facebook" color="white" />
    </template>
    {{ $t('routes.profile.SocialMediaConnectCompponent.facebook') }}
  </ButtonComponent>
</template>
