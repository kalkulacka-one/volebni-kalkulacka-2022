<script setup lang="ts">
import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';

export interface Props {
  answers: UserAnswer[];
  totalQuestion: number;
  currentQuestion: number;
}

defineProps<Props>();

const classes = ['status-bar-primary', 'status-bar-secondary'];
</script>

<template>
  <div
    class="status-bar-wrapper"
    :style="{
      '--answer-count': answers.length,
    }"
  >
    <template v-for="(question, index) in answers" :key="question">
      <div
        :class="[
          'status-bar',
          question.answer === UserAnswerEnum.yes
            ? classes[0]
            : question.answer === UserAnswerEnum.no
            ? classes[1]
            : '',
          index === currentQuestion ? 'active' : '',
        ]"
      ></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.status-bar {
  height: 0.25rem;
  flex: 1 1 calc(100vw / var(--answer-count));
  width: calc(100vw / var(--answer-count));
  background-color: rgb(var(--color-neutral-bg-disabled));

  &.active {
    height: 0.5rem;
  }

  &.active {
    background-color: rgb(var(--color-neutral-bg-active));
  }

  &-primary {
    background-color: rgb(var(--color-primary-bg-strong));
  }

  &-secondary {
    background-color: rgb(var(--color-secondary-bg-strong));
  }

  &-wrapper {
    height: 0.25rem;
    background-color: rgb(var(--color-neutral-bg-disabled));
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
