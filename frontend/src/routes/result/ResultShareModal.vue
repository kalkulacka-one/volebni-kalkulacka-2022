<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ModalComponent from '../../components/design-system/other/ModalComponent.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import { generateSocialLink, triggerOgImageGeneration } from '@/common/share';
import SocialMediaIcon from '../../components/design-system/icons/SocialMediaIcon.vue';
import { mdiContentCopy } from '@mdi/js';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import IconButton from '../../components/design-system/input/IconButton.vue';
import TitleText from '../../components/design-system/typography/TitleText.vue';
import type { RelativeAgreement } from '@/common/resultParser';
import { useElectionStore } from '@/stores/electionStore';

export interface ResultShareModalProps {
  relativeAgreement: RelativeAgreement;
}
const electionStore = useElectionStore();
const props = defineProps<ResultShareModalProps>();
const bestMatch = electionStore.calculator?.candidates.find((x) => {
  if (props.relativeAgreement.length > 0) {
    return x.id === props.relativeAgreement[0].cId;
  } else {
    return false;
  }
});
const hashTags = ['volby', 'volby2022', 'volebnikalkulacka', 'mojevysledky'].join(',');
const shareDescription = `Podle Volební kalkulačky mi největší shoda vyšla takhle: ${bestMatch?.short_name}. Podívejte se na moje výsledky a vyplňte si ji také!`;
const shareLink = ref(null as null | string);
onMounted(() => {
  shareLink.value = generateSocialLink('link');
});
const isModalOpen = ref(false);
const handleCloseShareModal = () => {
  isModalOpen.value = false;
};
const open = () => {
  console.debug('Opening share modal');
  triggerOgImageGeneration();
  isModalOpen.value = true;
};
defineExpose({ open });
const handleCopyClick = () => {
  const copyText = document.querySelector('#shareLinkInput') as
    | HTMLInputElement
    | undefined;
  if (copyText) {
    navigator.clipboard.writeText(copyText.value).then(
      () => {
        copyText.select();
        console.debug('Link url copy success!');
      },
      (err) => {
        console.error(err);
      }
    );
  }
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
        <TitleText color="rgb(var(--color-neutral-fg))" tag="h4" size="small"
          >Sdílej rovnou...</TitleText
        >
        <div class="share-wrapper">
          <div class="share-buttons-wrapper">
            <ShareNetwork
              title="Volební kalkulačka"
              network="facebook"
              :description="shareDescription"
              :hashtags="hashTags"
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
              :title="shareDescription"
              network="twitter"
              :hashtags="hashTags"
              :url="shareLink"
            >
              <ButtonComponent kind="link" size="medium">
                Sdílet na Twitteru
                <template #icon>
                  <SocialMediaIcon
                    type="twitter"
                    size="medium"
                  ></SocialMediaIcon>
                </template>
              </ButtonComponent>
            </ShareNetwork>
          </div>
          <TitleText color="rgb(var(--color-neutral-fg))" tag="h4" size="small"
            >...nebo si kliknutím zkopíruj odkaz</TitleText
          >
          <div class="copy-wrapper" @click="handleCopyClick">
            <IconButton>
              <IconComponent
                color="rgb(var(--color-neutral-fg))"
                :icon="mdiContentCopy"
                size="medium"
              />
            </IconButton>
            <input
              id="shareLinkInput"
              class="copy-input"
              type="text"
              :value="shareLink"
            />
          </div>
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
  .copy-input {
    flex: 1 2 auto;
    border-radius: var(--spacing-extra-small);
    border-color: rgb(var(--color-neutral-fg));
    color: rgb(var(--color-neutral-fg));
    font-family: var(--typography-family-radio-canada);
    border-width: 0px;
    background-color: rgb(var(--color-neutral-bg));
    padding: var(--spacing-extra-small);
  }
}
.share-wrapper {
}
</style>
