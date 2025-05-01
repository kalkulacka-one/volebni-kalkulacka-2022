<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import {
  mdiCloseCircleOutline,
  mdiArrowLeft,
  mdiArrowRight,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import type { Election } from '@/types/election';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import CandidateList from './CandidateList.vue';
import { getDistrictCode } from '@/common/utils';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';

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

const breadcrumbs = `${electionName} — TestVot 2025`;

const handlePreviousClick = () => {
  // go to the last question
  router.push({
    name: appRoutes.recap.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

const handleSkipClick = () => {
  router.push({
    name: appRoutes.emailCollection.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

const handleStartClick = () => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: 1 },
    query: { ...route.query },
  });
};

const handleShowComparsionClick = () => {
  router.push({
    name: appRoutes.comparison.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

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
                  Pagina Principală
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
                      title="Pagina Principală"
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
          <SecondaryNavigationBar>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Recapitulare" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">Dacă alegerile ar fi astăzi, pe cine ai vota?</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Recapitulare" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large">Dacă alegerile ar fi astăzi, pe cine ai vota?</TitleText>
            <template #after>
              <ButtonComponent
                kind="outlined"
                color="neutral"
                @click="handleSkipClick"
              >
                Sari peste
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <StackComponent
          v-if="electionStore.answerCount > 0"
          class="main"
          spacing="medium"
        >
          <StackComponent spacing="small">
            <BodyText size="medium">
              Am dori să îți arătăm cum răspund susținătorii diferiților
              candidați la întrebările de mai sus. Pentru a facilita acest
              lucru, te rugăm să ne spui pentru ce candidat intenționezi
              să votezi?
            </BodyText>
          </StackComponent>
          <CandidateList
            category="general"
            :max-visible-candidates="50"
          />
        </StackComponent>
        <StackComponent v-else class="main" spacing="medium">
          <CardComponent corner="bottom-left">
            <StackComponent spacing="medium">
              <TitleText tag="p" size="medium">
                Pentru a vedea rezultatul, trebuie să răspundeți la cel puțin o
                întrebare.
              </TitleText>
              <BodyText tag="p" size="medium">
                Puteți reveni la început și răspunde la cel puțin o întrebare
                sau puteți vizualiza comparația răspunsurilor părților.
              </BodyText>
              <StackComponent horizontal spacing="medium">
                <ButtonComponent
                  kind="outlined"
                  color="primary"
                  @click="handleStartClick"
                >
                  Completați calculatorul
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent>
                <ButtonComponent
                  kind="outlined"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  Răspunsurile părților
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent>
              </StackComponent>
            </StackComponent>
          </CardComponent>
        </StackComponent>
        <template #bottom-bar>
          <ResponsiveWrapper extra-small small>
            <BottomBar>
              <div class="bottom-bar-grid">
                <ButtonComponent
                  kind="outlined"
                  color="neutral"
                  @click="handleSkipClick"
                >
                  Sari peste
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent>
              </div>
            </BottomBar>
          </ResponsiveWrapper>
        </template>
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.navbar-btn-wrapper {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-small);
}
.results-header-note {
  text-align: center;
}
.results-footer-note {
  text-align: center;
}
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

.bottom-bar-grid {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
