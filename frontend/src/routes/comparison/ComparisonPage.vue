<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowLeft, mdiTune } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { getDistrictCode } from '@/common/utils';

import type { Candidate } from '@/types/candidate';
import type { CandidateAnswer } from '@/types/candidate-answer';
import type { Election } from '@/types/election';
import type { Question } from '@/types/question';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import ComparisonGrid from './ComparisonGrid.vue';
import ContainerComponent from '../../components/design-system/containers/ContainerComponent.vue';

import { ref } from 'vue';
import QuestionCandidateFilter from '@/components/QuestionCandidateFilter.vue';
import QuestionTagFilter from '@/components/QuestionTagFIlter.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const election = electionStore.election as Election;
const electionName = election.name;
const districtCode = getDistrictCode(route.params.district as string);
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
const selectedTags = ref(new Set<string>(electionStore.uniqueQuestionTags));
const selectedCandidateIds = ref(new Set<string>());

const handlePreviousClick = () => {
  router.push({
    name: appRoutes.result.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

const filterMenuIsVisible = ref(false);

const questions = electionStore.calculator?.questions as Question[];
const answers = electionStore.answers;
const candidates = electionStore?.calculator?.candidates as Candidate[];
const candidateAnswers = electionStore.calculator?.answers as CandidateAnswer[];
</script>

<template>
  <BackgroundComponent :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar>
          <template #title>{{ breadcrumbs }}</template>
          <template #right>
            <EmbedWrapper>
              <ResponsiveWrapper medium large extra-large huge>
                <ButtonComponent
                  kind="link"
                  @click="
                    router.push({
                      name: appRoutes.index.name,
                      query: { ...route.query },
                    })
                  "
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
                  @click="
                    router.push({
                      name: appRoutes.index.name,
                      query: { ...route.query },
                    })
                  "
                >
                  <template #icon>
                    <IconComponent
                      :icon="mdiCloseCircleOutline"
                      title="Zpět na hlavní stránku"
                    />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
            </EmbedWrapper>
          </template>
        </NavigationBar>
      </template>
      <template #sticky-header>
        <ResponsiveWrapper extra-small small>
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Moje shoda" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">Porovnání</TitleText>
            <template #after>
              <ButtonComponent
                kind="link"
                @click="filterMenuIsVisible = !filterMenuIsVisible"
              >
                <template #icon>
                  <IconComponent :icon="mdiTune" title="Nastavit porovnání" />
                </template>
              </ButtonComponent>
            </template>
          </SecondaryNavigationBar>
          <QuestionTagFilter
            v-show="filterMenuIsVisible"
            v-model="selectedTags"
            class="filter-menu"
          />
          <QuestionCandidateFilter
            v-show="filterMenuIsVisible"
            v-model="selectedCandidateIds"
            class="filter-menu"
          />
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Moje shoda" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large">Porovnání</TitleText>
            <template #after>
              <ButtonComponent
                kind="link"
                @click="filterMenuIsVisible = !filterMenuIsVisible"
              >
                Nastavit porovnání
                <template #iconAfter>
                  <IconComponent :icon="mdiTune" />
                </template>
              </ButtonComponent>
            </template>
          </SecondaryNavigationBar>
          <QuestionTagFilter
            v-show="filterMenuIsVisible"
            v-model="selectedTags"
            class="filter-menu"
          />
          <QuestionCandidateFilter
            v-show="filterMenuIsVisible"
            v-model="selectedCandidateIds"
            class="filter-menu"
          />
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <div class="horizontal-scroll-wrapper">
          <ContainerComponent
            background="transparent"
            padding="large"
            padding-responsive
          >
            <ComparisonGrid
              :questions="questions"
              :answers="answers"
              :candidates="candidates"
              :candidate-answers="candidateAnswers"
              :selected-tags="selectedTags"
              :selected-candidate-ids="selectedCandidateIds"
            />
          </ContainerComponent>
        </div>
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
/*.horizontal-scroll-wrapper {
  max-width: 100vw;
  overflow-x: scroll;
}*/
.filter-menu {
  padding: var(--spacing-large);
  padding-top: 0;
  background: rgb(var(--color-neutral-bg-container));
}
</style>
