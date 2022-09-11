<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import RadioButtonComponent from '@/components/design-system/input/RadioButtonComponent.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';

import ResponsiveWrapper from '@/components/responsivity/ResponsiveWrapper.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

// TODO: Map route params to text
const title = route.params.election;

// TODO: Map route params to text
const heading =
  route.params.election === 'senatni-2022'
    ? 'Zvolte svůj senátní obvod'
    : 'Zvolte své město';

const options = electionStore.districts.map((district) => {
  return { value: district.district_code, label: district.name };
});

const selected = ref((route.params.district as string) || null);

const onSubmit = () => {
  if (selected.value) {
    router.push({
      name: appRoutes.guide.name,
      params: { ...route.params, district: selected.value, nr: 1 },
    });
  }
};
</script>

<template>
  <BackgroundComponent :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent>
          <template #title>{{ title }}</template>
          <template #right>
            <ResponsiveWrapper desktop>
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
            <ResponsiveWrapper mobile>
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
          </template>
        </NavigationBar>
      </template>
      <template #sticky-header>
        <SecondaryNavigationBar transparent>
          {{ heading }}
        </SecondaryNavigationBar>
      </template>
      <form id="district-form" ref="form" @submit.prevent="onSubmit">
        <BottomBarWrapper>
          <div class="main">
            <div class="list">
              <RadioButtonComponent
                v-for="option in options"
                :key="option.value"
                v-model="selected"
                group-name="district-selection"
                :value="option.value"
              >
                {{ option.label }}
              </RadioButtonComponent>
            </div>
          </div>
          <template #bottom-bar>
            <ResponsiveWrapper desktop>
              <BottomBar class="bottom-bar" transparent>
                <ButtonComponent
                  kind="filled"
                  type="submit"
                  color="primary"
                  :disabled="!selected"
                >
                  Potvrdit a pokračovat
                </ButtonComponent>
              </BottomBar>
            </ResponsiveWrapper>
            <ResponsiveWrapper mobile>
              <BottomBar class="bottom-bar">
                <ButtonComponent
                  kind="filled"
                  type="submit"
                  color="primary"
                  :disabled="!selected"
                >
                  Potvrdit a pokračovat
                </ButtonComponent>
              </BottomBar>
            </ResponsiveWrapper>
          </template>
        </BottomBarWrapper>
      </form>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: minmax(24rem, max-content);
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: var(--spacing-small);
}

/* TODO: update breakpoint */
@media (max-width: 700px) {
  .main {
    grid-template-columns: 1fr;
  }
}

form {
  display: contents;
}

.bottom-bar {
  display: grid;
  grid-template-columns: max-content;
  justify-content: center;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}
</style>
