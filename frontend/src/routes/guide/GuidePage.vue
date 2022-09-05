<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowRight, mdiFastForward } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';

import type { Election } from '@/types/election';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import LabelText from '@/components/design-system/typography/LabelText.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StepProgress from '@/components/design-system/other/StepProgress.vue';
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
  vkiLogoNeutral,
  vkiStarOutlined,
  vkiStarFilled,
} from '@/components/design-system/icons';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const election = electionStore.election as Election;
const electionName = election.name;
const electionDescription = election.description;
const districtName = electionStore.districts.filter(
  (district) => district.district_code === route.params.district
)[0].label;

const title = `${electionName} — ${districtName}`;

const currentStep = ref(1);
const totalSteps = 4;

const nextButtonTitle = computed(() => {
  if (currentStep.value < totalSteps) {
    return 'Další';
  } else {
    return 'První otázka';
  }
});
const nextButtonKind = computed(() => {
  if (currentStep.value < totalSteps) {
    return 'outlined';
  } else {
    return 'filled';
  }
});
const skipButtonVisibility = computed(() => {
  if (currentStep.value < totalSteps) {
    return 'initial';
  } else {
    return 'hidden';
  }
});

const goToQuestions = () => {
  router.push({ name: 'question', params: { ...route.params, nr: 'first' } });
};

const handleNextClick = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
    console.log(currentStep.value);
  } else {
    goToQuestions();
  }
};
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent>
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
    <BottomBarWrapper>
      <StepWrapper>
        <StackComponent v-if="currentStep === 1" spacing="small">
          <HeadingComponent kind="title" size="medium">
            {{ electionName }}
            <template #secondary>{{ districtName }}</template>
          </HeadingComponent>
          <BodyText size="medium">
            {{ electionDescription }}
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
          <BodyText size="medium">
            Když se s nějakou stranou v odpovědi shodnete, získá ve výpočtu
            shody 1 bod.
          </BodyText>
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
            Když nemáte názor, nejste si jistí nebo z jiného nechcete odpovídat,
            zvolte:
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
            Pokud strana též na otázku neodpověděla, získá 1/2 bodu.
          </BodyText>
        </StackComponent>
      </StepWrapper>
      <template #bottom-bar>
        <BottomBar class="bottom-bar" transparent="desktop">
          <LabelText class="text">
            Návod {{ currentStep }}&hairsp;/&hairsp;{{ totalSteps }}
          </LabelText>
          <StepProgress class="progress-indicator" :current="currentStep" />
          <ButtonComponent
            class="next-button"
            :kind="nextButtonKind"
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
      </template>
    </BottomBarWrapper>
  </StickyHeaderLayout>
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
