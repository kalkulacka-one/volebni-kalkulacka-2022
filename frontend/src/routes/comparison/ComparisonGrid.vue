<script setup lang="ts">
import { computed } from 'vue';

import type { Question } from '@/types/question';
import type { Candidate } from '@/types/candidate';
import type { CandidateAnswer } from '@/types/candidate-answer';
import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';

import { calculateRelativeAgreement } from '@/common/resultParser';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import DividerComponent from '@/components/design-system/containers/DividerComponent.vue';
import FilledCircle from '@/components/design-system/containers/FilledCircle.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
  vkiLogoNeutral,
} from '@/components/design-system/icons';

import QuestionCard from '@/components/QuestionCard.vue';

export interface Props {
  questions: Question[];
  answers: UserAnswer[];
  candidates: Candidate[];
  candidateAnswers: CandidateAnswer[];
}

const props = defineProps<Props>();

const questionCount = computed(() => props.questions.length);
const results = calculateRelativeAgreement(
  props.candidateAnswers,
  props.answers
);
const candidateOrder = results.map((response) => response.cId);
const candidateCount = computed(() => candidateOrder.length);

const mapAnswerToIcon = (answer: string | UserAnswerEnum) => {
  switch (answer) {
    //case 0:
    case UserAnswerEnum.yes:
    case 'yes':
      return vkiLogoInFavour;
    case UserAnswerEnum.no:
    case 'no':
      return vkiLogoAgainst;
    case UserAnswerEnum.skip:
    case 'dont_know':
      return vkiLogoNeutral;
    default:
      throw Error(`Unexpected answer value: \`${answer}\``);
  }
};

const mapAnswerToColor = (answer: string | UserAnswerEnum) => {
  switch (answer) {
    //case 0:
    case UserAnswerEnum.yes:
    case 'yes':
      return 'primary';
    case UserAnswerEnum.no:
    case 'no':
      return 'secondary';
    case UserAnswerEnum.skip:
    case 'dont_know':
      return 'neutral';
    default:
      throw Error(`Unexpected answer value: \`${answer}\``);
  }
};
</script>

<template>
  <div class="grid">
    <template v-for="i in candidateCount + 1" :key="i">
      <DividerComponent
        :class="['line', i === 1 ? 'user-line' : '']"
        vertical
        line-style="dotted"
        :color="i === 1 ? 'rgb(var(--color-neutral-border-strong))' : undefined"
        :style="{
          'grid-column': i,
          'grid-row': `1 / span ${2 * questionCount + 1}`,
        }"
      />
    </template>
    <div
      class="header user-header user-answers"
      :style="{ 'grid-column': 1, 'grid-row': 1, 'z-index': 999 }"
    >
      <FilledCircle
        size="extra-large"
        background-color="rgb(var(--color-primary-bg))"
      >
        <BodyText size="small" :style="{ 'text-align': 'center' }">
          <strong>
            Moje <br />
            odpovědi
          </strong>
        </BodyText>
      </FilledCircle>
    </div>
    <template v-for="(candidateId, index) in candidateOrder" :key="candidateId">
      <div class="header" :style="{ 'grid-column': index + 2, 'grid-row': 1 }">
        <FilledCircle size="extra-large"
          ><BodyText
            size="extra-small"
            color="rgb(var(--color-neutral-fg-inverse))"
            :style="{ 'text-align': 'center' }"
          >
            <strong>
              {{
                candidates.filter(
                  (candidate) => candidate.id === candidateId
                )[0].short_name
              }}</strong
            >
          </BodyText>
        </FilledCircle>
      </div>
    </template>
    <template v-for="(question, questionIndex) in questions" :key="question.id">
      <QuestionCard
        class="question-card"
        :style="{
          'grid-column': `1 / span ${candidateCount + 1}`,
          'grid-row': 2 * questionIndex + 2,
        }"
        :question="question"
        :current-question="questionIndex + 1"
        :question-count="questionCount"
      />
      <div
        class="user-answers"
        :style="{
          'grid-column': 1,
          'grid-row': 2 * questionIndex + 3,
        }"
      >
        <FilledCircle
          :background-color="`rgb(var(--color-${mapAnswerToColor(
            answers.filter((answer) => answer.id === question.id)[0].answer
          )}-bg-strong))`"
        >
          <IconComponent
            :icon="
              mapAnswerToIcon(
                answers.filter((answer) => answer.id === question.id)[0].answer
              )
            "
          />
        </FilledCircle>
      </div>
      <template
        v-for="(candidateId, candidateIndex) in candidateOrder"
        :key="candidateId"
      >
        <div
          :style="{
            'grid-column': candidateIndex + 2,
            'grid-row': 2 * questionIndex + 3,
          }"
        >
          <FilledCircle
            :background-color="`rgb(var(--color-${mapAnswerToColor(candidateAnswers.filter(
              (answer) =>
                answer.candidate_id === candidateId &&
                answer.question_id === question.id
            )[0].answer as string)}-bg-strong))`"
          >
            <IconComponent
              :icon="mapAnswerToIcon(candidateAnswers.filter(
              (answer) =>
                answer.candidate_id === candidateId &&
                answer.question_id === question.id
            )[0].answer as string)"
            />
          </FilledCircle>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: calc(
    2 * var(--responsive-spacing-large) + var(--spacing-medium) + 2 *
      var(--spacing-extra-small) + var(--responsive-spacing-large)
  );
  z-index: 100;
}

.grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  justify-items: center;
  column-gap: 2rem;
  row-gap: 2rem;
}

.column {
  display: grid;
  grid-template-columns: 1fr;
}

.line {
  grid-row: 1 / span 2;
  justify-self: center;
}

.question-card {
  justify-self: start;
  max-width: clamp(32rem, 50vw, 48rem);
}

.question-card,
.user-answers {
  position: sticky;
  left: var(--responsive-spacing-large);
}

.user-line {
  position: sticky;
  left: calc(var(--responsive-spacing-large) + 18px);
}

.user-header {
  left: calc(var(--responsive-spacing-large) - 18px);
}
</style>
