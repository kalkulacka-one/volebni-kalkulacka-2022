<script setup lang="ts">
import BodyText from './design-system/typography/BodyText.vue';
import TitleText from './design-system/typography/TitleText.vue';
import HeadlineText from './design-system/typography/HeadlineText.vue';
import ButtonText from './design-system/typography/ButtonText.vue';
import LabelText from './design-system/typography/LabelText.vue';

import IconComponent from './design-system/icons/IconComponent.vue';
import {
  vkiCheckbox,
  vkiCheckboxChecked,
  vkiCheckboxIndeterminate,
  vkiLogoAgainst,
  vkiLogoInFavour,
  vkiLogoNeutral,
  vkiStarFilled,
  vkiStarOutlined,
} from './design-system/icons';
import { mdiArrowLeft } from '@mdi/js';

import IconButton from './IconButton.vue';
import { ButtonSizeEnum } from './IconButton.vue';
import { ref } from 'vue';
const btn1Size = ref(ButtonSizeEnum.Medium);
const btn2Size = ref(ButtonSizeEnum.Small);
const incrementSize = (btnSize: number) => {
  btnSize =
    btnSize === Object.keys(ButtonSizeEnum).length / 2 - 1 ? 0 : btnSize + 1;
  console.debug(btnSize);
  return btnSize;
};
</script>

<template>
  <h1>This is the index page</h1>
  <hr />
  <div :style="{ margin: '1rem' }">
    <HeadlineText tag="h1" size="large">Headline large</HeadlineText>
    <HeadlineText tag="h2" size="medium">Headline medium</HeadlineText>
    <HeadlineText tag="h3" size="small">Headline small</HeadlineText>
    <TitleText tag="h4" size="large">Title large</TitleText>
    <TitleText tag="h5" size="medium">Title medium</TitleText>
    <BodyText size="large">
      Large quick brown fox jumps over the lazy dog
    </BodyText>
    <BodyText size="medium">
      Medium quick brown fox jumps over the lazy dog
    </BodyText>
    <BodyText size="small">
      Small quick brown fox jumps over the lazy dog
    </BodyText>
    <ButtonText size="medium">Button text</ButtonText>
    <ButtonText size="small">Small button text</ButtonText>
    <LabelText>Label text</LabelText>
  </div>
  <hr />
  <div :style="{ margin: '1rem', display: 'flex', alignItems: 'center' }">
    <IconButton
      :size="btn1Size"
      @click="(event: MouseEvent)=>{btn1Size = incrementSize(btn1Size)}"
      ><IconComponent :icon="vkiStarFilled"
    /></IconButton>
    <IconButton
      :size="btn2Size"
      @click="(event: MouseEvent)=>{btn2Size = incrementSize(btn2Size)}"
      ><IconComponent :icon="vkiStarOutlined"
    /></IconButton>
  </div>
  <hr />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <IconComponent :icon="vkiCheckbox" size="small" />
    <IconComponent :icon="vkiCheckboxChecked" size="medium" />
    <IconComponent :icon="vkiCheckboxIndeterminate" size="large" />
    <IconComponent
      :icon="vkiLogoInFavour"
      color="rgb(var(--color-primary-fg))"
    />
    <IconComponent :icon="vkiLogoNeutral" />
    <IconComponent
      :icon="vkiLogoAgainst"
      color="rgb(var(--color-secondary-fg))"
    />
    <IconComponent :icon="vkiStarFilled" />
    <IconComponent :icon="vkiStarOutlined" />
    <IconComponent :icon="mdiArrowLeft" />
  </div>
  <hr />
</template>

<style lang="scss" scoped>
h1 {
  color: var(--example);
}
</style>
