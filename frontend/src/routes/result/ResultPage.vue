<script setup lang="ts">
import { computed, onBeforeMount, ref, type ComputedRef, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  mdiShareVariantOutline,
  mdiCloseCircleOutline,
  mdiArrowLeft,
  mdiArrowRight,
  mdiAccountCircleOutline,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { useUserStore, type User } from '@/stores/userStore';
import {
  calculateRelativeAgreement,
  encodeResults,
} from '@/common/resultParser';

import type { DeprecatedElection } from '@/types/election';
import type { DeprecatedCandidateAnswer } from '@/types/candidate-answer';

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
import ResultShareModal from './ResultShareModal.vue';
import { getDistrictCode } from '@/common/utils';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ErrorModal from '../../components/ErrorModal.vue';
import DonateBlock from '../../components/DonateBlock.vue';
import CheckboxComponent from '../../components/design-system/input/CheckboxComponent.vue';
import { inject } from 'vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const currentEmbed = inject(EmbedKey);

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const userStore = useUserStore();

const user = computed(() => userStore.user);

const election = electionStore.election as DeprecatedElection;
const electionName = election.name;
const districtCode = getDistrictCode(route.params.second as string);
const districtName = electionStore.districts.filter(
  (district) => district.district_code === districtCode,
)[0].name;
const showDistrictCode = electionStore.districts.filter(
  (district) => district.district_code === districtCode,
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

const handleShareClick = () => {
  shareModal.value?.open();
};
onBeforeMount(async () => {
  if (election.key === 'nrsr-2023') {
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

const candidateAnswers: DeprecatedCandidateAnswer[] =
  electionStore.calculator?.answers || [];

const hasAllCandidatesInactive =
  electionStore.calculator?.candidates.filter(
    (candidate) => !candidate.is_active,
  ).length === electionStore.calculator?.candidates.length;

const hasActiveCandidatesBtn = hasAllCandidatesInactive
  ? false
  : electionStore.calculator?.candidates.some((x) => !x.is_active);

const showNotActiveCandidates = ref(false);
const filteredCandidateAnswers: Ref<DeprecatedCandidateAnswer[]> =
  ref(candidateAnswers);
const handleActiveCandidatesClicked = (isActive: boolean) => {
  showNotActiveCandidates.value = isActive;
  if (!hasAllCandidatesInactive && !showNotActiveCandidates.value) {
    filteredCandidateAnswers.value = filteredCandidateAnswers.value.filter(
      (x) => {
        return electionStore.calculator?.candidates.find(
          (cnd) => x.candidate_id === cnd.id && cnd.is_active,
        );
      },
    );
  } else if (electionStore.calculator?.answers) {
    filteredCandidateAnswers.value = candidateAnswers;
  }
};
handleActiveCandidatesClicked(false);

const resultsGeneral = computed(() => {
  const ra = calculateRelativeAgreement(
    filteredCandidateAnswers.value,
    electionStore.answers,
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
                  {{ $t('routes.result.ResultPage.back-to-main-page') }}
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
                      :title="$t('routes.result.ResultPage.back-to-main-page')"
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
                <IconComponent
                  :icon="mdiArrowLeft"
                  :title="$t('routes.result.ResultPage.recapitulation')"
                />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">{{
              $t('routes.result.ResultPage.my-match')
            }}</TitleText>
            <template v-if="election.key === 'nrsr-2023'" #after>
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
                <IconComponent
                  :icon="mdiArrowLeft"
                  :title="$t('routes.result.ResultPage.recapitulation')"
                />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large">{{
              $t('routes.result.ResultPage.my-match')
            }}</TitleText>
            <template #after>
              <div class="navbar-btn-wrapper">
                <ButtonComponent
                  v-if="election.key === 'nrsr-2023'"
                  kind="link"
                  color="primary"
                  @click="handleShareClick"
                >
                  <template #icon>
                    <IconComponent :icon="mdiShareVariantOutline" />
                  </template>
                  {{ $t('routes.result.ResultPage.share') }}
                </ButtonComponent>
                <!-- <ButtonComponent
                  class="desktop"
                  kind="filled"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  {{ $t('routes.result.ResultPage.compare-answers') }}
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent> -->
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
            {{
              $t('routes.result.ResultPage.display-not-advancing-candidates')
            }}
          </CheckboxComponent>
          <BodyText size="medium">
            {{ $t('routes.result.ResultPage.text-table') }}
            <a
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1UzaiDq-NRdgoPSiSv3uxDqk0wpGC7wlJUdGsTAQnLus"
              >{{ $t('routes.result.ResultPage.in-table') }}</a
            >.
          </BodyText>
          <ResultCategory
            :result="resultsGeneral"
            category="general"
            :max-visible-candidates="5"
          />
          <!-- <CardComponent
            v-if="!user && election.key === 'prezidentske-2023'"
            corner="bottom-left"
            style="max-width: 32rem; justify-self: center"
          >
            <StackComponent centered spacing="medium">
              <StackComponent spacing="medium">
                <TitleText tag="p" size="medium">
                  {{ $t('routes.result.ResultPage.text-in-time') }}
                </TitleText>
                <BodyText tag="p" size="medium">
                  {{ $t('routes.result.ResultPage.text-save-calc') }}
                </BodyText>
              </StackComponent>
              <ButtonComponent
                kind="outlined"
                color="primary"
                :href="signUpPath"
                target="_blank"
              >
                <template #icon>
                  <IconComponent :icon="mdiAccountCircleOutline" />
                </template>
                Vytvořit profil
              </ButtonComponent>
            </StackComponent>
          </CardComponent> -->
          <DonateBlock />
        </StackComponent>
        <StackComponent v-else class="main" spacing="medium">
          <CardComponent corner="bottom-left">
            <StackComponent spacing="medium">
              <TitleText tag="p" size="medium">
                {{ $t('routes.result.ResultPage.text-at-least-one-answer') }}
              </TitleText>
              <BodyText tag="p" size="medium">
                {{ $t('routes.result.ResultPage.you-may') }}
                <a
                  :href="
                    router.resolve({
                      name: appRoutes.question.name,
                      params: { ...route.params, nr: 1 },
                      query: { ...route.query },
                    }).path
                  "
                  @click.prevent="handleStartClick"
                  >{{ $t('routes.result.ResultPage.back-to-start') }}</a
                >
                {{ $t('routes.result.ResultPage.text-and-answer') }}
                <!-- <a
                  :href="
                    router.resolve({
                      name: appRoutes.comparison.name,
                      params: { ...route.params },
                      query: { ...route.query },
                    }).path
                  "
                  @click.prevent="handleShowComparsionClick"
                >
                  {{ $t('routes.result.ResultPage.text-display-answers') }} </a
                >. -->
              </BodyText>
              <StackComponent horizontal spacing="medium">
                <ButtonComponent
                  kind="outlined"
                  color="primary"
                  @click="handleStartClick"
                >
                  {{ $t('routes.result.ResultPage.fill-calc') }}
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent>
                <!-- <ButtonComponent
                  kind="outlined"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  {{ $t('routes.result.ResultPage.candidates-answers') }}
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent> -->
              </StackComponent>
            </StackComponent>
          </CardComponent>
          <DonateBlock />
        </StackComponent>

        <!-- <template #bottom-bar>
          <ResponsiveWrapper extra-small small>
            <BottomBar>
              <div class="bottom-bar-grid">
                <ButtonComponent
                  kind="filled"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  {{ $t('routes.result.ResultPage.compare-answers') }}
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent>
              </div>
            </BottomBar>
          </ResponsiveWrapper>
        </template> -->
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent>
  <ResultShareModal
    v-if="electionStore.resultsId"
    ref="shareModal"
    :relative-agreement="resultsGeneral"
  />
  <ErrorModal
    v-else
    ref="shareModal"
    :title="$t('routes.result.ResultPage.something-went-wrong')"
  >
    {{ $t('routes.result.ResultPage.something-went-wrong-text') }}
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
}
</style>
