<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';

import type { Election } from '@/types/election';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import RadioButtonComponent from '@/components/design-system/input/RadioButtonComponent.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import MarkdownIt from '@/components/utilities/MarkdownIt.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import { stringToNormalizedHyphenated } from '@/common/utils';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();

const election = electionStore.election as Election;
const electionName = election.name;
const electionDescription = election.description;

const breadcrumbs = electionName;

// TODO: Replace with data from store
const title =
  route.params.election === 'senatni-2022'
    ? 'Zvolte svůj senátní obvod'
    : 'Zvolte své město';

const text = electionDescription;

const options = electionStore.districts.map((district) => {
  const normalizedName = stringToNormalizedHyphenated(district.name);
  return {
    value: `${district.district_code}-${normalizedName}`,
    label:
      district.name +
      (district.show_district_code ? ` (${district.district_code})` : ''),
  };
});

const selected = ref((route.params.district as string) || null);

const onSubmit = () => {
  console.debug(selected);
  if (selected.value) {
    router.push({
      name: appRoutes.guide.name,
      params: { ...route.params, district: selected.value, nr: 1 },
      query: { ...route.query },
    });
  }
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
          <SecondaryNavigationBar transparent centered-title>
            <TitleText tag="h2" size="medium">{{ title }}</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar transparent>
            <TitleText tag="h2" size="large">{{ title }}</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <form id="district-form" ref="form" @submit.prevent="onSubmit">
        <BottomBarWrapper>
          <div class="main">
            <StackComponent spacing="medium">
              <BodyText size="medium">
                <StackComponent spacing="extra-small">
                  <MarkdownIt :markdown="text" />
                </StackComponent>
              </BodyText>
              <!-- TODO: remove inline styles -->
              <div class="list" style="align-self: stretch">
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
            </StackComponent>
          </div>
          <template #bottom-bar>
            <ResponsiveWrapper medium large extra-large huge>
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
            <ResponsiveWrapper extra-small small>
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
