<script setup lang="ts">
import { computed, onBeforeMount, ref, type ComputedRef, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  mdiCloseCircleOutline,
  mdiArrowLeft,
  mdiArrowRight,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { useUserStore, type User } from '@/stores/userStore';
import {
  calculateRelativeAgreement,
  encodeResults,
} from '@/common/resultParser';

import type { Election } from '@/types/election';
import type { CandidateAnswer } from '@/types/candidate-answer';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
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

import ResultCategory from './ResultCategory.vue';
import { getDistrictCode } from '@/common/utils';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ErrorModal from '../../components/ErrorModal.vue';
import CheckboxComponent from '../../components/design-system/input/CheckboxComponent.vue';
import { inject } from 'vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

const currentEmbed = inject(EmbedKey);

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const userStore = useUserStore();

const user = computed(() => userStore.user);

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
  router.push({
    name: appRoutes.recap.name,
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

onBeforeMount(async () => {
  if (election.key === 'presidential-2025') {
    if (userStore.user || userStore.user === null) {
      const res = await electionStore.saveResults({
        embedName: currentEmbed,
        user: userStore.user as User | null | undefined,
      });
      console.debug(res);
    } else {
      userStore.$subscribe(async (mutation, state) => {
        const res = await electionStore.saveResults({
          embedName: currentEmbed,
          user: state.user as User | null | undefined,
        });
        console.debug(res);
      });
    }
  }
});

const signUpParams = computed(() => {
  const returnPath = router.resolve({
    name: appRoutes.share.name,
    params: { uuid: electionStore.resultsId },
  }).path;

  return {
    name: appRoutes.register.name,
    params: {
      ...route.params,
    },
    query: {
      returnPath,
      answerId: electionStore.resultsId,
      updateToken: electionStore.resultsUpdateToken,
    },
  };
});

const signUpPath = computed(() => {
  return router.resolve(signUpParams.value).fullPath;
});

console.debug(encodeResults(electionStore.answers));

const candidateAnswers: CandidateAnswer[] =
  electionStore.calculator?.answers || [];

const hasAllCandidatesInactive =
  electionStore.calculator?.candidates.filter(
    (candidate) => !candidate.is_active
  ).length === electionStore.calculator?.candidates.length;

const hasActiveCandidatesBtn = hasAllCandidatesInactive
  ? false
  : electionStore.calculator?.candidates.some((x) => !x.is_active);

const showNotActiveCandidates = ref(false);
const filteredCandidateAnswers: Ref<CandidateAnswer[]> = ref(candidateAnswers);
const handleActiveCandidatesClicked = (isActive: boolean) => {
  showNotActiveCandidates.value = isActive;
  if (!hasAllCandidatesInactive && !showNotActiveCandidates.value) {
    filteredCandidateAnswers.value = filteredCandidateAnswers.value.filter(
      (x) => {
        return electionStore.calculator?.candidates.find(
          (cnd) => x.candidate_id === cnd.id && cnd.is_active
        );
      }
    );
  } else if (electionStore.calculator?.answers) {
    filteredCandidateAnswers.value = candidateAnswers;
  }
};
handleActiveCandidatesClicked(false);

const resultsGeneral = computed(() => {
  const ra = calculateRelativeAgreement(
    filteredCandidateAnswers.value,
    electionStore.answers
  );
  return ra;
});
const shareModal = ref<InstanceType<typeof ResultShareModal> | null>(null);
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
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Recapitulare" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">Potrivirea mea</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Adresa de contact" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large">Potrivirea mea</TitleText>
            <template #after>
              <div class="navbar-btn-wrapper">
                <ButtonComponent
                  v-if="election.key === 'presidential-2025'"
                  kind="outlined"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  Compară răspunsurile
                </ButtonComponent>
              </div>
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
          <CheckboxComponent
            v-if="hasActiveCandidatesBtn"
            group-name="test"
            @update:check="handleActiveCandidatesClicked"
          >
            Zobrazit nepostupující kandidáty
          </CheckboxComponent>
          <ResultCategory
            :result="resultsGeneral"
            category="general"
            :max-visible-candidates="5"
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
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  Compară răspunsurile
                </ButtonComponent>
                <!-- <ButtonComponent
                  kind="filled"
                  color="primary"
                  @click="goToPreferredCandidate"
                >
                  Tovább
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent> -->
              </div>
            </BottomBar>
          </ResponsiveWrapper>
        </template>
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent><ErrorModal v-else ref="shareModal" title="Něco se pokazilo">
    Bohužel momentálně nelze sdílet, zkuste to prosím později.
  </ErrorModal>
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
  gap: var(--spacing-small);
}
</style>
