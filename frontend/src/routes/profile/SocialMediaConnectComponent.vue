<script setup lang="ts">
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import SocialMediaIcon from '@/components/design-system/icons/SocialMediaIcon.vue';
</script>

<template>
  <StackComponent spacing="medium" stretched>
    <ButtonComponent
      kind="filled"
      color="white"
      tag="a"
      href="/api/auth/google?returnTo=/"
    >
      <template #icon>
        <SocialMediaIcon type="google" />
      </template>
      Pokračovat přes Google
    </ButtonComponent>
    <ButtonComponent
      kind="filled"
      color="facebook"
      tag="a"
      href="/api/auth/facebook?returnTo=/"
    >
      <template #icon>
        <SocialMediaIcon type="facebook" color="white" />
      </template>
      Pokračovat přes Facebook
    </ButtonComponent>
  </StackComponent>
</template>
