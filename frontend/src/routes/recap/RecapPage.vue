<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiRestore, mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore, type UserAnswer } from '@/stores/electionStore';

import type { Question } from '@/types/question';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';

import RecapNavBar from './RecapNavBar.vue';
import TabFilter from '../../components/TabFilter.vue';
import RecapQuestionCard from './RecapQuestionCard.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

// TODO: Map route params to text
const title = `${route.params.election} — ${route.params.district}`;

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

const handleResetClick = async () => {
  // TODO: Show warning in modal
  await router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: 'first' },
  });
  // TODO: Initialize store
  // electionStore.init();
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
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar>
        <template #title>{{ title }}</template>
        <template #right>
          <ButtonComponent
            kind="link"
            :responsive="true"
            @click="handleResetClick"
          >
            Vyplnit znovu
            <template #iconAfter>
              <IconComponent :icon="mdiRestore" title="Vyplnit znovu" />
            </template>
          </ButtonComponent>
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
    <template #sticky-header>
      <RecapNavBar
        :on-back="handleBackClicked"
        :on-results="handleResultsClicked"
      />
    </template>
    <BottomBarWrapper>
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
      <template #bottom-bar>
        <BottomBar transparent="never"> bottom bar </BottomBar>
      </template>
    </BottomBarWrapper>
  </StickyHeaderLayout>
</template>
