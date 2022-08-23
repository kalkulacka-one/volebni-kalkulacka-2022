<script setup lang="ts">
import BodyText from '../../components/design-system/typography/BodyText.vue';
import TitleText from '../../components/design-system/typography/TitleText.vue';
import HeadlineText from '../../components/design-system/typography/HeadlineText.vue';
import ButtonText from '../../components/design-system/typography/ButtonText.vue';
import LabelText from '../../components/design-system/typography/LabelText.vue';

import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';

import IconComponent from '../../components/design-system/icons/IconComponent.vue';
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
    <ButtonComponent tag="a" kind="link">Button</ButtonComponent>
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
  <hr />
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
  <hr />
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
  <hr />
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
  <hr />
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
  <hr />
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

  <hr />
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
  <hr />
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

  <hr />
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
  <hr />
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

  <hr />
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
  <hr />
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
</template>

<style lang="scss" scoped>
.grow > * {
  flex: 1;
}
</style>
