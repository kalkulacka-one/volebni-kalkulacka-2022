<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import QuestionBottomBar, { type IButton } from './QuestionBottomBar.vue';
import QuestionCard from './QuestionCard.vue';
import NavBar from '../../components/NavBar.vue';
import { appRoutes } from '@/main';

const router = useRouter();
const route = useRoute();
const questionNr = computed(() => parseInt(route.params['nr'] as string));
const questionProgress = ref(questionNr.value);
const questionTotal = 10;
const handleClick = (type: 'yes' | 'no' | 'skip') => {
  const questionNr = parseInt(route.params.nr as string);
  const newRoute = {
    name: appRoutes.question.name,
    params: { ...route.params, nr: questionNr + 1 },
  };
  if (
    questionProgress.value === questionNr &&
    questionProgress.value >= questionTotal
  ) {
    newRoute.name = appRoutes.recap.name;
  }
  console.debug(
    `${type}, current: ${questionNr}, progress: ${questionProgress.value}`
  );
  if (questionNr === questionProgress.value) {
    questionProgress.value++;
  }
  router.push(newRoute);
};
const starButton: IButton = {
  onClick: function (): void {
    //star
  },
  isSelected: false,
};
const yesButton: IButton = {
  onClick: function (): void {
    handleClick('yes');
  },
  isSelected: false,
};
const noButton: IButton = {
  onClick: function (): void {
    handleClick('no');
  },
  isSelected: false,
};
const skipButton: IButton = {
  onClick: function (): void {
    handleClick('skip');
  },
  isSelected: false,
};
const handleArrowClicked = (type: 'forward' | 'back') => {
  const questionNr = parseInt(route.params.nr as string);
  const increment = type === 'back' ? -1 : 1;
  const newRoute = {
    name: appRoutes.question.name,
    params: { ...route.params, nr: questionNr + increment },
  };
  router.push(newRoute);
};
</script>

<template>
  <NavBar :help="true" :quit="true" :fill-again="true" />
  <div class="question-wrapper">
    <button
      :disabled="questionNr === 1"
      @click="() => handleArrowClicked('back')"
    >
      ZPET
    </button>
    <QuestionCard
      :question-nr="questionNr"
      :question-total="questionTotal"
      :name="`NAME of question ${questionNr}`"
      :text="`This is a TEXT of question ${questionNr}`"
      :explanation="`This is an EXPLANATION of question ${questionNr} that is very very long and very very interseting.`"
      :tags="['tag1', 'tag2']"
    ></QuestionCard>
    <button
      :disabled="questionNr === questionProgress"
      @click="() => handleArrowClicked('forward')"
    >
      VPRED
    </button>
  </div>
  <QuestionBottomBar
    :question-current-nr="questionNr"
    :question-progress="questionProgress"
    :question-total="questionTotal"
    :star-button="starButton"
    :yes-button="yesButton"
    :no-button="noButton"
    :skip-button="skipButton"
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
