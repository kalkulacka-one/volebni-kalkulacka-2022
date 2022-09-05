<script setup lang="ts">
import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';
import type { Question } from '@/types/question';

export interface QuestionCardProps {
  questionNr: number;
  questionTotal: number;
  question: Question;
  answer: UserAnswer;
  starClick: () => void;
  yesClick: () => void;
  noClick: () => void;
  skipClick: () => void;
}
defineProps<QuestionCardProps>();
</script>

<template>
  <div>
    <p>
      {{ questionNr + 1 }}/{{ questionTotal }}
      <strong>{{ question.name }} </strong>
      <em v-for="tag in question.tags" :key="tag"> {{ tag }} | </em>
    </p>
    <h1>{{ question.title }}</h1>
    <div class="button-wrapper">
      <button :class="answer.flag ? 'button--active' : ''" @click="starClick">
        Pro me dulezite
      </button>
      <button
        :class="answer.answer === UserAnswerEnum.yes ? 'button--active' : ''"
        @click="yesClick"
      >
        Jsem pro
      </button>
      <button
        :class="answer.answer === UserAnswerEnum.no ? 'button--active' : ''"
        @click="noClick"
      >
        Jsem proti
      </button>
      <button
        :class="answer.answer === UserAnswerEnum.skip ? 'button--active' : ''"
        @click="skipClick"
      >
        Preskocit
      </button>
    </div>
    <p>{{ question.gist }}</p>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 5px;
  width: 100%;
}
.button {
  &--active {
    background-color: magenta;
  }
}
</style>
