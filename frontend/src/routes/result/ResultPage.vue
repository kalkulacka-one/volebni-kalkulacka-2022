<script setup lang="ts">
import { calculateRelativeAgreement } from '@/common/resultParser';
import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import type { CandidateAnswer } from '@/types/candidate-answer';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import ResultNavBar from './ResultNavBar.vue';
import ResultSideBar from './ResultSideBar.vue';
import ResultCategory from './ResultCategory.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const handleBackClicked = () => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: 'last' },
  });
};

const resultsGeneral = calculateRelativeAgreement(
  electionStore.calculator?.answers as CandidateAnswer[],
  electionStore.answers
);

const resultsEcology = calculateRelativeAgreement(
  electionStore.calculator?.answers as CandidateAnswer[],
  electionStore.answers.filter((x, i) =>
    electionStore.calculator?.questions[i].tags?.includes('tag01')
  )
);
const resultsMedicine = calculateRelativeAgreement(
  electionStore.calculator?.answers as CandidateAnswer[],
  electionStore.answers.filter((x, i) =>
    electionStore.calculator?.questions[i].tags?.includes('tag02')
  )
);
</script>
<template>
  <NavBar :help="true" :quit="true" :fill-again="true" />
  <ResultNavBar :on-back="handleBackClicked" />
  <div class="body-wrapper">
    <div class="candidates-wrapper">
      <ResultCategory
        title="Celková shoda"
        :result="resultsGeneral"
        category="general"
        :max-visible-candidates="2"
      />
      <ResultCategory
        ref="thematic-categories"
        title="Shoda v ekologii"
        :result="resultsEcology"
        category="environment"
        :max-visible-candidates="1"
      />
      <ResultCategory
        title="Shoda ve zdravotnictví"
        :result="resultsMedicine"
        category="health"
        :max-visible-candidates="10"
      />
    </div>
    <ResultSideBar />
  </div>
</template>

<style lang="scss" scoped>
.body-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--spacing-small);
  padding: var(--spacing-small);
}
.candidates-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: var(--spacing-small);
  padding: var(--spacing-small);
}
</style>
