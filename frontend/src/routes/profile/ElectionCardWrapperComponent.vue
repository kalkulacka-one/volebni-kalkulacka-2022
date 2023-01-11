<script setup lang="ts">
import {
  fetchCalculator,
  fetchCalculators,
  fetchElectionData,
} from '@/common/dataFetch';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCogOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import type { Answer } from '@/stores/userStore';
import ElectionCardComponent from '@/components/design-system/containers/ElectionCardComponent.vue';

export interface Props {
  answer: Answer;
}

const props = withDefaults(defineProps<Props>(), {
  answer: undefined,
});

const election = ref();
const electionStore = useElectionStore();
// const election = await electionStore.loadCalculatorById(props.answer.calculatorId).then((r) => console.log('rmmmmmmmmmmmmmmmm', r));

const calculators = await fetchCalculators();
const calc = calculators.find(
  (c) => props.answer.calculatorId === c.calculator_id
);

if (calc) {
  const calculator = await fetchCalculator(
    calc.election_id,
    calc.district_code
  );
  console.log(calculator.election);
  const { election } = calculator;
}
</script>

<template>
  <pre>
    {{ calculator }}
  </pre>
  <ElectionCardComponent
    :electionName="election.name"
    :electionDateFrom="election.from"
    :electionDateTo="election.to"
    :candidates="answer?.answers.length > 0 ? answer?.answers : undefined"
    :updated="answer?.id"
  />
</template>

<style scoped lang="scss"></style>
