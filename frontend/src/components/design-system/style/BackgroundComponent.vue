<script setup lang="ts">
import { computed } from 'vue';

const classes = computed(() => ({}));
</script>

<template>
  <div :class="['background', classes]">
    <div class="red-spot"></div>
    <div class="blue-spot"></div>
    <div class="blue-rounded-spot"></div>
    <div class="red-rounded-spot"></div>
    <div class="white-rounded-spot"></div>
    <div class="gray-rounded-spot"></div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.background {
  background-attachment: fixed;

  .blue-spot,
  .red-spot,
  .blue-rounded-spot,
  .red-rounded-spot,
  .white-rounded-spot,
  .gray-rounded-spot {
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
    background-image: url(icons/round-blue-spot.svg);
    width: 200px;
    height: 231px;
    inset: auto -41px 56px auto;
  }
  .red-rounded-spot {
    background-image: url(icons/round-red-spot.svg);
    width: 162px;
    height: 162px;
    inset: 82px auto auto 16px;
  }
  .white-rounded-spot {
    background-image: url(icons/round-white-spot.svg);
    width: 213px;
    height: 213px;
    inset: -35px -27px auto auto;
  }
  .gray-rounded-spot {
    background-image: url(icons/round-gray-spot.svg);
    width: 162px;
    height: 162px;
    inset: auto auto 56px -33px;
  }

  @media screen and (min-width: 768px) {
    background-repeat: no-repeat;
    background-color: var(--color-neutral-bg);
    background-image: url(/icons/check.svg), url(/icons/times.svg);
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
      background-image: url(icons/spot_blue.svg);
      width: 200px;
      height: 231px;
      inset: 152px auto auto 170px;
    }
    > .red-spot {
      background-image: url(icons/spot_red.svg);
      width: 217px;
      height: 227px;
      inset: 247px auto auto 170px;
    }
  }
}
</style>
