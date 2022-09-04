<script setup lang="ts">
import SocialMediaIcon, {
  type SocialMediaProps,
} from '../../components/design-system/icons/SocialMediaIcon.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import { mdiTrayArrowDown } from '@mdi/js';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
const handleShareClick = (type: SocialMediaProps['type']) => {
  console.debug(`Sharing ${type}`);
};
const handleDownloadPng = () => {
  console.debug(`Downloading ...`);
};
</script>
<template>
  <CardComponent
    class="share-wrapper"
    corner="top-right"
    radius="small"
    border
    border-kind="normal"
    padding="small"
  >
    <ButtonComponent
      kind="link"
      size="small"
      @click="() => handleShareClick('facebook')"
    >
      Sdílet na Facebooku
      <template #icon>
        <SocialMediaIcon type="facebook" size="medium"></SocialMediaIcon>
      </template>
    </ButtonComponent>
    <ButtonComponent
      kind="link"
      size="small"
      @click="() => handleShareClick('messenger')"
    >
      Sdílet přes messenger
      <template #icon>
        <SocialMediaIcon type="messenger" size="medium"></SocialMediaIcon>
      </template>
    </ButtonComponent>
    <ButtonComponent
      kind="link"
      size="small"
      @click="() => handleShareClick('twitter')"
    >
      Sdílet přes twitter
      <template #icon>
        <SocialMediaIcon type="twitter" size="medium"></SocialMediaIcon>
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link" size="small" @click="handleDownloadPng">
      stáhnout jako png
      <template #icon>
        <IconComponent
          size="medium"
          :icon="mdiTrayArrowDown"
          color="rgb(var(--color-neutral-fg))"
        />
      </template>
    </ButtonComponent>
  </CardComponent>
</template>
<style lang="scss" setup>
.share-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--spacing-small);
  padding: var(--spacing-small);
}
</style>
