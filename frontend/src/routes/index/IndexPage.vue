<script setup lang="ts">
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import TitleText from '../../components/design-system/typography/TitleText.vue';
import HeadlineText from '../../components/design-system/typography/HeadlineText.vue';
import ButtonText from '../../components/design-system/typography/ButtonText.vue';
import LabelText from '../../components/design-system/typography/LabelText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import HeadingComponent from '../../components/design-system/typography/HeadingComponent.vue';
import ProgressBar from '../../components/design-system/other/ProgressBar.vue';
import RadioButtonComponent from '../../components/design-system/input/RadioButtonComponent.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import IconBadge from '../../components/design-system/icons/IconBadge.vue';
import PillComponent from '../../components/design-system/containers/PillComponent.vue';
import TagComponent from '../../components/design-system/containers/TagComponent.vue';
import IconButton, {
  type IconButtonProps,
} from '@/components/design-system/input/IconButton.vue';
import AvatarComponent from '../../components/AvatarComponent.vue';
import MatchOrderComponent from '../../components/MatchOrderComponent.vue';
import ResultAvatarComponent from '../../components/ResultAvatarComponent.vue';
import AccordionComponent from '../../components/design-system/containers/AccordionComponent.vue';
import DividerComponent from '../../components/design-system/containers/DividerComponent.vue';
import WantToKnowMore from '../../components/WantToKnowMore.vue';
import Modal from '../../components/design-system/other/ModalComponent.vue';
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

import { avatarsConfiguration } from '../../components/design-system/configurations/avatars-configuration';

import { mdiArrowLeft } from '@mdi/js';

import StepProgress from '../../components/design-system/other/StepProgress.vue';

import { ref } from 'vue';
import LogoComponent from '../../components/design-system/style/LogoComponent.vue';
const btn1Size = ref('medium' as IconButtonProps['size']);
const btn2Size = ref('small' as IconButtonProps['size']);
const incrementSize = (btnSize: IconButtonProps['size']) => {
  const sizes: IconButtonProps['size'][] = ['small', 'medium', 'large'];
  const index = sizes.findIndex((x) => x === btnSize);
  return sizes[index < 2 ? index + 1 : 0];
};

const isModalOpen = ref(false);
const closeModal = (): void => {
  isModalOpen.value = false;
};

const doSomethingOnRadioSelect = (target: HTMLInputElement): void => {
  console.log(target.value);
};
</script>

<template>
  <h1>This is the index page</h1>
  <DividerComponent />
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
  <DividerComponent />
  <StackComponent horizontal>
    <IconButton
      :size="btn1Size"
      :icon="vkiStarFilled"
      color="rgb(var(--palette-yellow))"
      @click="
        () => {
          btn1Size = incrementSize(btn1Size);
        }
      "
    />
    <IconButton
      :size="btn2Size"
      :icon="mdiArrowLeft"
      color="rgb(var(--color-neutral-fg))"
      @click="
        () => {
          btn2Size = incrementSize(btn2Size);
        }
      "
      ><IconComponent :icon="vkiStarOutlined"
    /></IconButton>
    <IconButton
      size="medium"
      :icon="vkiLogoNeutral"
      color="rgb(var(--color-neutral-fg))"
      disabled
      @click="
        () => {
          throw 'This should not happen!';
        }
      "
      ><IconComponent :icon="vkiStarOutlined"
    /></IconButton>
  </StackComponent>
  <DividerComponent />
  <StackComponent horizontal>
    <IconComponent :icon="vkiCheckbox" size="small" />
    <IconComponent :icon="vkiCheckboxChecked" size="medium" />
    <IconComponent :icon="vkiCheckboxIndeterminate" size="large" />
    <IconComponent
      :icon="vkiLogoInFavour"
      color="rgb(var(--color-primary-fg))"
    />
    <IconComponent
      :icon="vkiLogoNeutral"
      color="rgb(var(--color-neutral-fg))"
    />
    <IconComponent
      :icon="vkiLogoAgainst"
      color="rgb(var(--color-secondary-fg))"
    />
    <IconComponent :icon="vkiStarFilled" />
    <IconComponent :icon="vkiStarOutlined" />
    <IconComponent :icon="mdiArrowLeft" />
  </StackComponent>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="link">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link">Button</ButtonComponent>
    <ButtonComponent kind="link">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link" disabled>
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent tag="a" kind="link">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent href="https://google.com" kind="link">
      Google.com
    </ButtonComponent>
    <ButtonComponent tag="a" kind="link">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="link">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="link" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link" size="small">Button</ButtonComponent>
    <ButtonComponent kind="link" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="link" disabled size="small">
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent tag="a" kind="link" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="link" size="small">Button</ButtonComponent>
    <ButtonComponent tag="a" kind="link" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="link" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="outlined">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="outlined">Button</ButtonComponent>
    <ButtonComponent kind="outlined">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="outlined">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="outlined" disabled>
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="outlined">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="outlined">Button</ButtonComponent>
    <ButtonComponent tag="a" kind="outlined">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="outlined">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="outlined" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="outlined" size="small">Button</ButtonComponent>
    <ButtonComponent kind="outlined" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="outlined" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="outlined" disabled size="small">
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="outlined" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="outlined" size="small"
      >Button</ButtonComponent
    >
    <ButtonComponent tag="a" kind="outlined" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="outlined" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="filled">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="filled">Button</ButtonComponent>
    <ButtonComponent kind="filled">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="filled">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="filled" disabled>
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="filled">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="filled">Button</ButtonComponent>
    <ButtonComponent tag="a" kind="filled">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="filled">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="filled" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="filled" size="small">Button</ButtonComponent>
    <ButtonComponent kind="filled" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="filled" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="filled" disabled size="small">
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="filled" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="filled" size="small">Button</ButtonComponent>
    <ButtonComponent tag="a" kind="filled" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="filled" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
  </div>

  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="answer">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer">Button</ButtonComponent>
    <ButtonComponent kind="answer">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" disabled>
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="answer">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer">Button</ButtonComponent>
    <ButtonComponent tag="a" kind="answer">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="answer" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" size="small">Button</ButtonComponent>
    <ButtonComponent kind="answer" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" disabled size="small">
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="answer" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" size="small">Button</ButtonComponent>
    <ButtonComponent tag="a" kind="answer" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
  </div>

  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="answer" color="primary">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="primary">Button</ButtonComponent>
    <ButtonComponent kind="answer" color="primary">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="primary">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="primary" disabled>
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="answer" color="primary">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="primary"
      >Button</ButtonComponent
    >
    <ButtonComponent tag="a" kind="answer" color="primary">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="primary">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="answer" color="primary" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="primary" size="small"
      >Button</ButtonComponent
    >
    <ButtonComponent kind="answer" color="primary" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="primary" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="primary" disabled size="small">
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="answer" color="primary" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="primary" size="small"
      >Button</ButtonComponent
    >
    <ButtonComponent tag="a" kind="answer" color="primary" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="primary" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
  </div>

  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="answer" color="secondary">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="secondary">Button</ButtonComponent>
    <ButtonComponent kind="answer" color="secondary">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="secondary">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="secondary" disabled>
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="answer" color="secondary">
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="secondary"
      >Button</ButtonComponent
    >
    <ButtonComponent tag="a" kind="answer" color="secondary">
      Icon before
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="secondary">
      Icon after
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
  >
    <ButtonComponent kind="answer" color="secondary" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="secondary" size="small"
      >Button</ButtonComponent
    >
    <ButtonComponent kind="answer" color="secondary" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="secondary" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent kind="answer" color="secondary" disabled size="small">
      Disabled
      <template #iconAfter>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
    </ButtonComponent>
  </div>
  <div
    :style="{
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      columnGap: '1rem',
    }"
    class="grow"
  >
    <ButtonComponent tag="a" kind="answer" color="secondary" size="small">
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="secondary" size="small"
      >Button</ButtonComponent
    >
    <ButtonComponent tag="a" kind="answer" color="secondary" size="small">
      Icon before
      <template #icon="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
    <ButtonComponent tag="a" kind="answer" color="secondary" size="small">
      Icon after
      <template #iconAfter="{ size }">
        <IconComponent :icon="vkiLogoNeutral" :size="size" />
      </template>
    </ButtonComponent>
  </div>
  <DividerComponent />
  <hr />
  <StackComponent horizontal>
    <IconBadge
      :icon="vkiLogoInFavour"
      background-color="rgb(var(--color-primary-fg))"
    />
    <IconBadge
      background-color="rgb(var(--color-neutral-fg))"
      :icon="vkiLogoNeutral"
    />
    <IconBadge
      :icon="vkiLogoAgainst"
      background-color="rgb(var(--color-secondary-fg))"
    />
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
  <DividerComponent />
  <div :style="{ display: 'flex', gap: '0.5rem' }">
    <PillComponent>Label</PillComponent>
    <PillComponent :active="true">Label</PillComponent>
  </div>
  <DividerComponent />
  <div :style="{ display: 'flex', gap: '0.5rem' }">
    <TagComponent :kind="'neutral'">Tag text</TagComponent>
    <TagComponent :kind="'primary'">Tag text</TagComponent>
    <TagComponent :kind="'secondary'">Tag text</TagComponent>
  </div>
  <DividerComponent />
  <div>
    <AccordionComponent>
      <template #title>This is title</template>
      <template #content>
        <WantToKnowMore>Some content</WantToKnowMore>
      </template>
    </AccordionComponent>
  </div>
  <DividerComponent />
  <div>
    <button @click="isModalOpen = true">Open modal</button>
    <Modal
      :close-modal-callback="() => closeModal()"
      :is-modal-open="isModalOpen"
    >
      <template #title>
        <p>
          bla bla bla <br />
          neco neco <br />
          super truper <br />
        </p>
      </template>
      <template #content>hula hula hula</template>
    </Modal>
  </div>
  <DividerComponent />
  <div>
    <HeadingComponent :tag="'h3'" :kind="'headline'" :size="'extra-small'">
      Heading
      <template #secondary>Secondary text</template>
    </HeadingComponent>
    <HeadingComponent :tag="'h2'" :kind="'title'" :size="'medium'">
      Heading
      <template #secondary>Secondary text</template>
    </HeadingComponent>
  </div>
  <div :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
    <template v-for="n in 4" :key="n">
      <StepProgress :current="n" />
    </template>
  </div>
  <DividerComponent />
  <div style="margin-top: 2px; margin-bottom: 2px">
    <ProgressBar :progress="-20" />
  </div>
  <div style="margin-top: 2px; margin-bottom: 2px">
    <ProgressBar :progress="20" />
  </div>
  <div style="margin-top: 2px; margin-bottom: 2px">
    <ProgressBar :progress="60" />
  </div>
  <div style="margin-top: 2px; margin-bottom: 2px">
    <ProgressBar :progress="2000" />
  </div>
  <DividerComponent />
  <RadioButtonComponent
    group-name="test"
    :on-select="doSomethingOnRadioSelect"
    :value="'A'"
  >
    Varianta A
  </RadioButtonComponent>
  <RadioButtonComponent
    group-name="test"
    :on-select="doSomethingOnRadioSelect"
    :value="'B'"
  >
    Varianta B
  </RadioButtonComponent>
  <RadioButtonComponent
    group-name="test"
    :on-select="doSomethingOnRadioSelect"
    :value="'C'"
  >
    Varianta C
  </RadioButtonComponent>
  <DividerComponent />
  <div :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
    <LogoComponent :size="'small'" :text="false" />
    <LogoComponent :size="'small'" />
    <LogoComponent
      :size="'medium'"
      :monochromatic="'rgb(var(--color-neutral-fg))'"
      :responsive="true"
    />
    <LogoComponent :responsive="true" />
  </div>
</template>

<style lang="scss" scoped>
.grow > * {
  flex: 1;
}
</style>
