<script setup lang="ts">
import { computed } from 'vue';
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

const electionStore = useElectionStore();
const election = await electionStore.loadCalculatorById(
  props.answer.calculatorId
);

console.log('election', election);
</script>

<template>
  <pre>
      {{ JSON.stringify(election) }}
    </pre
  >

  <ElectionCardComponent
    v-if="election"
    :electionName="election.election.name"
    :electionDateFrom="election.election.from"
    :electionDateTo="election.election.to"
    :candidates="answer?.answers.length > 0 ? answer?.answers : undefined"
    :updated="answer?.id"
  />
</template>

<style scoped lang="scss"></style>
