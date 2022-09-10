<script setup lang="ts">
import { getResults } from '@/common/restApi';
import { calculateRelativeAgreement } from '@/common/resultParser';
import { useElectionStore } from '@/stores/electionStore';
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import ResultCategory from '../result/ResultCategory.vue';

const route = useRoute();
const electionStore = useElectionStore();
const resultsGeneral: Ref<ReturnType<typeof calculateRelativeAgreement>> = ref(
  []
);
getResults(route.params.uuid as string).then(() => {
  if (electionStore.calculator) {
    resultsGeneral.value = calculateRelativeAgreement(
      electionStore.calculator.answers,
      electionStore.answers
    );
  }
});
</script>
<template>
  <ResultCategory
    title="Celková shoda"
    :result="resultsGeneral"
    category="general"
    :max-visible-candidates="2"
  />
</template>
