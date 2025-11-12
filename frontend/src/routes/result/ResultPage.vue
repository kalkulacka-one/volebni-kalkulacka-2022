<script setup lang="ts">
import { computed, onMounted, onBeforeMount, onBeforeUnmount, ref, type ComputedRef, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  mdiShareVariantOutline,
  mdiCloseCircleOutline,
  mdiArrowLeft,
  mdiArrowRight,
  mdiAccountCircleOutline,
  mdiEmailOutline,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
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
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import ResultCategory from './ResultCategory.vue';
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
  // if (userStore.user || userStore.user === null) {
  //   const res = await electionStore.saveResults({
  //     embedName: currentEmbed,
  //     user: userStore.user as User | null | undefined,
  //   });
  //   console.debug(res);
  // } else {
  //   userStore.$subscribe(async (mutation, state) => {
  //     const res = await electionStore.saveResults({
  //       embedName: currentEmbed,
  //       user: state.user as User | null | undefined,
  //     });
  //     console.debug(res);
  //   });
  // }

  const res = await electionStore.saveResults({
    embedName: currentEmbed,
    user: userStore.user as User | null | undefined,
  });
  console.debug(res);
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

// Temporary subscribe
const email = ref('');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

const handleSubscribe = async () => {
  if (email.value === '') {
    emailError.value = t('routes.index.IndexPage.empty-email-error');
    return;
  } else {
    emailError.value = undefined;
  }

  posting.value = true;

  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value }),
  });

  if (response.ok) {
    posting.value = false;
    success.value = true;
    message.value = t('routes.index.IndexPage.success');
  } else {
    posting.value = false;
    success.value = false;
    message.value = t('routes.index.IndexPage.error');
  }
};

// VoteMatch integration

const scriptElement = ref<null | HTMLScriptElement>(null);

const loadExternalScript = () => {
  const script = document.createElement('script');
  script.src = 'https://assets.votematch.eu/embed.min.js';
  script.async = true;
  document.body.appendChild(script);
  scriptElement.value = script;
};

const removeExternalScript = () => {
  if (scriptElement.value) {
    document.body.removeChild(scriptElement.value);
  }
};

const questionMapping = {
  // 1: "1687289f-5c80-4ba7-970d-193dbd92dd7d",
  2: "34fc9af7-cb43-4081-8e21-a32bb176174e",
  3: "d5525dd2-3460-4960-95b8-e80fb76336a3",
  4: "594d25eb-955d-420b-892a-16f1e440c976",
  5: "1892f2a0-15b1-4a87-b1ee-3ea2bfe62807",
  6: "fe511b84-e29e-441d-ac17-efcaa2c3d592",
  7: "ac59bb82-2670-4c89-a856-8ca8ee3c3cf0",
  8: "71349d6f-6495-4b41-af41-571e16723c7a",
  9: "978eabc6-4b90-42bd-8779-bdd1a4273239",
  10: "dd7bacb7-80f1-4730-8000-58f52f5cb8aa",
  11: "097000bd-ecf3-4219-94b2-5f33ba3ef516",
  12: "8a2962b1-32b8-4eb6-9a99-a165492b9e5b",
  13: "3a9a1367-76c1-4696-bae1-74fa891cfe7b",
  14: "f59d633a-ee3b-44f5-9611-e0cf6765783a",
  15: "fbe6cf2b-878f-4031-9edf-883e684eba54",
  16: "856aa09a-3368-4570-ae78-559dd0ad009f",
  17: "e406e6aa-f9ba-4667-b7ba-d21527df7f2d",
  18: "d5bb5b9d-b5bf-4404-adae-c166c0c00026",
  19: "29464668-00cb-45a1-bafe-8436aa552cbc",
  20: "9569ce88-4ba1-46df-8cf6-b9aeb0917f74",
  21: "90d8acec-2741-4dd4-83d6-4adc260d49be",
  22: "0936db85-56c2-4d63-89ee-ae6b329ba7d9",
  23: "d431ef34-8499-4895-93b7-a0d208d4543f",
  24: "1c97cbfb-bc4e-4a73-93bc-103d3fe9baa2",
  25: "1cbc2791-3803-4688-91e5-3f8c357593a5",
};

const candidateMapping = {
  "AT01": "30973f28-a4b6-4093-beb6-cb9c77de2ecd",
  "AT02": "fcf86e19-b470-49a7-a350-0044aac8c603",
  "AT03": "b02cacf7-c383-4b01-a463-f5bb559e384a",
  "AT04": "94bd387b-45bf-4eb6-ae14-0fe8db7a2323",
  "AT05": "0148208f-4166-4615-9472-e38a0121045d",
  "AT06": "3d8606ba-c130-4615-b3d0-bb5f09d9138d",
  "AT07": "2bec6641-31f3-4699-bcf3-be99b1c69f92",
};

const voteMatchLanguage = 'DE';
const voteMatchCountry = 'AT';

const mappedAnswers = computed(
  () => electionStore.answers.map(answer => {
    const answerMapping = { 1: 1, 3: 0, 2: -1 };
    const swappedQuestionMapping = Object.fromEntries(
      Object.entries(questionMapping).map(([key, value]) => [value, key])
    );
    if (swappedQuestionMapping[answer.id] === undefined) return [];
    let voteMatchID = swappedQuestionMapping[answer.id];
    voteMatchID = voteMatchID.toString().padStart(2, "0");
    return {
      [`answer${voteMatchID}`]: answerMapping[answer.answer]
    };
  })
    .filter(item => Object.keys(item).length > 0)
    .reduce((result, item) => ({ ...result, ...item }), {})
);

const voteMatchCalculators = ['wahlrechner', 'express'];
const showVoteMatch = computed(
  () =>
    !!(Object.keys(mappedAnswers.value).length >= 15) &&
    route.params.first === 'europawahl-2024' &&
    voteMatchCalculators.includes(route.params.second as string),
);

onMounted(() => {
  if (showVoteMatch.value) {
    loadExternalScript();

    const swappedCandidateMapping = Object.fromEntries(
      Object.entries(candidateMapping).map(([key, value]) => [value, key])
    );
    let bestmatch: string[] = [];
    resultsGeneral.value.forEach((result, index) => {
      if (index === 0) {
        bestmatch.push(swappedCandidateMapping[result.cId]);
      } else if (result.result.result_percent === resultsGeneral.value[0].result.result_percent) {
        bestmatch.push(swappedCandidateMapping[result.cId]);
      }
    });

    const bestscore = resultsGeneral.value[0].result.result_percent;

    document.addEventListener('VotematchEU-ready', function() {
      (window as any).VotematchEU.update({
        lang: voteMatchLanguage,
        // action:'https://acc-app.votematch.eu',
      });
      (window as any).VotematchEU.results({
        country: voteMatchCountry,
        bestmatch: bestmatch,
        bestscore: bestscore,
        ...mappedAnswers.value,
      });
    });
  }
});

onBeforeUnmount(removeExternalScript);
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
            <template #after>
              <!-- <ButtonComponent
                kind="link"
                color="primary"
                @click="handleShareClick"
              >
                <template #icon>
                  <IconComponent :icon="mdiShareVariantOutline" />
                </template>
                {{ $t('routes.result.ResultPage.share') }}
              </ButtonComponent> -->
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
                <!-- <ButtonComponent
                  kind="link"
                  color="primary"
                  @click="handleShareClick"
                >
                  <template #icon>
                    <IconComponent :icon="mdiShareVariantOutline" />
                  </template>
                  {{ $t('routes.result.ResultPage.share') }}
                </ButtonComponent> -->
                <ButtonComponent
                  class="desktop"
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
          <CardComponent
            v-if="showVoteMatch"
            background-color="#153288"
            corner="bottom-left"
          >
            <StackComponent spacing="medium">
              <img style="max-height: 1rem;" :src="'/images/votematcheurope-logo.svg'" />
              <StackComponent spacing="medium">
                <TitleText tag="p" size="medium" color="white">
                  Mit welcher Partei in der EU stimmen Sie am meisten überein?
                </TitleText>
                <BodyText tag="p" size="medium" color="white">
                  Vergleichen Sie Ihre Ergebnisse mit politischen Parteien in anderen europäischen Ländern.
                </BodyText>
              </StackComponent>
              <ButtonComponent
                kind="outlined"
                color="white"
                target="_blank"
                class="VotematchEU-button"
              >
              Meine Ergebnisse in VoteMatch Europe anzeigen
              </ButtonComponent>
            </StackComponent>
          </CardComponent>
          <ResultCategory
            :result="resultsGeneral"
            category="general"
            :max-visible-candidates="13"
          />
          <section class="subscribe">
            <StackComponent spacing="small" centered>
              <BodyText size="small" centered>
                Hinterlassen Sie uns Ihre E-Mail-Adresse, und wir werden Sie jedes Mal benachrichtigen, wenn wir einen neuen Wahlrechner starten.
              </BodyText>
              <BodyText v-if="success" size="small">
                {{ message }}
              </BodyText>
              <form v-if="!success">
                <StackComponent
                  horizontal
                  spacing="small"
                  stretched
                  wrap
                  style="justify-content: center"
                >
                  <TextInputComponent
                    v-model="email"
                    required
                    type="email"
                    :placeholder="t('routes.index.IndexPage.input-label')"
                    :value="email"
                    :icon="mdiEmailOutline"
                    :disabled="posting"
                    :error="emailError"
                  />
                  <ButtonComponent
                    kind="filled"
                    color="primary"
                    :loading="posting"
                    @click.prevent="handleSubscribe"
                  >
                  Bitte um Information zu neuen Wahlrechnern.
                  </ButtonComponent>
                </StackComponent>
              </form>
              <BodyText v-if="!success" tag="p" size="small">{{
                $t('routes.index.IndexPage.disclaimer')
              }}</BodyText>
            </StackComponent>
          </section>
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
                <a
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
                >.
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
                <ButtonComponent
                  kind="outlined"
                  color="primary"
                  @click="handleShowComparsionClick"
                >
                  {{ $t('routes.result.ResultPage.candidates-answers') }}
                  <template #iconAfter>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                </ButtonComponent>
              </StackComponent>
            </StackComponent>
          </CardComponent>
          <DonateBlock />
        </StackComponent>
        <template #bottom-bar>
          <ResponsiveWrapper
            extra-small
            small
          >
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
