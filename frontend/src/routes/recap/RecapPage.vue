<script setup lang="ts">
import { appRoutes } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import RecapNavBar from './RecapNavBar.vue';
import TabFilter from '../../components/TabFilter.vue';
import { useElectionStore, type UserAnswer } from '@/stores/electionStore';
import RecapQuestionCard from './RecapQuestionCard.vue';
import type { Question } from '@/types/question';
import { ref } from 'vue';
const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();
const availableTags: Set<string> = new Set(['All']);
const selectedTag = ref('All');
electionStore.calculator?.questions.forEach((q) =>
  q.tags?.forEach((tag) => availableTags.add(tag))
);
const handleBackClicked = () => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: 'last' },
  });
};
const handleResultsClicked = () => {
  router.push({
    name: appRoutes.result.name,
    params: { ...route.params },
  });
};
const handleFilterChange = (id: string) => {
  console.debug(id);
  selectedTag.value = id;
};
const handleStarClick = (index: number) => {
  electionStore.flipAnswerFlag(index);
};
const handleAnswerClick = (index: number, answer: UserAnswer['answer']) => {
  electionStore.setAnswer(index, answer);
};
const isCardHidden = (index: number) => {
  return !(
    selectedTag.value === 'All' ||
    electionStore.calculator?.questions[index].tags?.includes(selectedTag.value)
  );
};
</script>
<template>
  <NavBar :help="true" :quit="true" :fill-again="true" />
  <RecapNavBar
    :on-back="handleBackClicked"
    :on-results="handleResultsClicked"
  />
  <TabFilter
    :tags="Array.from(availableTags)"
    :input-change="handleFilterChange"
    :selected-tag="selectedTag"
  />
  <RecapQuestionCard
    v-for="i in [...Array(electionStore.questionCount).keys()]"
    :key="i"
    :hidden="isCardHidden(i)"
    :question="(electionStore.calculator?.questions[i] as Question)"
    :answer="electionStore.answers[i]"
    :question-nr="i"
    :question-total="electionStore.questionCount"
    :star-click="() => handleStarClick(i)"
    :yes-click="() => handleAnswerClick(i, 'yes')"
    :no-click="() => handleAnswerClick(i, 'no')"
    :skip-click="() => handleAnswerClick(i, 'skip')"
  />
</template>
