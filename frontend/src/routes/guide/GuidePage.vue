<script setup lang="ts">
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';

import { useRoute, useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import GuideBottomBar from './GuideBottomBar.vue';
import { computed, ref } from 'vue';
import { appRoutes } from '@/main';
const pagesTotal = 4;
const router = useRouter();
const route = useRoute();
const pageNr = ref(0);
const bottomBarSubtitle = computed(() => `navod ${pageNr.value}/${pagesTotal}`);
const buttonTitle = computed(() => {
  if (pageNr.value < pagesTotal) {
    return 'Pokracovat';
  } else {
    return 'Prvni otazka';
  }
});
const handleContinueClicked = () => {
  if (pageNr.value < pagesTotal - 1) {
    pageNr.value++;
  } else {
    router.push({ name: 'question', params: { ...route.params, nr: 'first' } });
  }
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
