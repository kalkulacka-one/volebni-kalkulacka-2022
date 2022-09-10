<script setup lang="ts">
import { computed } from 'vue';

import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';

import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
  vkiLogoNeutral,
  vkiStarOutlined,
  vkiStarFilled,
} from '@/components/design-system/icons';

const props = defineProps<{
  answer: UserAnswer;
  starClick: () => void;
  yesClick: () => void;
  noClick: () => void;
  skipClick: () => void;
}>();

const starColor = computed(() =>
  props.answer.flag ? 'rgba(var(--palette-yellow))' : undefined
);
const starIcon = computed(() =>
  props.answer.flag ? vkiStarFilled : vkiStarOutlined
);

console.log(props.answer);
</script>

<template>
  <BottomBar class="bottom-bar" transparent="never">
    <ResponsiveWrapper desktop>
      <StackComponent
        horizontal
        centered
        class="important-button"
        @click="starClick"
      >
        <IconButton>
          <IconComponent
            :icon="starIcon"
            :color="starColor"
            size="large"
            title="Pro mě důležité"
          />
        </IconButton>
        <BodyText class="star-text" size="medium">Pro mě důležité</BodyText>
      </StackComponent>
    </ResponsiveWrapper>
    <ResponsiveWrapper mobile>
      <IconButton>
        <IconComponent
          :icon="starIcon"
          :color="starColor"
          size="large"
          title="Pro mě důležité"
          @click="starClick"
        />
      </IconButton>
    </ResponsiveWrapper>
    <StackComponent horizontal spacing="small">
      <ResponsiveWrapper desktop>
        <ButtonComponent
          class="in-favour"
          kind="answer"
          color="primary"
          :selected="answer.answer === UserAnswerEnum.yes"
          @click="yesClick"
        >
          <template #icon>
            <IconComponent :icon="vkiLogoInFavour" />
          </template>
          Jsem pro
        </ButtonComponent>
      </ResponsiveWrapper>
      <ResponsiveWrapper mobile>
        <ButtonComponent
          class="in-favour"
          kind="answer"
          color="primary"
          :selected="answer.answer === UserAnswerEnum.yes"
          @click="yesClick"
        >
          <template #icon>
            <IconComponent :icon="vkiLogoInFavour" title="Jsem pro" />
          </template>
        </ButtonComponent>
      </ResponsiveWrapper>
      <ResponsiveWrapper desktop>
        <ButtonComponent
          class="against"
          kind="answer"
          color="secondary"
          :selected="answer.answer === UserAnswerEnum.no"
          @click="noClick"
        >
          <template #icon>
            <IconComponent :icon="vkiLogoAgainst" />
          </template>
          Jsem proti
        </ButtonComponent>
      </ResponsiveWrapper>
      <ResponsiveWrapper mobile>
        <ButtonComponent
          class="against"
          kind="answer"
          color="secondary"
          :selected="answer.answer === UserAnswerEnum.no"
          @click="noClick"
        >
          <template #icon>
            <IconComponent :icon="vkiLogoAgainst" title="Jsem proti" />
          </template>
        </ButtonComponent>
      </ResponsiveWrapper>
    </StackComponent>
    <ResponsiveWrapper desktop>
      <ButtonComponent
        class="skip"
        kind="answer"
        :selected="answer.answer === UserAnswerEnum.skip"
        @click="skipClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoNeutral" />
        </template>
        Přeskočit
      </ButtonComponent>
    </ResponsiveWrapper>
    <ResponsiveWrapper mobile>
      <ButtonComponent
        class="skip"
        kind="answer"
        :selected="answer.answer === UserAnswerEnum.skip"
        @click="skipClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoNeutral" title="Přeskočit" />
        </template>
      </ButtonComponent>
    </ResponsiveWrapper>
  </BottomBar>
</template>

<style lang="scss" scoped>
.important-button {
  &:hover {
    cursor: pointer;

    .icon-button {
      background: rgba(var(--color-neutral-bg-backdrop-hover));
    }
  }
}

.bottom-bar {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: var(--spacing-large);
  justify-content: center;
}
</style>
