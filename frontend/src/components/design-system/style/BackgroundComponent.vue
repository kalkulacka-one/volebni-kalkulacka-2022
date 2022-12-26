<script setup lang="ts">
import { computed, inject } from 'vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

export interface Props {
  hasBlobs?: boolean;
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
});

const classes = computed(() => ({
  'without-background': !props.hasBlobs,
}));

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

@media screen and (min-width: 768px) {
  .background {
    display: grid;
    background-repeat: no-repeat;
    background-position: left -49px top 112px, right -49px top 289px;

    .blue-rounded-spot,
    .red-rounded-spot,
    .white-rounded-spot,
    .gray-rounded-spot {
      display: none;
    }

    >.blue-spot,
    >.red-spot {
      display: block;
    }

    >.blue-spot {
      background-image: url(@/assets/background/spot_blue.svg);
      width: 30%;
      height: 20%;
      inset: 152px auto auto 170px;
    }

    >.red-spot {
      background-image: url(@/assets/background/spot_red.svg);
      width: 217px;
      height: 227px;
      inset: 247px auto auto 170px;
    }
  }

  .without-background {
    background-image: none;
  }
}
</style>
