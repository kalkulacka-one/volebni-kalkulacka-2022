<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';

import type { DeprecatedElection } from '@/types/election';

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

const title = "Zvolte svůj senátní obvod";
const breadcrumbs = "Senátní volby 2024";
const options = [
  {
    value:  "74-karvina",
    label:  "Karviná (74)"
  },
  {
    value:  "2-sokolov",
    label:  "Sokolov (2)"
  },
  {
    value:  "5-chomutov",
    label:  "Chomutov (5)"
  },
  {
    value:  "8-rokycany",
    label:  "Rokycany (8)"
  },
  {
    value:  "11-domazlice",
    label:  "Domažlice (11)"
  },
  {
    value:  "14-ceske-budejovice",
    label:  "České Budějovice (14)"
  },
  {
    value:  "17-praha-12",
    label:  "Praha 12 (17)"
  },
  {
    value:  "20-praha-4",
    label:  "Praha 4 (20)"
  },
  {
    value:  "23-praha-8",
    label:  "Praha 8 (23)"
  },
  {
    value:  "26-praha-2",
    label:  "Praha 2 (26)"
  },
  {
    value:  "29-litomerice",
    label:  "Litoměřice (29)"
  },
  {
    value:  "32-teplice",
    label:  "Teplice (32)"
  },
  {
    value:  "35-jablonec-nad-nisou",
    label:  "Jablonec nad Nisou (35)"
  },
  {
    value:  "38-mlada-boleslav",
    label:  "Mladá Boleslav (38)"
  },
  {
    value:  "41-benesov",
    label:  "Benešov (41)"
  },
  {
    value:  "44-chrudim",
    label:  "Chrudim (44)"
  },
  {
    value:  "47-nachod",
    label:  "Náchod (47)"
  },
  {
    value:  "50-svitavy",
    label:  "Svitavy (50)"
  },
  {
    value:  "53-trebic",
    label:  "Třebíč (53)"
  },
  {
    value:  "56-breclav",
    label:  "Břeclav (56)"
  },
  {
    value:  "59-brno-mesto",
    label:  "Brno-město (59)"
  },
  {
    value:  "62-prostejov",
    label:  "Prostějov (62)"
  },
  {
    value:  "65-sumperk",
    label:  "Šumperk (65)"
  },
  {
    value:  "68-opava",
    label:  "Opava (68)"
  },
  {
    value:  "71-ostrava-mesto",
    label:  "Ostrava-město (71)"
  },
  {
    value:  "77-vsetin",
    label:  "Vsetín (77)"
  },
  {
    value:  "80-zlin",
    label:  "Zlín (80)"
  }
]

options.sort((a, b) => a.label.localeCompare(b.label));

const selected = ref((route.params.second as string) || null);

const onSubmit = () => {
  console.debug(selected);
  if (selected.value) {
    router.push({
      name: appRoutes.guide.name,
      params: {
        ...route.params,
        type: `${'volby'}`,
        first: 'senatni-2024',
        second: selected.value,
      },
      query: { ...route.query },
    })
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
