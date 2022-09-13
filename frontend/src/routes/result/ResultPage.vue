<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  mdiShareVariantOutline,
  mdiCloseCircleOutline,
  mdiArrowLeft,
  mdiArrowRight,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import {
  calculateRelativeAgreement,
  encodeResults,
} from '@/common/resultParser';
import { generateSocialLink } from '@/common/share';

import type { Election } from '@/types/election';
import type { CandidateAnswer } from '@/types/candidate-answer';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/responsivity/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import ResultCategory from './ResultCategory.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import { getDistrictCode } from '@/common/utils';

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

const handlePreviousClick = () => {
  router.push({
    name: appRoutes.recap.name,
    params: { ...route.params },
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

const showShareModal = ref(false);
const handleShareClick = () => {
  showShareModal.value = true;
};

const handleCloseShareModal = () => {
  showShareModal.value = false;
};

onBeforeMount(async () => {
  await electionStore.saveResults();
  console.debug(`Results saved: ${electionStore.resultsUuid}`);
});

console.debug(encodeResults(electionStore.answers));
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
                <IconComponent :icon="mdiArrowLeft" title="Rekapitulace" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">Moje shoda</TitleText>
            <template #after>
              <!--
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
              -->
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
              <!--
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
              -->
              <ButtonComponent
                class="desktop"
                kind="filled"
                color="primary"
                @click="handleShowComparsionClick"
              >
                Porovnat odpovědi
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
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
            :max-visible-candidates="5"
          />
          <BodyText class="results-footer-note" tag="p" size="medium">
            Opakovaně jsme oslovili všechny kandidáty, ostatní zatím na otázky
            neodpověděli.
          </BodyText>
        </StackComponent>
        <template #bottom-bar>
          <ResponsiveWrapper extra-small small>
            <BottomBar>
              <div class="bottom-bar-grid">
                <ButtonComponent
                  kind="filled"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  Porovnat odpovědi
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
  <ModalComponent :close-modal-callback="handleCloseShareModal">
    <ShareNetwork
      network="facebook"
      :url="generateSocialLink('facebook')"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
      quote="The hot reload is so fast it\'s near instant. - Evan You"
      hashtags="vuejs,vite"
    >
      Share on Facebook
    </ShareNetwork>
  </ModalComponent>
</template>

<style lang="scss" scoped>
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
