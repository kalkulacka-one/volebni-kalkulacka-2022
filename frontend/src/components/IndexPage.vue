<script setup lang="ts">
import BodyText from './design-system/typography/BodyText.vue';
import TitleText from './design-system/typography/TitleText.vue';
import HeadlineText from './design-system/typography/HeadlineText.vue';
import ButtonText from './design-system/typography/ButtonText.vue';
import LabelText from './design-system/typography/LabelText.vue';

import IconButton from './design-system/buttons/IconButton.vue';
import { IconButtonSizeEnum } from './design-system/buttons/IconButton.vue';
import IconStarFilledVue from './icons/IconStarFilled.vue';
import IconStarOutlinedVue from './icons/IconStarOutlined.vue';
import { ref } from 'vue';
import LinkButton, {
  LinkButtonSizeEnum,
  LinkButtonTypeEnum,
} from './design-system/buttons/LinkButton.vue';
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
  <hr />
  <div :style="{ margin: '1rem', display: 'flex', alignItems: 'center' }">
    <LinkButton
      label="test label"
      :size="LinkButtonSizeEnum.Default"
      :type="LinkButtonTypeEnum.Left"
      ><IconStarFilledVue
    /></LinkButton>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: var(--example);
}
</style>
