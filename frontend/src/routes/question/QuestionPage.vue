<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import type { RouteParams } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowRight, mdiArrowLeft } from '@mdi/js';

import { appRoutes, questionGuard } from '@/main';
import { useElectionStore, UserAnswerEnum } from '@/stores/electionStore';

import type { DeprecatedElection } from '@/types/election';
import type { DeprecatedQuestion } from '@/types/question';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import QuestionBottomBar from './QuestionBottomBar.vue';
import QuestionCard from './QuestionCard.vue';
import BackgroundComponent from '../../components/design-system/style/BackgroundComponent.vue';
import StatusBarComponent from '@/components/design-system/other/StatusBarComponent.vue';
import { getDistrictCode } from '@/common/utils';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

onBeforeRouteUpdate(questionGuard);

if (electionStore.calculator === undefined) {
  throw new Error('Calculator is undefined. This should never happen');
}

const election = electionStore.election as DeprecatedElection;
const electionName = election.name;
const districtCode = getDistrictCode(route.params.district as string);
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

const forwardRoute = computed(
  () =>
    router.options.history.state.forward &&
    router.resolve(router.options.history.state.forward as string),
);

const backRoute = computed(
  () =>
    router.options.history.state.back &&
    router.resolve(router.options.history.state.back as string),
);

const questionCount = computed(() => electionStore.questionCount);
//internally questions start at 0
const currentQuestionNr = computed(
  () => parseInt(route.params['nr'] as string) - 1,
);

const previousButtonTitle = computed(() => {
  if (currentQuestionNr.value === 0) {
    return {
      long: t('routes.question.QuestionPage.instructions-long'),
      short: t('routes.question.QuestionPage.instructions-short'),
    };
  } else {
    return {
      long: t('routes.question.QuestionPage.previous-question-long'),
      short: t('routes.question.QuestionPage.previous-question-short'),
    };
  }
});

const nextButtonTitle = computed(() => {
  if (currentQuestionNr.value + 1 < questionCount.value) {
    if (
      electionStore.answers[currentQuestionNr.value].answer ===
      UserAnswerEnum.skip
    ) {
      return {
        long: t('routes.question.QuestionPage.skip-question-long'),
        short: t('routes.question.QuestionPage.skip-question-short'),
      };
    } else {
      return {
        long: t('routes.question.QuestionPage.next-question-long'),
        short: t('routes.question.QuestionPage.next-question-short'),
      };
    }
  } else {
    return {
      long: t('routes.question.QuestionPage.recapitulation-long'),
      short: t('routes.question.QuestionPage.recapitulation-short'),
    };
  }
});

const goToQuestion = (number: number) => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: number + 1 },
    query: { ...route.query },
  });
};

const goToRecap = () => {
  router.push({
    name: appRoutes.recap.name,
    query: { ...route.query },
  });
};

const goToGuide = (params: RouteParams) => {
  router.push({
    name: appRoutes.guide.name,
    params,
    query: { ...route.query },
  });
};

const handleNextClick = () => {
  if (currentQuestionNr.value + 1 < questionCount.value) {
    goToQuestion(currentQuestionNr.value + 1);
  } else {
    goToRecap();
  }
};

const handlePreviousClick = () => {
  if (currentQuestionNr.value === 0) {
    const params = (backRoute.value && backRoute.value.params) || {};
    goToGuide(params);
  } else {
    goToQuestion(currentQuestionNr.value - 1);
  }
};

const handleStarClick = () =>
  electionStore.flipAnswerFlag(currentQuestionNr.value);
const handleAnswerClick = (answer: UserAnswerEnum) => {
  const currentAnswer = electionStore.answers[currentQuestionNr.value].answer;
  if (answer === currentAnswer) {
    electionStore.setAnswer(currentQuestionNr.value, UserAnswerEnum.skip);
  } else {
    electionStore.setAnswer(currentQuestionNr.value, answer);
    handleNextClick();
  }
};
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent>
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
                    title="$t('routes.question.QuestionPage.back-to-main-page')"
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
        <SecondaryNavigationBar transparent>
          <template #before>
            <ButtonComponent kind="link" @click="handlePreviousClick">
              {{ previousButtonTitle.short }}
              <template #icon>
                <IconComponent :icon="mdiArrowLeft" />
              </template>
            </ButtonComponent>
          </template>
          <template #after>
            <ButtonComponent kind="link" @click="handleNextClick">
              {{ nextButtonTitle.short }}
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </template>
        </SecondaryNavigationBar>
      </ResponsiveWrapper>
    </template>
    <BottomBarWrapper>
      <BackgroundComponent>
        <ResponsiveWrapper extra-small>
          <StepWrapper>
            <QuestionCard
              :current-question="currentQuestionNr + 1"
              :question-count="electionStore.questionCount"
              :question="
                electionStore.calculator?.questions[
                  currentQuestionNr
                ] as DeprecatedQuestion
              "
            />
          </StepWrapper>
        </ResponsiveWrapper>
        <ResponsiveWrapper small medium large extra-large huge>
          <StepWrapper centered>
            <template #before>
              <ResponsiveWrapper medium large extra-large huge>
                <ButtonComponent kind="link" @click="handlePreviousClick">
                  <ResponsiveWrapper large>
                    {{ previousButtonTitle.short }}
                  </ResponsiveWrapper>
                  <ResponsiveWrapper extra-large huge>
                    {{ previousButtonTitle.long }}
                  </ResponsiveWrapper>
                  <template #icon>
                    <IconComponent
                      :icon="mdiArrowLeft"
                      :title="previousButtonTitle.long"
                    />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
            </template>
            <QuestionCard
              :current-question="currentQuestionNr + 1"
              :question-count="electionStore.questionCount"
              :question="
                electionStore.calculator?.questions[
                  currentQuestionNr
                ] as DeprecatedQuestion
              "
            />
            <template #after>
              <ResponsiveWrapper medium large extra-large huge>
                <ButtonComponent kind="link" @click="handleNextClick">
                  <ResponsiveWrapper large>
                    {{ nextButtonTitle.short }}
                  </ResponsiveWrapper>
                  <ResponsiveWrapper extra-large huge>
                    {{ nextButtonTitle.long }}
                  </ResponsiveWrapper>
                  <template #iconAfter>
                    <IconComponent
                      :icon="mdiArrowRight"
                      :title="nextButtonTitle.long"
                    />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
            </template>
          </StepWrapper>
        </ResponsiveWrapper>
      </BackgroundComponent>
      <template #bottom-bar>
        <StatusBarComponent
          :total-question="electionStore.questionCount"
          :answers="electionStore.answers"
          :current-question="currentQuestionNr"
        />
        <QuestionBottomBar
          :answer="electionStore.answers[currentQuestionNr]"
          :star-click="handleStarClick"
          :yes-click="() => handleAnswerClick(UserAnswerEnum.yes)"
          :no-click="() => handleAnswerClick(UserAnswerEnum.no)"
          :skip-click="() => handleAnswerClick(UserAnswerEnum.skip)"
        />
      </template>
    </BottomBarWrapper>
  </StickyHeaderLayout>
</template>
