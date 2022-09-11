<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  mdiCloseCircleOutline,
  mdiArrowRight,
  mdiArrowLeft,
  mdiFastForward,
} from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';

import type { Election } from '@/types/election';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import LabelText from '@/components/design-system/typography/LabelText.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StepProgress from '@/components/design-system/other/StepProgress.vue';
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
  vkiLogoNeutral,
  vkiStarOutlined,
  vkiStarFilled,
} from '@/components/design-system/icons';

import EmbedWrapper from '@/components/responsivity/EmbedWrapper.vue';
import MarkdownIt from '@/components/utilities/MarkdownIt.vue';
import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

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

// TODO: Replace with data from store
const text =
  route.params.election === 'senatni-2022'
    ? `
Vítejte ve Volební kalkulačce pro volby do zastupitelstev měst.

Čeká vás 30-40 otázek. Na stejné otázky nám odpověděly kandidující strany. Zodpovězení otázek zabere cca 10 minut. Na konci se dozvíte, jak se strany shodují s vašimi názory.
      `
    : `
Vítejte ve Volební kalkulačce pro komunální volby 2022.

Čeká vás 30-40 otázek, jejich zodpovězení zabere cca 10 minut. Na konci se dozvíte, v kolika procentech odpovědí se s kandidujícími stranami shodujete v názorech.
    `;

const forwardRoute = computed(
  () =>
    router.options.history.state.forward &&
    router.resolve(router.options.history.state.forward as string)
);

const backRoute = computed(
  () =>
    router.options.history.state.back &&
    router.resolve(router.options.history.state.back as string)
);

const stepsCount = 4;
const currentStep = computed(() => parseInt(route.params.step as string) || 1);
const farthestCompletedStep = ref(
  Math.max(
    currentStep.value - 1,
    forwardRoute.value && forwardRoute.value.name === appRoutes.question.name
      ? 4
      : 0,
    backRoute.value && backRoute.value.name === appRoutes.question.name ? 4 : 0
  )
);

const nextButtonTitle = computed(() => {
  if (currentStep.value < stepsCount) {
    return 'Další';
  } else {
    return 'První otázka';
  }
});
const nextButtonKind = computed(() => {
  if (currentStep.value < stepsCount) {
    return 'outlined';
  } else {
    return 'filled';
  }
});
const nextButtonColor = computed(() => {
  if (currentStep.value < stepsCount) {
    return 'neutral';
  } else {
    return 'primary';
  }
});

const skipButtonVisibility = computed(() => {
  if (currentStep.value < stepsCount) {
    return 'initial';
  } else {
    return 'hidden';
  }
});

const goToStep = (number: number) => {
  router.push({
    name: appRoutes.guide.name,
    params: { ...route.params, step: number },
  });
};

const goToQuestions = () => {
  router.push({ name: 'question', params: { ...route.params, nr: 'first' } });
};

const handleNextClick = () => {
  farthestCompletedStep.value = Math.max(
    farthestCompletedStep.value,
    currentStep.value
  );

  if (currentStep.value < stepsCount) {
    goToStep(currentStep.value + 1);
  } else {
    goToQuestions();
  }
};

const handlePreviousClick = () => {
  goToStep(currentStep.value - 1);
};
</script>

<template>
  <BackgroundComponent :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent>
          <template #title>{{ breadcrumbs }}</template>
          <template #right>
            <EmbedWrapper>
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
            </EmbedWrapper>
          </template>
        </NavigationBar>
      </template>
      <template #sticky-header>
        <ResponsiveWrapper extra-small small>
          <SecondaryNavigationBar transparent>
            <template v-if="currentStep > 1" #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Předchozí" />
              </IconButton>
            </template>
            <template v-if="farthestCompletedStep >= currentStep" #after>
              <IconButton @click="handleNextClick">
                <IconComponent :icon="mdiArrowRight" :title="nextButtonTitle" />
              </IconButton>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <StepWrapper>
          <template #before>
            <ResponsiveWrapper medium large extra-large huge>
              <IconButton v-if="currentStep > 1" @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Předchozí" />
              </IconButton>
            </ResponsiveWrapper>
          </template>
          <StackComponent v-if="currentStep === 1" spacing="small">
            <HeadingComponent kind="title" size="medium">
              {{ electionName }}
              <template #secondary>{{ districtNameWithCode }}</template>
            </HeadingComponent>
            <BodyText size="medium">
              <MarkdownIt :markdown="text" />
            </BodyText>
          </StackComponent>
          <StackComponent v-if="currentStep === 2" spacing="small">
            <BodyText size="medium">Odpovídat můžete pomocí tlačítek:</BodyText>
            <CardComponent
              corner="bottom-right"
              border
              style="align-self: center"
            >
              <StackComponent spacing="small">
                <StackComponent horizontal spacing="small">
                  <IconComponent
                    :icon="vkiLogoInFavour"
                    color="rgb(var(--color-primary-fg))"
                  />
                  <BodyText size="medium">= souhlasím</BodyText>
                </StackComponent>
                <StackComponent horizontal spacing="small">
                  <IconComponent
                    :icon="vkiLogoAgainst"
                    color="rgb(var(--color-secondary-fg))"
                  />
                  <BodyText size="medium">= nesouhlasím</BodyText>
                </StackComponent>
              </StackComponent>
            </CardComponent>
            <StackComponent spacing="extra-small">
              <BodyText size="medium">
                Když se s&nbsp;kandidátem nebo stranou v&nbsp;odpovědi shodnete,
                získá ve výpočtu shody 1&nbsp;bod. V&nbsp;opačném případě
                1&nbsp;bod ztratí.
              </BodyText>
              <BodyText size="medium">
                Pokud kandidát nebo strana odpověděli neutrálně, otázka se
                započítá se ziskem 0&nbsp;bodů.
              </BodyText>
            </StackComponent>
          </StackComponent>
          <StackComponent v-if="currentStep === 3" spacing="small">
            <BodyText size="medium">
              Pokud vám na daném tématu zvlášť záleží, označte ho hvězdičkou:
            </BodyText>
            <!-- TODO: remove inline styles -->
            <CardComponent
              corner="bottom-right"
              border
              style="align-self: center"
            >
              <StackComponent horizontal centered spacing="small">
                <IconComponent :icon="vkiStarOutlined" />
                <IconComponent :icon="mdiArrowRight" size="small" />
                <IconComponent
                  :icon="vkiStarFilled"
                  color="rgb(var(--palette-yellow))"
                />
                <BodyText size="medium">= pro mě důležité</BodyText>
              </StackComponent>
            </CardComponent>
            <BodyText size="medium">
              Odpověď pak bude mít ve výpočtu shody dvojnásobnou váhu.
            </BodyText>
          </StackComponent>
          <StackComponent v-if="currentStep === 4" spacing="small">
            <BodyText size="medium">
              Když nemáte názor, nejste si jisti nebo z&nbsp;jiného důvodu
              nechcete odpovídat, zvolte:
            </BodyText>
            <CardComponent
              corner="bottom-right"
              border
              style="align-self: center"
            >
              <StackComponent horizontal spacing="small">
                <IconComponent :icon="vkiLogoNeutral" />
                <BodyText size="medium">= přeskočit / bez odpovědi</BodyText>
              </StackComponent>
            </CardComponent>
            <BodyText size="medium">
              Tato otázka se do výpočtu vaší shody nezapočítá.
            </BodyText>
          </StackComponent>
          <template #after>
            <ResponsiveWrapper medium large extra-large huge>
              <IconButton
                v-if="farthestCompletedStep >= currentStep"
                @click="handleNextClick"
              >
                <IconComponent :icon="mdiArrowRight" :title="nextButtonTitle" />
              </IconButton>
            </ResponsiveWrapper>
          </template>
        </StepWrapper>
        <template #bottom-bar>
          <ResponsiveWrapper medium large extra-large huge>
            <BottomBar class="bottom-bar" transparent>
              <LabelText class="text">
                Návod {{ currentStep }}&hairsp;/&hairsp;{{ stepsCount }}
              </LabelText>
              <StepProgress class="progress-indicator" :current="currentStep" />
              <ButtonComponent
                class="next-button"
                :kind="nextButtonKind"
                :color="nextButtonColor"
                @click="handleNextClick"
              >
                {{ nextButtonTitle }}
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
              <ButtonComponent
                class="skip-button"
                kind="link"
                @click="goToQuestions"
              >
                Přeskočit návod
                <template #iconAfter>
                  <IconComponent :icon="mdiFastForward" />
                </template>
              </ButtonComponent>
            </BottomBar>
          </ResponsiveWrapper>
          <ResponsiveWrapper extra-small small>
            <BottomBar class="bottom-bar">
              <LabelText class="text">
                Návod {{ currentStep }}&hairsp;/&hairsp;{{ stepsCount }}
              </LabelText>
              <StepProgress class="progress-indicator" :current="currentStep" />
              <ButtonComponent
                class="next-button"
                :kind="nextButtonKind"
                :color="nextButtonColor"
                @click="handleNextClick"
              >
                {{ nextButtonTitle }}
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
              <ButtonComponent
                class="skip-button"
                kind="link"
                @click="goToQuestions"
              >
                Přeskočit návod
                <template #iconAfter>
                  <IconComponent :icon="mdiFastForward" />
                </template>
              </ButtonComponent>
            </BottomBar>
          </ResponsiveWrapper>
        </template>
      </BottomBarWrapper>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.bottom-bar {
  display: grid;
  grid-template-columns: repeat(2, 8rem);
  gap: var(--spacing-small);
  justify-content: center;

  /* TODO: update breakpoint */
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .text {
    grid-column: 1;
    justify-self: start;
  }

  .progress-indicator {
    grid-column: 2;
    justify-self: end;
  }

  .next-button {
    grid-column: 1 / span 2;
    grid-row: 2;
  }

  .skip-button {
    visibility: v-bind(skipButtonVisibility);
    grid-column: 1 / span 2;
    grid-row: 3;
    justify-self: center;
  }
}
</style>
