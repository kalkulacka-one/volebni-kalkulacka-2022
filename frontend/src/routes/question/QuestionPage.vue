<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes, questionGuard } from '@/main';
import { useElectionStore, UserAnswerEnum } from '@/stores/electionStore';
import type { Question } from '@/types/question';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
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
    `${answer}, current: ${questionNr.value}, progress: ${electionStore.answerProgress}`
  );
  router.push(newRoute);
};
const handleStarClick = () => electionStore.flipAnswerFlag(questionNr.value);
const handleArrowClicked = (type: 'forward' | 'back') => {
  const increment = type === 'back' ? -1 : 1;
  const newRoute = {
    name: appRoutes.question.name,
    params: { ...route.params, nr: questionNr.value + increment + 1 },
  };
  if (questionNr.value + increment > electionStore.questionCount - 1) {
    newRoute.name = appRoutes.recap.name;
  }
  router.push(newRoute);
};
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
        <button
          :disabled="backDisabled"
          @click="() => handleArrowClicked('back')"
        >
          ZPET
        </button>
        <QuestionCard
          :question-nr="questionNr"
          :question-total="electionStore.questionCount"
          :question="(electionStore.calculator?.questions[questionNr] as Question)"
        ></QuestionCard>
        <button
          :disabled="forwardDisabled"
          @click="() => handleArrowClicked('forward')"
        >
          VPRED
        </button>
      </StepWrapper>
      <template #bottom-bar>
        <BottomBar transparent="never">
          <QuestionBottomBar
            :answer="electionStore.answers[questionNr]"
            :star-click="handleStarClick"
            :yes-click="() => handleAnswerClick(UserAnswerEnum.yes)"
            :no-click="() => handleAnswerClick(UserAnswerEnum.no)"
            :skip-click="() => handleAnswerClick(UserAnswerEnum.skip)"
          />
        </BottomBar>
      </template>
    </BottomBarWrapper>
  </StickyHeaderLayout>
</template>
