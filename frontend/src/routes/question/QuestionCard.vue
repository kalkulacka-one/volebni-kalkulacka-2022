<script setup lang="ts">
import type { Question } from '@/types/question';

export interface QuestionCardProps {
  questionNr: number;
  questionTotal: number;
  question: Question;
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
    <p>{{ question.gist }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
