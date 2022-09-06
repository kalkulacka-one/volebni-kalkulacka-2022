<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowRight, mdiArrowLeft } from '@mdi/js';

import { appRoutes, questionGuard } from '@/main';
import { useElectionStore, UserAnswerEnum } from '@/stores/electionStore';
import type { Question } from '@/types/question';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';

import QuestionBottomBar from './QuestionBottomBar.vue';
import QuestionCard from './QuestionCard.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

// TODO: Map route params to text
const title = `${route.params.election} — ${route.params.district}`;

onBeforeRouteUpdate(questionGuard);

if (electionStore.calculator === undefined) {
  throw new Error('Calculator is undefined. This should never happen');
}

const currentQuestion = computed(() => parseInt(route.params['nr'] as string));

const goToQuestion = (number: number) => {
  console.debug(number, electionStore.questionCount);
  if (number > electionStore.questionCount) {
    router.push({
      name: appRoutes.recap.name,
    });
  } else {
    router.push({
      name: appRoutes.question.name,
      params: { ...route.params, nr: number },
    });
  }
};

const goToRecap = () => {
  router.push({
    name: appRoutes.recap.name,
  });
};

//internally questions start at 0
const questionNr = computed(() => parseInt(route.params['nr'] as string) - 1);
const handleAnswerClick = (answer: UserAnswerEnum) => {
  electionStore.setAnswer(questionNr.value, answer);
  if (questionNr.value - 1 === electionStore.answerProgress) {
    electionStore.incrementAnswerProgress();
  }
  const newRoute = {
    name: appRoutes.question.name,
    params: { ...route.params, nr: questionNr.value + 2 },
  };
  if (
    electionStore.answerProgress === questionNr.value &&
    electionStore.answerProgress > electionStore.questionCount - 2
  ) {
    newRoute.name = appRoutes.recap.name;
  }
  console.debug(
    `answer ${UserAnswerEnum[answer]}, current: ${questionNr.value}, progress: ${electionStore.answerProgress}`
  );
  router.push(newRoute);
};
const handleStarClick = () => electionStore.flipAnswerFlag(questionNr.value);
const forwardDisabled = computed(() => {
  return !(
    questionNr.value < electionStore.answerProgress + 1 ||
    electionStore.questionCount === electionStore.answerCount
  );
});
const backDisabled = computed(() => {
  return questionNr.value < 1;
});
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent>
        <template #title>{{ title }}</template>
        <template #right>
          <ButtonComponent
            kind="link"
            :responsive="true"
            @click="router.push({ name: appRoutes.index.name })"
          >
            Zpět na hlavní stránku
            <template #iconAfter>
              <IconComponent
                :icon="mdiCloseCircleOutline"
                title="Zpět na hlavní stránku"
              />
            </template>
          </ButtonComponent>
        </template>
      </NavigationBar>
    </template>
    <BottomBarWrapper>
      <StepWrapper>
        <template #before>
          <IconButton
            :hidden="backDisabled"
            @click="goToQuestion(currentQuestion - 1)"
          >
            <IconComponent :icon="mdiArrowLeft" />
          </IconButton>
        </template>
        <QuestionCard
          :question-nr="questionNr"
          :question-total="electionStore.questionCount"
          :question="(electionStore.calculator?.questions[questionNr] as Question)"
        ></QuestionCard>
        <template #after>
          <IconButton
            :hidden="forwardDisabled"
            @click="goToQuestion(currentQuestion + 1)"
          >
            <IconComponent :icon="mdiArrowRight" />
          </IconButton>
        </template>
      </StepWrapper>
      <template #bottom-bar>
        <QuestionBottomBar
          :answer="electionStore.answers[questionNr]"
          :star-click="handleStarClick"
          :yes-click="() => handleAnswerClick(UserAnswerEnum.yes)"
          :no-click="() => handleAnswerClick(UserAnswerEnum.no)"
          :skip-click="() => handleAnswerClick(UserAnswerEnum.skip)"
        />
      </template>
    </BottomBarWrapper>
  </StickyHeaderLayout>
</template>
