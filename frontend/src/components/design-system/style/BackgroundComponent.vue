<script setup lang="ts">
import { computed, inject } from 'vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

export interface Props {
  hasBlobs?: boolean;
  blobsHeight?: string;
  redBlobX?: string;
  redBlobY?: string;
  yellowBlobX?: string;
  yellowBlobY?: string;
  blueBlobX?: string;
  blueBlobY?: string;

  // TODO: add responsivity
}
const props = withDefaults(defineProps<Props>(), {
  hasBlobs: true,
  blueBlobX: '-10%',
  blueBlobY: '10%',
  yellowBlobX: '25%',
  yellowBlobY: '15%',
  redBlobX: '60%',
  redBlobY: '0%',
  blobsHeight: '80%',
});

const currentEmbed = inject(EmbedKey);
</script>

<template>
  <template v-if="currentEmbed">
    <slot />
  </template>
  <template v-else>
    <div class="background">
      <template v-if="props.hasBlobs">
        <div class="blobs">
          <img src="@/assets/background/blue-blob.svg" class="blue-blob" />
          <img src="@/assets/background/yellow-blob.svg" class="yellow-blob" />
          <img src="@/assets/background/red-blob.svg" class="red-blob" />
        </div>
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
}

.blobs {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;

  .blue-blob,
  .yellow-blob,
  .red-blob {
    height: v-bind('blobsHeight');
    position: fixed;
    filter: blur(120px);
  }

  .blue-blob {
    left: v-bind('blueBlobX');
    top: v-bind('blueBlobY');
  }

  .yellow-blob {
    left: v-bind('yellowBlobX');
    top: v-bind('yellowBlobY');
  }

  .red-blob {
    left: v-bind('redBlobX');
    top: v-bind('redBlobY');
  }
}
</style>
