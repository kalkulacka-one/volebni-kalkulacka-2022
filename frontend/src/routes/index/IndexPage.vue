<script setup lang="ts">
import StackComponent from '../../components/design-system/layout/StackComponent.vue';

import BodyText from '../../components/design-system/typography/BodyText.vue';
import TitleText from '../../components/design-system/typography/TitleText.vue';
import HeadlineText from '../../components/design-system/typography/HeadlineText.vue';
import ButtonText from '../../components/design-system/typography/ButtonText.vue';
import LabelText from '../../components/design-system/typography/LabelText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';

import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import PillComponent from '../../components/design-system/containers/PillComponent.vue';
import TagComponent from '../../components/design-system/containers/TagComponent.vue';
import {
  vkiCheckbox,
  vkiCheckboxChecked,
  vkiCheckboxIndeterminate,
  vkiLogoAgainst,
  vkiLogoInFavour,
  vkiLogoNeutral,
  vkiStarFilled,
  vkiStarOutlined,
} from '../../components/design-system/icons';
import { mdiArrowLeft } from '@mdi/js';

import IconButton, { ButtonSizeEnum } from '../../components/IconButton.vue';
import AvatarComponent from '../../components/AvatarComponent.vue';
import MatchOrderComponent from '../../components/MatchOrderComponent.vue';
import ResultAvatarComponent from '../../components/ResultAvatarComponent.vue';

import { avatarsConfiguration } from '../../components/design-system/configurations/avatars-configuration';

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
  <CardComponent
    corner="bottom-left"
    radius="large"
    shadow
    border
    border-kind="strong"
    padding="large"
  >
    <StackComponent>
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
    </StackComponent>
  </CardComponent>
  <hr />
  <StackComponent horizontal>
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
  </StackComponent>
  <hr />
  <StackComponent horizontal>
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
  </StackComponent>
  <hr />
  <div style="display: flex">
    <AvatarComponent
      size="small"
      image-url="https://www.w3schools.com/w3images/avatar2.png"
      alt="child girl"
    />
    <AvatarComponent
      size="medium"
      image-url="https://www.w3schools.com/w3images/avatar5.png"
      alt="elderly grandma"
    />
    <AvatarComponent
      size="large"
      image-url="https://www.w3schools.com/w3images/avatar6.png"
      alt="batman"
    />
  </div>

  <div style="display: flex">
    <MatchOrderComponent
      :order="1"
      :size="1 === 1 ? 'medium' : 'small'"
      :configuration="avatarsConfiguration.general"
    />
    <MatchOrderComponent
      :order="3"
      :size="false ? 'large' : 'small'"
      :configuration="avatarsConfiguration.ecology"
    />
    <MatchOrderComponent
      :order="5"
      :size="false ? 'large' : 'small'"
      :configuration="avatarsConfiguration.medicine"
    />
  </div>

  <div style="display: flex">
    <ResultAvatarComponent
      size-avatar="large"
      size-order-match="large"
      :order="1"
      image-url="https://www.w3schools.com/w3images/avatar2.png"
      alt="child girl"
      :configuration="avatarsConfiguration.general"
    />
    <ResultAvatarComponent
      size-avatar="medium"
      size-order-match="medium"
      :order="3"
      image-url="https://www.w3schools.com/w3images/avatar5.png"
      alt="elderly grandma"
      :configuration="avatarsConfiguration.ecology"
    />

    <ResultAvatarComponent
      size-avatar="medium"
      size-order-match="medium"
      :order="5"
      image-url="https://www.w3schools.com/w3images/avatar6.png"
      alt="batman"
      :configuration="avatarsConfiguration.medicine"
    />
  </div>
  <hr />
  <div :style="{ display: 'flex', gap: '0.5rem' }">
    <PillComponent>Label</PillComponent>
    <PillComponent :active="true">Label</PillComponent>
  </div>
  <hr />
  <div :style="{ display: 'flex', gap: '0.5rem' }">
    <TagComponent :kind="'neutral'">Tag text</TagComponent>
    <TagComponent :kind="'primary'">Tag text</TagComponent>
    <TagComponent :kind="'secondary'">Tag text</TagComponent>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: var(--example);
}
</style>
