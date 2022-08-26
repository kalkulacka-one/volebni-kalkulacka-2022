<script setup lang="ts">
import { computed } from 'vue';
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router';
import QuestionBottomBar from './QuestionBottomBar.vue';
import QuestionCard from './QuestionCard.vue';
import NavBar from '../../components/NavBar.vue';
import { appRoutes, questionGuard } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import type { Question } from '@/types/question';

onBeforeRouteUpdate(questionGuard);

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();
if (electionStore.calculator === undefined) {
  throw new Error('Calculator is undefined. This should never happen');
}
//internally questions start at 0
const questionNr = computed(() => parseInt(route.params['nr'] as string) - 1);
const handleAnswerClick = (answer: 'yes' | 'no' | 'skip') => {
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
  <NavBar :help="true" :quit="true" :fill-again="true" />
  <div class="question-wrapper">
    <button :disabled="backDisabled" @click="() => handleArrowClicked('back')">
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
  </div>
  <QuestionBottomBar
    :question-current-nr="questionNr"
    :question-progress="electionStore.answerProgress"
    :question-total="electionStore.questionCount"
    :answer="electionStore.answers[questionNr]"
    :star-click="handleStarClick"
    :yes-click="() => handleAnswerClick('yes')"
    :no-click="() => handleAnswerClick('no')"
    :skip-click="() => handleAnswerClick('skip')"
  ></QuestionBottomBar>
</template>

<style lang="scss" scoped>
.question-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
