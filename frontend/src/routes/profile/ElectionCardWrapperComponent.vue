<script setup lang="ts">
import { computed } from 'vue';

import { fetchCalculator, fetchCalculators } from '@/common/dataFetch';
import ElectionCardComponent from '@/components/design-system/containers/ElectionCardComponent.vue';
import type { Candidate } from '@/components/design-system/containers/ElectionCardComponent.vue';

export interface Answer {
  id: string;
  calculatorId: string;
  answers: { answer: boolean; questionId: string }[];
  matches: { candidateId: string; score: number }[];
  createdAt: Date;
  updatedAt: string;
}

export interface Props {
  answer: Answer;
}

const props = withDefaults(defineProps<Props>(), {
  answer: undefined,
});

const calculators = await fetchCalculators();
const calculator = calculators.find(
  (c) => props.answer.calculatorId === c.calculator_id
);

const { election, candidates } = await fetchCalculator(
  calculator?.election_id as string,
  calculator?.district_code as string
);

// const election = calc ? calc.election : null;

const name = computed(() => `${election?.name} (${calculator?.name})`);

const candidateMatches = props?.answer.matches.map((x) => {
  const candidate = candidates?.find((c) => c.id === x.candidateId);
  return {
    id: candidate?.id,
    name: candidate?.name,
    image: candidate?.img_url,
    score: x.score,
    description: candidate?.description,
  };
}) as Candidate[];
</script>

<template>
  <ElectionCardComponent
    :election-name="name"
    :election-date-from="election?.from"
    :election-date-to="election?.to"
    :district="calculator?.district_code"
    :election="calculator?.election_id"
    :uuid="answer?.id"
    :candidates="candidateMatches ? candidateMatches.slice(0, 3) : undefined"
    :candidates-count="3"
  />
</template>

<style scoped lang="scss"></style>
