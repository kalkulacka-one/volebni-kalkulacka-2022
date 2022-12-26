<script setup lang="ts">
import { computed, inject } from 'vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

export interface Props {
  hasBlobs?: boolean;
  blobsHeight?: string;
  redBlobX?: string;
  redBlobY?: string;
  blueBlobX?: string;
  blueBlobY?: string;
}
const props = withDefaults(defineProps<Props>(), {
  hasBlobs: true,
  blueBlobX: "5%",
  blueBlobY: "10%",
  redBlobX: "50%",
  redBlobY: "10%",
  blobsHeight: "80%",
});

const currentEmbed = inject(EmbedKey);
</script>

<template>
  <template v-if="currentEmbed">
    <slot />
  </template>
  <template v-else>
    <div :class="['background', classes]">
      <template v-if="props.hasBlobs">
        <img src="@/assets/background/blue-blob.svg" class="blue-blob"/>
        <img src="@/assets/background/red-blob.svg" class="red-blob"/>
      </template>
      <slot />
    </div>
  </template>
</template>

<style scoped lang="scss">
.background {
  display: grid;
  width: 100%;
  height: 100%;

  .blue-blob,
  .red-blob {
    width: v-bind('props.blobsHeight');
    position: fixed;
    z-index: -1;
    filter: blur(120px);
  }

  .blue-blob {
    left: v-bind('props.blueBlobX');
    top: v-bind('props.blueBlobY');
  }

  .red-blob {
    left: v-bind('props.redBlobX');
    top: v-bind('props.redBlobY');
  }
}
</style>
