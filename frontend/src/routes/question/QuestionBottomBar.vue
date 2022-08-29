<script lang="ts">
export interface IButton {
  onClick: () => void;
  isSelected: boolean;
}
</script>
<script setup lang="ts">
import type { UserAnswer } from '@/stores/electionStore';

defineProps<{
  questionCurrentNr: number;
  questionProgress: number;
  questionTotal: number;
  answer: UserAnswer;
  starClick: () => void;
  yesClick: () => void;
  noClick: () => void;
  skipClick: () => void;
}>();
</script>

<template>
  <div class="wrapper">
    <progress
      id="question-progress"
      class="progress"
      :value="questionProgress + 1"
      :max="questionTotal"
    ></progress>
    <progress
      id="question-current"
      class="progress"
      :value="questionCurrentNr + 1"
      :max="questionTotal"
    ></progress>
    <div class="button-wrapper">
      <button :class="answer.flag ? 'button--active' : ''" @click="starClick">
        Pro me dulezite
      </button>
      <button
        :class="answer.answer === 'yes' ? 'button--active' : ''"
        @click="yesClick"
      >
        Jsem pro
      </button>
      <button
        :class="answer.answer === 'no' ? 'button--active' : ''"
        @click="noClick"
      >
        Jsem proti
      </button>
      <button
        :class="answer.answer === 'skip' ? 'button--active' : ''"
        @click="skipClick"
      >
        Preskocit
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 5px;
  position: fixed;
  bottom: 25px;
  left: 0px;
  right: 0px;
  width: 100%;
}
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;
  width: 100%;
}
.progress {
  width: 100%;
}
.button {
  &--active {
    background-color: magenta;
  }
}
</style>
