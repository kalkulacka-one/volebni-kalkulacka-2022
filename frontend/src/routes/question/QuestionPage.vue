<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import type { RouteParams } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowRight, mdiArrowLeft } from '@mdi/js';

import { appRoutes, questionGuard } from '@/main';
import { useElectionStore, UserAnswerEnum } from '@/stores/electionStore';

import type { Election } from '@/types/election';
import type { Question } from '@/types/question';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';

import QuestionBottomBar from './QuestionBottomBar.vue';
import QuestionCard from './QuestionCard.vue';
import BackgroundComponent from '../../components/design-system/style/BackgroundComponent.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

onBeforeRouteUpdate(questionGuard);

if (electionStore.calculator === undefined) {
  throw new Error('Calculator is undefined. This should never happen');
}

const election = electionStore.election as Election;
const electionName = election.name;
const districtCode = route.params.district;
const districtName = electionStore.districts.filter(
  (district) => district.district_code === districtCode
)[0].name;
const showDistrictCode = electionStore.districts.filter(
  (district) => district.district_code === districtCode
)[0].show_district_code;

const title =
  `${electionName} — ${districtName}` +
  (showDistrictCode ? ` (${districtCode})` : '');

const forwardRoute = computed(
  () =>
    router.options.history.state.forward &&
    router.resolve(router.options.history.state.forward as string)
);

const backRoute = computed(
  () =>
    router.options.history.state.back &&
    router.resolve(router.options.history.state.back as string)
);

const questionCount = computed(() => electionStore.questionCount);
const currentQuestion = computed(() => parseInt(route.params['nr'] as string));
const answeredQuestions = computed(() =>
  electionStore.answers.filter((answer) => answer.answer !== 0)
);
const answeredQuestionsCount = computed(() => answeredQuestions.value.length);

const previousButtonTitle = computed(() => {
  if (currentQuestion.value === 1) {
    return 'Návod';
  } else {
    return 'Předchozí';
  }
});

const nextButtonTitle = computed(() => {
  if (currentQuestion.value === questionCount.value) {
    return 'Rekapitulace';
  } else {
    return 'Další';
  }
});

const goToQuestion = (number: number) => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: number },
  });
};

const goToRecap = () => {
  router.push({
    name: appRoutes.recap.name,
  });
};

const goToGuide = (params: RouteParams) => {
  router.push({
    name: appRoutes.guide.name,
    params,
  });
};

const handleNextClick = () => {
  if (currentQuestion.value < questionCount.value) {
    goToQuestion(currentQuestion.value + 1);
  } else {
    goToRecap();
  }
};

const handlePreviousClick = () => {
  if (currentQuestion.value === 1) {
    const params = (backRoute.value && backRoute.value.params) || {};
    goToGuide(params);
  } else {
    goToQuestion(currentQuestion.value - 1);
  }
};

const handleStarClick = () => electionStore.flipAnswerFlag(questionNr.value);

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
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent>
        <template #title>{{ title }}</template>
        <template #right>
          <ResponsiveWrapper medium large extra-large huge>
            <ButtonComponent
              kind="link"
              @click="router.push({ name: appRoutes.index.name })"
            >
              Zpět na hlavní stránku
              <template #iconAfter>
                <IconComponent :icon="mdiCloseCircleOutline" />
              </template>
            </ButtonComponent>
          </ResponsiveWrapper>
          <ResponsiveWrapper extra-small small>
            <ButtonComponent
              kind="link"
              @click="router.push({ name: appRoutes.index.name })"
            >
              <template #icon>
                <IconComponent
                  :icon="mdiCloseCircleOutline"
                  title="Zpět na hlavní stránku"
                />
              </template>
            </ButtonComponent>
          </ResponsiveWrapper>
        </template>
      </NavigationBar>
    </template>
    <template #sticky-header>
      <ResponsiveWrapper extra-small small>
        <SecondaryNavigationBar transparent>
          <template #before>
            <IconButton @click="handlePreviousClick">
              <IconComponent
                :icon="mdiArrowLeft"
                :title="previousButtonTitle"
              />
            </IconButton>
          </template>
          <template v-if="answeredQuestionsCount >= currentQuestion" #after>
            <IconButton @click="handleNextClick">
              <IconComponent :icon="mdiArrowRight" :title="nextButtonTitle" />
            </IconButton>
          </template>
        </SecondaryNavigationBar>
      </ResponsiveWrapper>
    </template>
    <BottomBarWrapper>
      <BackgroundComponent>
        <StepWrapper>
          <template #before>
            <ResponsiveWrapper medium large extra-large huge>
              <IconButton @click="handlePreviousClick">
                <IconComponent
                  :icon="mdiArrowLeft"
                  :title="previousButtonTitle"
                />
              </IconButton>
            </ResponsiveWrapper>
          </template>
          <QuestionCard
            :current-question="currentQuestion"
            :question-count="electionStore.questionCount"
            :question="(electionStore.calculator?.questions[questionNr] as Question)"
          />
          <template #after>
            <ResponsiveWrapper medium large extra-large huge>
              <IconButton
                v-if="answeredQuestionsCount >= currentQuestion"
                @click="handleNextClick"
              >
                <IconComponent :icon="mdiArrowRight" :title="nextButtonTitle" />
              </IconButton>
            </ResponsiveWrapper>
          </template>
        </StepWrapper>
      </BackgroundComponent>
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
