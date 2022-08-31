<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';

import GuideBottomBar from './GuideBottomBar.vue';

const router = useRouter();
const route = useRoute();

// TODO: Map route params to text
const title = `${route.params.election} — ${route.params.district}`;

const pagesTotal = 4;

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
      <div
        :style="{
          height: '2222px',
          //justifySelf: 'center',
          //alignSelf: 'center',
          backgroundColor: 'rgb(var(--color-primary-bg))',
        }"
      >
        <h1>This is guide</h1>
        <p>This is a long guide content.</p>
      </div>
      <template #bottom-bar>
        <BottomBar transparent="desktop">
          <GuideBottomBar
            :button-title="buttonTitle"
            :on-continue="handleContinueClicked"
            :on-skip="handleSkipClicked"
            :subtitle="bottomBarSubtitle"
          />
        </BottomBar>
      </template>
    </BottomBarWrapper>
  </StickyHeaderLayout>
</template>

<style lang="scss" scoped></style>
