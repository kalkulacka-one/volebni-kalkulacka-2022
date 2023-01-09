<script setup lang="ts">
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import SocialMediaIcon from '@/components/design-system/icons/SocialMediaIcon.vue';
</script>

<template>
  <ButtonComponent
    kind="filled"
    color="white"
    class="w-full"
    tag="a"
    href="/api/auth/google?returnTo=/vitejte"
  >
    <template #icon>
      <SocialMediaIcon type="google" />
    </template>
    Pokračovat přes Google
  </ButtonComponent>
  <ButtonComponent
    kind="filled"
    color="facebook"
    class="w-full"
    tag="a"
    href="/api/auth/facebook?returnTo=/vitejte"
  >
    <template #icon>
      <SocialMediaIcon type="facebook" color="white" />
    </template>
    Pokračovat přes Facebook
  </ButtonComponent>
  <ButtonComponent
    v-if="false"
    kind="filled"
    color="neutral"
    class="w-full"
    tag="a"
    href="/api/auth/twitter?returnTo=/vitejte"
  >
    <template #icon>
      <SocialMediaIcon type="twitter" color="white" />
    </template>
    Pokračovat přes Twitter
  </ButtonComponent>
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
</style>
