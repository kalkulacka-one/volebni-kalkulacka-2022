<script lang="ts">
export interface IButton {
  onClick: () => void;
  isSelected: boolean;
}
</script>
<script setup lang="ts">
defineProps<{
  questionCurrentNr: number;
  questionProgress: number;
  questionTotal: number;
  starButton: IButton;
  yesButton: IButton;
  noButton: IButton;
  skipButton: IButton;
}>();
</script>

<template>
  <div class="wrapper">
    <progress
      id="question-progress"
      class="progress"
      :value="questionProgress"
      :max="questionTotal"
    ></progress>
    <progress
      id="question-current"
      class="progress"
      :value="questionCurrentNr"
      :max="questionTotal"
    ></progress>
    <div class="button-wrapper">
      <button
        :class="starButton.isSelected ? 'button--active' : ''"
        @click="starButton.onClick"
      >
        Pro me dulezite
      </button>
      <button
        :class="yesButton.isSelected ? 'button--active' : ''"
        @click="yesButton.onClick"
      >
        Jsem pro
      </button>
      <button
        :class="noButton.isSelected ? 'button--active' : ''"
        @click="noButton.onClick"
      >
        Jsem proti
      </button>
      <button
        :class="skipButton.isSelected ? 'button--active' : ''"
        @click="skipButton.onClick"
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
