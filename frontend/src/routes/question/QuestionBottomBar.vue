<script setup lang="ts">
import { computed } from 'vue';

import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';

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
    <StackComponent horizontal centered>
      <IconButton @click="starClick">
        <IconComponent
          :icon="starIcon"
          :color="starColor"
          size="large"
          title="Pro mě důležité"
        />
      </IconButton>
      <BodyText class="star-text" size="medium"> Pro mě důležité </BodyText>
    </StackComponent>
    <StackComponent horizontal spacing="small">
      <ButtonComponent
        class="in-favour"
        kind="answer"
        color="primary"
        responsive
        :selected="answer.answer === UserAnswerEnum.yes"
        @click="yesClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoInFavour" />
        </template>
        Jsem pro
      </ButtonComponent>
      <ButtonComponent
        class="against"
        kind="answer"
        color="secondary"
        responsive
        :selected="answer.answer === UserAnswerEnum.no"
        @click="noClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoAgainst" />
        </template>
        Jsem proti
      </ButtonComponent>
    </StackComponent>
    <ButtonComponent
      class="skip"
      kind="answer"
      responsive
      :selected="answer.answer === UserAnswerEnum.skip"
      @click="skipClick"
    >
      <template #icon>
        <IconComponent :icon="vkiLogoNeutral" />
      </template>
      Přeskočit
    </ButtonComponent>
  </BottomBar>
</template>

<style lang="scss" scoped>
.bottom-bar {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: var(--spacing-large);
  justify-content: center;

  @media (max-width: 700px) {
    justify-content: space-between;

    .star-text {
      display: none;
    }
  }
}
</style>
