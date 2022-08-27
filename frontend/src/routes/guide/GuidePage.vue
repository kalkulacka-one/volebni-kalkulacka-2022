<script setup lang="ts">
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';

import { useRoute, useRouter, type RouteLocationNamedRaw } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import GuideBottomBar from './GuideBottomBar.vue';
import { computed, type ComputedRef } from 'vue';
import { appRoutes } from '@/main';
const pagesTotal = 4;
const router = useRouter();
const route = useRoute();
const pageNr = computed(() =>
  route.params.nr ? parseInt(route.params.nr as string) : 1
);
const bottomBarSubtitle = computed(() => `navod ${pageNr.value}/${pagesTotal}`);
const buttonTitle = computed(() => {
  if (pageNr.value < pagesTotal) {
    return 'Pokracovat';
  } else {
    return 'Prvni otazka';
  }
});
const buttonRoute: ComputedRef<RouteLocationNamedRaw> = computed(() => {
  if (pageNr.value < pagesTotal) {
    return { name: 'guide', params: { ...route.params, nr: pageNr.value + 1 } };
  } else {
    return { name: 'question', params: { ...route.params, nr: '1' } };
  }
});
const handleContinueClicked = () => {
  router.push(buttonRoute.value);
};
const handleSkipClicked = () => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: 1 },
  });
};
</script>

<template>
  <NavBar :quit="true" />
  <h1>This is guide</h1>
  <BottomBarWrapper>
    <div
      :style="{
        height: '2222px',
        //justifySelf: 'center',
        //alignSelf: 'center',
        backgroundColor: 'rgb(var(--color-primary-bg))',
      }"
    >
      This is a long guide content.
    </div>
    <template #bottom-bar>
      <GuideBottomBar
        :button-title="buttonTitle"
        :on-continue="handleContinueClicked"
        :on-skip="handleSkipClicked"
        :subtitle="bottomBarSubtitle"
      />
    </template>
  </BottomBarWrapper>
</template>

<style lang="scss" scoped></style>
