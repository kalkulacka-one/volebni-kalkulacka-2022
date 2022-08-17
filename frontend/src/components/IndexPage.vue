<script setup lang="ts">
import BodyText from './design-system/typography/BodyText.vue';
import TitleText from './design-system/typography/TitleText.vue';
import HeadlineText from './design-system/typography/HeadlineText.vue';
import ButtonText from './design-system/typography/ButtonText.vue';
import LabelText from './design-system/typography/LabelText.vue';

import IconButton, {
  IconButtonSizeEnum,
} from './design-system/buttons/IconButton.vue';
import IconStarFilledVue from './icons/IconStarFilled.vue';
import IconStarOutlinedVue from './icons/IconStarOutlined.vue';
import { ref } from 'vue';
import LinkButton from './design-system/buttons/LinkButton.vue';
const btn1Size = ref(IconButtonSizeEnum.Medium);
const btn2Size = ref(IconButtonSizeEnum.Small);
const incrementSize = (btnSize: number) => {
  btnSize =
    btnSize === Object.keys(IconButtonSizeEnum).length / 2 - 1
      ? 0
      : btnSize + 1;
  console.debug(btnSize);
  return btnSize;
};
const onBtnClick = (event: MouseEvent) => {
  const btn = event.target as HTMLButtonElement;
  console.debug(btn);
};
</script>

<template>
  <h1>This is the index page</h1>
  <hr />
  <div :style="{ margin: '1rem' }">
    <HeadlineText size="large">Headline large</HeadlineText>
    <HeadlineText size="medium">Headline medium</HeadlineText>
    <HeadlineText size="small">Headline small</HeadlineText>
    <TitleText size="large">Title large</TitleText>
    <TitleText size="medium">Title medium</TitleText>
    <BodyText size="large">
      Large quick brown fox jumps over the lazy dog
    </BodyText>
    <BodyText size="medium">
      Medium quick brown fox jumps over the lazy dog
    </BodyText>
    <BodyText size="small">
      Small quick brown fox jumps over the lazy dog
    </BodyText>
    <ButtonText>Button text</ButtonText>
    <ButtonText size="small">Small button text</ButtonText>
    <LabelText>Label text</LabelText>
  </div>
  <!-- ICON BUTTONS -->
  <hr />
  <div :style="{ margin: '1rem', display: 'flex', alignItems: 'center' }">
    <IconButton
      :size="btn1Size"
      @click="(event: MouseEvent)=>{btn1Size = incrementSize(btn1Size)}"
      ><IconStarFilledVue
    /></IconButton>
    <IconButton
      :size="btn2Size"
      @click="(event: MouseEvent)=>{btn2Size = incrementSize(btn2Size)}"
      ><IconStarOutlinedVue
    /></IconButton>
  </div>
  <!-- LINK BUTTONS -->
  <hr />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }"
  >
    <LinkButton :size="'medium'" :icon-position="'start'" @click="onBtnClick"
      >Medium start</LinkButton
    >
    <LinkButton :size="'medium'" :icon-position="'end'" @click="onBtnClick"
      >Medium end</LinkButton
    >
    <LinkButton :size="'small'" :icon-position="'start'" @click="onBtnClick"
      >Small start</LinkButton
    >
    <LinkButton :size="'small'" :icon-position="'end'" @click="onBtnClick"
      >Small end</LinkButton
    >
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: var(--example);
}
</style>
