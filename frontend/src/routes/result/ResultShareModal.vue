<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ModalComponent from '../../components/design-system/other/ModalComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import { generateSocialLink } from '@/common/share';
import SocialMediaIcon from '../../components/design-system/icons/SocialMediaIcon.vue';
import { mdiContentCopy } from '@mdi/js';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import IconButton from '../../components/design-system/input/IconButton.vue';

const shareLink = ref(null as null | string);
onMounted(() => (shareLink.value = generateSocialLink('link')));
const isModalOpen = ref(false);
const handleCloseShareModal = () => {
  isModalOpen.value = false;
};
const open = () => {
  console.debug('Opening share modal');
  isModalOpen.value = true;
};
defineExpose({ open });
const handleCopyClick = (url: string) => {
  navigator.clipboard.writeText(url).then(
    () => {
      /* clipboard successfully set */
    },
    (err) => {
      console.error(err);
    }
  );
};
</script>
<template>
  <ModalComponent
    teleport-selector=".theme-provider"
    :close-modal-callback="handleCloseShareModal"
    :is-modal-open="isModalOpen"
  >
    <template #title></template>
    <template #content>
      <div class="share-wrapper">
        <div class="copy-wrapper">
          <IconButton @click="() => shareLink && handleCopyClick(shareLink)">
            <IconComponent :icon="mdiContentCopy" size="medium" />
          </IconButton>
          <BodyText class="copy-text" size="medium">{{ shareLink }}</BodyText>
        </div>
        <div class="share-buttons-wrapper">
          <ShareNetwork
            title="this is title"
            network="facebook"
            :url="shareLink"
          >
            <ButtonComponent kind="link" size="medium">
              Sdílet na Facebooku
              <template #icon>
                <SocialMediaIcon
                  type="facebook"
                  size="medium"
                ></SocialMediaIcon>
              </template>
            </ButtonComponent>
          </ShareNetwork>
          <ShareNetwork
            title="this is title"
            network="twitter"
            :url="shareLink"
          >
            <ButtonComponent kind="link" size="medium">
              Sdílet na Twitteru
              <template #icon>
                <SocialMediaIcon type="twitter" size="medium"></SocialMediaIcon>
              </template>
            </ButtonComponent>
          </ShareNetwork>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>
<style scoped lang="scss">
.share-buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--spacing-small);
  padding: var(--spacing-small);
}
.copy-wrapper {
  display: flex;
  justify-items: flex-start;
  align-items: center;
  padding: var(--spacing-extra-small);
  .copy-text {
    word-break: break-all;
  }
}
.share-wrapper {
}
</style>
