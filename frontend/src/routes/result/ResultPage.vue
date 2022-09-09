<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowLeft } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { calculateRelativeAgreement } from '@/common/resultParser';

import type { Election } from '@/types/election';
import type { CandidateAnswer } from '@/types/candidate-answer';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';

import ResultSideBar from './ResultSideBar.vue';
import ResultCategory from './ResultCategory.vue';
import BackgroundComponent from '../../components/design-system/style/BackgroundComponent.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const election = electionStore.election as Election;
const electionName = election.name;
const districtCode = route.params.district;
const districtName = electionStore.districts.filter(
  (district) => district.district_code === districtCode
)[0].name;

const title = `${electionName} — ${districtName} (${districtCode})`;

const handlePreviousClick = () => {
  router.push({
    name: appRoutes.recap.name,
    params: { ...route.params },
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
  <BackgroundComponent :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar>
          <template #title>{{ title }}</template>
          <template #right>
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
        <SecondaryNavigationBar>
          <template #before>
            <IconButton @click="handlePreviousClick">
              <IconComponent :icon="mdiArrowLeft" title="Rekapitulace" />
            </IconButton>
          </template>
          Moje shoda
        </SecondaryNavigationBar>
      </template>
      <BottomBarWrapper>
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
          <ResultSideBar class="side-bar" />
        </div>
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent>
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
.side-bar {
  padding: var(--spacing-small);
}
</style>
