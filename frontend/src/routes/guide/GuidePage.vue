<script setup lang="ts">
import { useRoute, useRouter, type RouteLocationNamedRaw } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import GuideBottomBar from './GuideBottomBar.vue';
import { computed, type ComputedRef } from 'vue';
import { appRoutes } from '@/main';
const router = useRouter();
const route = useRoute();
const pageNr = computed(() => (route.params.nr ? route.params.nr : '1'));
const bottomBarSubtitle = computed(() => `navod ${pageNr.value}/2`);
const buttonTitle = computed(() => {
  if (pageNr.value === '1') {
    return 'Pokracovat';
  } else {
    return 'Prvni otazka';
  }
});
const buttonRoute: ComputedRef<RouteLocationNamedRaw> = computed(() => {
  if (pageNr.value === '1') {
    return { name: 'guide', params: { ...route.params, nr: '2' } };
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
  <GuideBottomBar
    :button-title="buttonTitle"
    :on-continue="handleContinueClicked"
    :on-skip="handleSkipClicked"
    :subtitle="bottomBarSubtitle"
  ></GuideBottomBar>
</template>

<style lang="scss" scoped></style>
