<script setup lang="ts">
import BodyText from './design-system/typography/BodyText.vue';
import TitleText from './design-system/typography/TitleText.vue';
import HeadlineText from './design-system/typography/HeadlineText.vue';
import ButtonText from './design-system/typography/ButtonText.vue';
import LabelText from './design-system/typography/LabelText.vue';

import LinkButton from './design-system/buttons/LinkButton.vue';
import OutlinedButton from './design-system/buttons/OutlinedButton.vue';
import FilledButton from './design-system/buttons/FilledButton.vue';
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';

import IconButton from './design-system/buttons/IconButton.vue';
import { ButtonSizeEnum } from './design-system/buttons/IconButton.vue';
import IconStarFilledVue from './icons/IconStarFilled.vue';
import IconStarOutlinedVue from './icons/IconStarOutlined.vue';
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
    <LinkButton>
      <template #icon>
        <ArrowLeftIcon />
      </template>
    </LinkButton>
    <LinkButton>Button</LinkButton>
    <LinkButton tag="a">
      Icon before
      <template #icon>
        <ArrowLeftIcon />
      </template>
    </LinkButton>
    <LinkButton>
      Icon after
      <template #iconAfter>
        <ArrowLeftIcon />
      </template>
    </LinkButton>
  </div>
  <div :style="{ margin: '1rem', display: 'flex', alignItems: 'center' }">
    <OutlinedButton>
      <template #icon>
        <ArrowLeftIcon />
      </template>
    </OutlinedButton>
    <OutlinedButton>Outlined</OutlinedButton>
    <OutlinedButton>
      Outlined icon before
      <template #icon>
        <ArrowLeftIcon />
      </template>
    </OutlinedButton>
    <OutlinedButton tag="a">
      Outlined icon after
      <template #iconAfter>
        <ArrowLeftIcon />
      </template>
    </OutlinedButton>
  </div>
  <div :style="{ margin: '1rem', display: 'flex', alignItems: 'center' }">
    <FilledButton>
      <template #icon>
        <ArrowLeftIcon />
      </template>
    </FilledButton>
    <FilledButton>Filled</FilledButton>
    <FilledButton>
      Filled icon before
      <template #icon>
        <ArrowLeftIcon />
      </template>
    </FilledButton>
    <FilledButton tag="a">
      Filled icon after
      <template #iconAfter>
        <ArrowLeftIcon />
      </template>
    </FilledButton>
  </div>
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
</template>

<style lang="scss" scoped>
h1 {
  color: var(--example);
}
</style>
