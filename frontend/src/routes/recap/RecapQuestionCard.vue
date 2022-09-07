<script setup lang="ts">
import { computed, ref } from 'vue';
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';

import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';
import type { Question } from '@/types/question';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import CardComponent from '../../components/design-system/containers/CardComponent.vue';
import TagComponent from '@/components/design-system/containers/TagComponent.vue';

import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
  vkiLogoNeutral,
  vkiStarOutlined,
  vkiStarFilled,
} from '@/components/design-system/icons';

export interface Props {
  question: Question;
  currentQuestion: number;
  questionCount: number;
  answer: UserAnswer;
  starClick: () => void;
  yesClick: () => void;
  noClick: () => void;
  skipClick: () => void;
}
const props = defineProps<Props>();

const starColor = computed(() =>
  props.answer.flag ? 'rgba(var(--palette-yellow))' : undefined
);
const starIcon = computed(() =>
  props.answer.flag ? vkiStarFilled : vkiStarOutlined
);

const isExpanded = ref(false);
const toggleClick = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <CardComponent
    :class="[
      'recap-question-card',
      isExpanded && 'recap-question-card--expanded',
    ]"
    corner="top-left"
    border
    shadow
    padding="small"
  >
    <div class="important">
      <IconButton class="desktop" @click="starClick">
        <IconComponent
          :icon="starIcon"
          :color="starColor"
          size="large"
          title="Pro mě důležité"
        />
      </IconButton>
      <IconButton class="mobile" @click="starClick">
        <IconComponent
          :icon="starIcon"
          :color="starColor"
          size="medium"
          title="Pro mě důležité"
        />
      </IconButton>
    </div>
    <div class="details">
      <StackComponent centered horizontal spacing="small">
        <BodyText size="small">
          {{ currentQuestion }}/{{ questionCount }}
        </BodyText>
        <BodyText class="desktop" size="small">
          {{ question.name }}
        </BodyText>
        <TagComponent v-for="tag in question.tags" :key="tag">
          {{ tag }}
        </TagComponent>
      </StackComponent>
    </div>
    <StackComponent class="text">
      <BodyText class="desktop" size="medium">
        <strong>{{ question.title }}</strong>
      </BodyText>
      <BodyText class="mobile" size="small">
        {{ question.name }}
      </BodyText>
      <BodyText v-show="isExpanded" class="mobile" size="medium">
        <strong>{{ question.title }}</strong>
      </BodyText>
    </StackComponent>
    <StackComponent
      class="answer"
      horizontal
      :spacing="(isExpanded && 'small') || undefined"
    >
      <ButtonComponent
        v-show="answer.answer === UserAnswerEnum.yes || isExpanded"
        class="in-favour"
        kind="answer"
        color="primary"
        :selected="answer.answer === UserAnswerEnum.yes && isExpanded"
        :read-only="!isExpanded"
        responsive
        @click="yesClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoInFavour" />
        </template>
        <template v-if="isExpanded" #default>Jsem pro</template>
      </ButtonComponent>
      <ButtonComponent
        v-show="answer.answer === UserAnswerEnum.no || isExpanded"
        class="against"
        kind="answer"
        color="secondary"
        :selected="answer.answer === UserAnswerEnum.no && isExpanded"
        :read-only="!isExpanded"
        responsive
        @click="noClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoAgainst" />
        </template>
        <template v-if="isExpanded" #default>Jsem proti</template>
      </ButtonComponent>
      <ButtonComponent
        v-show="answer.answer === UserAnswerEnum.skip || isExpanded"
        class="skip"
        kind="answer"
        :selected="answer.answer === UserAnswerEnum.skip && isExpanded"
        :read-only="!isExpanded"
        responsive
        @click="skipClick"
      >
        <template #icon>
          <IconComponent :icon="vkiLogoNeutral" />
        </template>
        <template v-if="isExpanded" #default>Bez odpovědi</template>
      </ButtonComponent>
    </StackComponent>
    <div class="toggle">
      <IconButton @click="toggleClick">
        <IconComponent
          :icon="isExpanded ? mdiChevronUp : mdiChevronDown"
          size="medium"
          title="Pro mě důležité"
        />
      </IconButton>
    </div>
    <StackComponent v-show="isExpanded" class="expansion" spacing="small">
      <BodyText size="medium">{{ question.gist }}</BodyText>
      <CardComponent
        v-if="question.detail"
        corner="top-left"
        background-color="rgb(var(--color-neutral-bg))"
      >
        <BodyText size="medium">{{ question.detail }}</BodyText>
      </CardComponent>
    </StackComponent>
  </CardComponent>
</template>

<style lang="scss" scoped>
.recap-question-card {
  display: grid;
  grid-template-columns: auto 1fr 4.5rem auto;
  grid-template-rows: 2rem auto;
  grid-template-areas:
    'important details answer toggle'
    'important text answer toggle';
  column-gap: var(--spacing-medium);

  .important {
    grid-area: important;
    align-self: center;
  }

  .details {
    grid-area: details;
  }

  .text {
    grid-area: text;
  }

  .answer {
    grid-area: answer;
    align-self: center;
  }

  .toggle {
    grid-area: toggle;
    align-self: center;
  }

  .expansion {
    grid-area: expansion;
  }

  &--expanded {
    grid-template-rows: 2rem auto auto auto;
    grid-template-areas:
      'important details whitespace toggle'
      'important text whitespace toggle'
      'answer answer answer answer'
      'expansion expansion expansion expansion';

    .answer {
      display: grid;
      grid-template-columns: auto auto auto;
      margin-top: var(--spacing-medium);
    }

    .expansion {
      margin-top: var(--spacing-medium);
    }
  }

  .desktop,
  .mobile {
    display: none;
  }

  @media (min-width: 700px) {
    .desktop {
      display: initial;
    }
  }

  @media (max-width: 700px) {
    column-gap: var(--spacing-extra-small);

    .mobile {
      display: initial;
    }

    &--expanded {
      grid-template-columns: repeat(5, auto);
      grid-template-rows: auto auto auto auto auto;
      grid-template-areas:
        'important answer answer answer toggle'
        'details details details details details'
        'text text text text text'
        'expansion expansion expansion expansion expansion';
      row-gap: var(--spacing-small);

      .answer,
      .expansion {
        margin-top: 0;
      }
    }
  }
}
</style>
