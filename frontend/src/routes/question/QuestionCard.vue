<script setup lang="ts">
import type { Question } from '@/types/question';

import AccordionComponent from '@/components/design-system/containers/AccordionComponent.vue';
import AccordionHeadlessComponent from '@/components/design-system/containers/AccordionHeadlessComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TagComponent from '@/components/design-system/containers/TagComponent.vue';

import TestComponent from './TestComponent.vue';

export interface Props {
  question: Question;
  currentQuestion: number;
  questionCount: number;
}

defineProps<Props>();
</script>

<template>
  <CardComponent
    class="question-card"
    corner="top-left"
    border
    shadow
    padding="large"
    padding-responsive
  >
    <StackComponent spacing="large" spacing-responsive>
      <StackComponent horizontal centered spacing="small" spacing-responsive>
        <BodyText size="small">
          {{ currentQuestion }}/{{ questionCount }}
        </BodyText>
        <BodyText size="small">{{ question.name }}</BodyText>
        <TagComponent v-for="tag in question.tags" :key="tag">
          {{ tag }}
        </TagComponent>
      </StackComponent>
      <HeadingComponent class="heading--desktop" kind="headline" size="small">
        {{ question.title }}
      </HeadingComponent>
      <HeadingComponent class="heading--mobile" kind="title" size="medium">
        {{ question.title }}
      </HeadingComponent>
      <BodyText v-if="question.gist" size="medium">{{
        question.gist
      }}</BodyText>
      <AccordionComponent v-if="question.detail" class="detail">
        <template #content>
          <BodyText size="medium">{{ question.detail }}</BodyText>
        </template>
      </AccordionComponent>

      <AccordionHeadlessComponent>
        <template #toggle>
          <TestComponent />
        </template>
        <template #collapsedVisible> DDD </template>
        <template #uncollapsedVisible> EEE </template>
      </AccordionHeadlessComponent>
    </StackComponent>
  </CardComponent>
</template>

<style lang="scss" scoped>
.detail {
  width: 100%;
}

.heading--mobile {
  display: none;
}

@media (max-width: 700px) {
  .heading--desktop {
    display: none;
  }

  .heading--mobile {
    display: initial;
  }
}
</style>
