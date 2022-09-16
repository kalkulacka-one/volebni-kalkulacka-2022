<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from './design-system/other/ModalComponent.vue';
import TitleText from './design-system/typography/TitleText.vue';
import BodyText from './design-system/typography/BodyText.vue';

export interface ErrorModalProps {
  title: string;
}
defineProps<ErrorModalProps>();
const isModalOpen = ref(false);
const handleCloseShareModal = () => {
  isModalOpen.value = false;
};
const open = () => {
  isModalOpen.value = true;
};
defineExpose({ open });
</script>
<template>
  <ModalComponent
    teleport-selector=".theme-provider"
    :close-modal-callback="handleCloseShareModal"
    :is-modal-open="isModalOpen"
  >
    <template #title
      ><TitleText tag="h2" size="small">{{ title }}</TitleText></template
    >
    <template #content>
      <BodyText size="medium"><slot /></BodyText>
    </template>
  </ModalComponent>
</template>
<style scoped lang="scss"></style>
