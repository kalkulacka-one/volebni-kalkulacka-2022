<script setup lang="ts">
import { getResults } from '@/common/restApi';
import { calculateRelativeAgreement } from '@/common/resultParser';
import { useElectionStore } from '@/stores/electionStore';
import { ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ResultCategory from '../result/ResultCategory.vue';

import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import { mdiRepeat } from '@mdi/js';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import { ErrorPageEnum } from '../error/ErrorPage.vue';

const route = useRoute();
const electionStore = useElectionStore();
const resultsGeneral: Ref<ReturnType<typeof calculateRelativeAgreement>> = ref(
  [],
);
const isInitialized = ref(false);
getResults(route.params.uuid as string)
  .then(() => {
    if (electionStore.calculator) {
      resultsGeneral.value = calculateRelativeAgreement(
        electionStore.calculator.answers,
        electionStore.answers,
      );
      isInitialized.value = true;
    }
  })
  .catch((err) => {
    console.error(`getResults failed! ${err}`);
    router.push({
      name: appRoutes.error.name,
      params: {
        case: ErrorPageEnum.NotFound,
      },
      state: {
        extraInfo: err,
      },
    });
  });
const router = useRouter();
watch(isInitialized, (value) => {
  if (value) {
    const electionName = electionStore.election?.name;
    const districtCode = electionStore.calculator?.district_code;
    const districtName = electionStore.districts.filter(
      (district) => district.district_code === districtCode,
    )[0].name;
    const showDistrictCode = electionStore.districts.filter(
      (district) => district.district_code === districtCode,
    )[0].show_district_code;
    const districtNameWithCode = showDistrictCode
      ? `${districtName} (${districtCode})`
      : districtName;
    breadcrumbs.value = `${electionName} — ${districtNameWithCode}`;
  }
});
const handleFillAgainClick = () => {
  const newRoute = {
    name: appRoutes.districtSelection.name,
    query: { ...route.query },
    params: { election: electionStore.election?.id },
  };
  router.push(newRoute);
};
const breadcrumbs = ref('');
</script>
<template>
  <BackgroundComponent v-if="isInitialized" :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar>
          <template #title>{{ breadcrumbs }}</template>
          <template #right>
            <EmbedWrapper>
              <ResponsiveWrapper medium large extra-large huge>
                <ButtonComponent kind="link" @click="handleFillAgainClick">
                  Vyplnit znovu
                  <template #iconAfter>
                    <IconComponent :icon="mdiRepeat" />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
              <ResponsiveWrapper extra-small small>
                <ButtonComponent kind="link" @click="handleFillAgainClick">
                  <template #icon>
                    <IconComponent :icon="mdiRepeat" title="Vyplnit znovu" />
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
            <template #before> </template>
            <TitleText tag="h2" size="medium">Takhle to vyšlo mně</TitleText>
            <template #after> </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar>
            <template #before> </template>
            <TitleText tag="h2" size="large">Takhle to vyšlo mně</TitleText>
            <template #after> </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <StackComponent class="main" spacing="medium">
          <BodyText class="results-header-note" tag="p" size="medium">
            <strong>
              Pokud si chcete kalkulačku vyplnit také, klikněte na "Vyplnit
              znovu" v pravém horním rohu.
            </strong>
          </BodyText>
          <ResultCategory
            :result="resultsGeneral"
            category="general"
            :max-visible-candidates="5"
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
