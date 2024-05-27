<script setup lang="ts">
import type { DeprecatedQuestion } from '@/types/question';

import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TagComponent from '@/components/design-system/containers/TagComponent.vue';

export interface Props {
  question: DeprecatedQuestion;
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
    :padding="Object('medium')"
    padding-responsive
    padding-asymmetric
  >
    <StackComponent spacing="small" spacing-responsive>
      <StackComponent
        horizontal
        centered
        spacing="small"
        wrap
        spacing-responsive
      >
        <BodyText size="small">
          {{ currentQuestion }}/{{ questionCount }}
        </BodyText>
        <BodyText size="small">{{ question.name }}</BodyText>
        <TagComponent v-for="tag in question.tags" :key="tag">
          {{ tag }}
        </TagComponent>
      </StackComponent>
      <HeadingComponent class="heading--desktop" kind="title" size="medium">
        {{ question.title }}
      </HeadingComponent>
      <HeadingComponent class="heading--mobile" kind="title" size="small">
        {{ question.title }}
      </HeadingComponent>
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
