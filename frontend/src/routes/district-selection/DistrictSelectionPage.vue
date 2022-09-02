<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';

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

const options = electionStore.districts.map((x) => {
  return { district_code: x.district_code, label: x.label };
});

const onSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement;
  const districtField = form.querySelector(
    '#district-selection'
  ) as HTMLSelectElement;
  const districtCode = districtField.value;
  if (districtCode !== '') {
    const guideRoute = {
      name: appRoutes.guide.name,
      params: { ...route.params, district: districtCode, nr: 1 },
    };
    router.push(guideRoute);
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
    <form @submit.prevent="onSubmit">
      <BottomBarWrapper>
        <StackComponent>
          <HeadingComponent>{{ heading }}</HeadingComponent>
          <select id="district-selection" name="district-selection">
            <option
              v-for="x in options"
              :key="x.district_code"
              :value="x.district_code"
            >
              {{ x.label }}
            </option>
          </select>
        </StackComponent>
        <template #bottom-bar>
          <BottomBar class="bottom-bar" transparent="desktop">
            <ButtonComponent kind="filled" type="submit">
              Potvrdit a pokračovat
            </ButtonComponent>
          </BottomBar>
        </template>
      </BottomBarWrapper>
    </form>
  </StickyHeaderLayout>
</template>

<style lang="scss" scoped>
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
