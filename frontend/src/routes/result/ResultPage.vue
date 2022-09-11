<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  mdiShareVariantOutline,
  mdiCloseCircleOutline,
  mdiArrowLeft,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { calculateRelativeAgreement } from '@/common/resultParser';
import { postResults } from '@/common/restApi';
import { generateShareUrl } from '@/common/share';

import type { Election } from '@/types/election';
import type { CandidateAnswer } from '@/types/candidate-answer';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';

import ResultCategory from './ResultCategory.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const election = electionStore.election as Election;
const electionName = election.name;
const districtCode = route.params.district;
const districtName = electionStore.districts.filter(
  (district) => district.district_code === districtCode
)[0].name;
const showDistrictCode = electionStore.districts.filter(
  (district) => district.district_code === districtCode
)[0].show_district_code;
const districtNameWithCode = showDistrictCode
  ? `${districtName} (${districtCode})`
  : districtName;

const breadcrumbs = `${electionName} — ${districtNameWithCode}`;

const handlePreviousClick = () => {
  router.push({
    name: appRoutes.recap.name,
    params: { ...route.params },
  });
};

const handleShareClick = async () => {
  const res = await postResults();

  if (!res?.result_id) {
    return;
  }
  alert(generateShareUrl(res.result_id));
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
          <template #title>{{ breadcrumbs }}</template>
          <template #right>
            <ResponsiveWrapper medium large extra-large huge>
              <ButtonComponent
                kind="link"
                @click="router.push({ name: appRoutes.index.name })"
              >
                Zpět na hlavní stránku
                <template #iconAfter>
                  <IconComponent :icon="mdiCloseCircleOutline" />
                </template>
              </ButtonComponent>
            </ResponsiveWrapper>
            <ResponsiveWrapper extra-small small>
              <ButtonComponent
                kind="link"
                @click="router.push({ name: appRoutes.index.name })"
              >
                <template #icon>
                  <IconComponent
                    :icon="mdiCloseCircleOutline"
                    title="Zpět na hlavní stránku"
                  />
                </template>
              </ButtonComponent>
            </ResponsiveWrapper>
          </template>
        </NavigationBar>
      </template>
      <template #sticky-header>
        <ResponsiveWrapper extra-small small>
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Rekapitulace" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">Moje shoda</TitleText>
            <template #after>
              <ButtonComponent
                kind="link"
                color="primary"
                @click="handleShareClick"
              >
                <template #icon>
                  <IconComponent :icon="mdiShareVariantOutline" />
                </template>
                Sdílet
              </ButtonComponent>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Rekapitulace" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large">Moje shoda</TitleText>
            <template #after>
              <ButtonComponent
                kind="link"
                color="primary"
                @click="handleShareClick"
              >
                <template #icon>
                  <IconComponent :icon="mdiShareVariantOutline" />
                </template>
                Sdílet
              </ButtonComponent>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <StackComponent class="main" spacing="medium">
          <ResultCategory
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
        </StackComponent>
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: clamp(32rem, 50vw, 48rem);
  justify-content: center;
  padding: var(--spacing-small);
}

/* TODO: update breakpoint */
@media (max-width: 700px) {
  .main {
    grid-template-columns: 1fr;
  }
}
</style>
