<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  isImage?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isImage: true,
});

const classes = computed(() => ({
  'without-background': !props.isImage,
}));
</script>

<template>
  <div :class="['background', classes]">
    <template v-if="props.isImage">
      <div class="red-spot"></div>
      <div class="blue-spot"></div>
      <div class="blue-rounded-spot"></div>
      <div class="red-rounded-spot"></div>
      <div class="white-rounded-spot"></div>
      <div class="gray-rounded-spot"></div>
    </template>
    <template v-else>
      <div class="red-rounded-spot-single"></div>
      <div class="blue-rounded-spot-single"></div>
    </template>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.background {
  display: grid;
  background-attachment: fixed;

  .blue-spot,
  .red-spot,
  .blue-rounded-spot,
  .red-rounded-spot,
  .white-rounded-spot,
  .gray-rounded-spot,
  .red-rounded-spot-single,
  .blue-rounded-spot-single {
    position: fixed;
    pointer-events: none;
    z-index: -1;
    filter: blur(35px);
  }

  > .blue-spot,
  > .red-spot {
    display: none;
  }

  .blue-rounded-spot {
    background-image: url(@/assets/background/round-blue-spot.svg);
    width: 200px;
    height: 231px;
    inset: auto -41px 56px auto;
  }
  .red-rounded-spot {
    background-image: url(@/assets/background/round-red-spot.svg);
    width: 162px;
    height: 162px;
    inset: 82px auto auto 16px;
  }
  .white-rounded-spot {
    background-image: url(@/assets/background/round-white-spot.svg);
    width: 213px;
    height: 213px;
    inset: -35px -27px auto auto;
  }
  .gray-rounded-spot {
    background-image: url(@/assets/background/round-gray-spot.svg);
    width: 162px;
    height: 162px;
    inset: auto auto 56px -33px;
  }
  .red-rounded-spot-single {
    background-image: url(@/assets/background/round-red-spot-single.svg);
    width: 442.37px;
    height: 462.75px;
    inset: 229px -143px auto auto;
    transform: rotate(30deg);
  }

  .blue-rounded-spot-single {
    background-image: url(@/assets/background/round-blue-spot-single.svg);
    width: 407.71px;
    height: 470.91px;
    inset: 76px 134px auto auto;
    transform: rotate(30deg);
  }
}
@media screen and (min-width: 768px) {
  .background {
    display: grid;
    background-repeat: no-repeat;
    background-color: var(--color-neutral-bg);
    background-image: url(@/assets/background/check.svg),
      url(@/assets/background/times.svg);
    background-position: left -49px top 112px, right -49px top 289px;

    .blue-rounded-spot,
    .red-rounded-spot,
    .white-rounded-spot,
    .gray-rounded-spot {
      display: none;
    }

    > .blue-spot,
    > .red-spot {
      display: block;
    }

    > .blue-spot {
      background-image: url(@/assets/background/spot_blue.svg);
      width: 200px;
      height: 231px;
      inset: 152px auto auto 170px;
    }
    > .red-spot {
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
