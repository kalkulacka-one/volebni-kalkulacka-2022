<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { appRoutes } from '@/main';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import BackgroundComponent from '../../components/design-system/style/BackgroundComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import { mdiArrowDown, mdiArrowRight } from '@mdi/js';
import InfoBubble from '@/components/InfoBubble.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import MasonryGrid from '@/components/design-system/layout/MasonryGrid.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';

const router = useRouter();
const route = useRoute();
</script>

<script lang="ts">
import { ref } from 'vue';

const info = ref<HTMLElement | null>(null);
export default {
  methods: {
    scrollDown() {
      info.value?.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar background="transparent" />
      </template>
      <StaticContentLayout>
        <div class="section-header section">
          <CardComponent
            padding="small"
            background-color="transparent"
            corner="top-left"
          >
            <div class="card-content">
              <HeadlineText tag="h1" size="medium">
                Volební kalkulačka pro prezidentské volby?
              </HeadlineText>
              <div class="card-content-text">
                <BodyText size="medium">
                  Volební kalkulačku pro prezidentské volby, které proběhnou
                  <b>13.&nbsp;a&nbsp;14.&nbsp;ledna 2023</b>, pro vás právě
                  chystáme a&nbsp;spustíme ji před Vánoci.
                </BodyText>
                <ButtonComponent
                  kind="link"
                  color="primary"
                  tag="a"
                  href="https://twitter.com/intent/follow?screen_name=ceskodigital"
                  style="align-self: start"
                >
                  Sledovat Česko.Digital na Twitteru
                </ButtonComponent>
              </div>
            </div>
          </CardComponent>
          <CardComponent padding="small" corner="top-left" border shadow>
            <div class="card-content">
              <TitleText tag="h2" size="large">Kdo kandiduje</TitleText>
              <BodyText size="medium">
                25. listopadu Ministerstvo vnitra zveřejnilo seznam kandidátů,
                kteří splnili zákonné podmínky a budou se ucházet o funkci
                prezidenta:
                <ul>
                  <li>Andrej Babiš</li>
                  <li>Jaroslav Bašta</li>
                  <li>Pavel Fischer</li>
                  <li>Marek Hilšer</li>
                  <li>Danuše Nerudová</li>
                  <li>Petr Pavel</li>
                  <li>Denisa Rohanová</li>
                  <li>Josef Středula</li>
                  <li>Tomáš Zima</li>
                </ul>
                Více o kandidátech se dozvíte na
                <a href="https://prezident2023.programydovoleb.cz">
                  programydovoleb.cz
                </a>
                .
              </BodyText>
            </div>
          </CardComponent>
        </div>

        <StackComponent class="section" spacing="large" centered>
          <BodyText size="medium"
            >Zjistěte během 10 minut, s jakými politiky se názorově shodujete v
            aktuálních otázkách.</BodyText
          >
          <ButtonComponent kind="link" @click="scrollDown"
            ><div class="button-content">
              Více o kalkulačce<IconComponent
                :icon="mdiArrowDown"
              ></IconComponent></div
          ></ButtonComponent>
        </StackComponent>
        <StackComponent class="section" spacing="small" centered>
          <div ref="info"></div>
          <TitleText size="large" tag="h2">Jak kalkulačka vzniká?</TitleText>
          <BodyText size="medium"
            >Volební kalkulačka je projekt neziskové organizace KohoVolit.eu a
            je nestranným pomocníkem při Vašem rozhodování koho volit.</BodyText
          >
          <div class="info-bubbles-grid section">
            <InfoBubble image="info-1.png">
              <BodyText size="small"
                >Připravíme zhruba 40 otázek na aktuální politická
                témata.</BodyText
              >
            </InfoBubble>
            <InfoBubble image="info-2.png">
              <BodyText size="small"
                >Otázky položíme všem kandidátům / stranám.</BodyText
              >
            </InfoBubble>
            <InfoBubble image="info-3.png">
              <BodyText size="small"
                >Dostaneme od většiny z nich odpovědi.</BodyText
              >
            </InfoBubble>
            <InfoBubble image="info-4.png">
              <BodyText size="small"
                >Volební kalkulačka vám s nimi spočítá názorovou
                shodu.</BodyText
              >
            </InfoBubble>
          </div>
        </StackComponent>
        <StackComponent class="section" spacing="large" centered>
          <BodyText size="medium"
            >Volební kalkulačka je pouze informační služba a není jejím cílem
            dávat konkrétní volební doporučení.</BodyText
          >
          <ButtonComponent kind="link" @click="router.push('/o-nas')"
            ><div class="button-content">
              Zjistit více<IconComponent
                :icon="mdiArrowRight"
              ></IconComponent></div
          ></ButtonComponent>
        </StackComponent>
        <DonateBlock />
        <StackComponent spacing="large">
          <TitleText size="large" tag="h2">
            Volební kalkulačky k už proběhlým volbám
          </TitleText>
          <MasonryGrid style="align-self: stretch">
            <CardComponent corner="top-right" padding="small" border shadow>
              <div class="card-content">
                <div class="card-content-text">
                  <TitleText tag="h3" size="medium"
                    >Komunální volby 2022</TitleText
                  >
                  <BodyText size="medium"
                    >K dispozici jsou kalkulačky pro vybraná města.</BodyText
                  >
                  <div class="divider" />
                  <BodyText size="small"
                    >Komunální kalkulačku vyplnilo přes 100 tisíc
                    lidí.</BodyText
                  >
                </div>
                <ButtonComponent
                  kind="outlined"
                  color="primary"
                  @click="
                    router.push({
                      name: appRoutes.districtSelection.name,
                      params: { ...route.params, election: 'komunalni-2022' },
                      query: { ...route.query },
                    })
                  "
                  >Spustit kalkulačku</ButtonComponent
                >
              </div>
            </CardComponent>
            <CardComponent corner="top-left" padding="small" border shadow>
              <div class="card-content">
                <div class="card-content-text">
                  <TitleText tag="h3" size="medium"
                    >Senátní volby 2022</TitleText
                  >
                  <BodyText size="medium"
                    >Pro jednotlivé volební obvody.</BodyText
                  >
                  <BodyText size="medium"
                    ><a
                      href="https://2022.programydovoleb.cz/senatni-volby#kde-se-letos-voli"
                      >Více o senátních obvodech</a
                    ></BodyText
                  >
                </div>
                <div class="divider" />
                <BodyText size="small"
                  >Senátní kalkulačku vyplnilo přes 25 tisíc lidí.</BodyText
                >
                <ButtonComponent
                  color="primary"
                  kind="outlined"
                  @click="
                    router.push({
                      name: appRoutes.districtSelection.name,
                      params: { ...route.params, election: 'senatni-2022' },
                      query: { ...route.query },
                    })
                  "
                  >Spustit kalkulačku</ButtonComponent
                >
              </div>
            </CardComponent>
          </MasonryGrid>
        </StackComponent>
      </StaticContentLayout>
      <FooterMultiWord class="section" />
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style scoped lang="scss">
.section-header {
  display: grid;
  grid-template-columns: 1.2fr repeat(1, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}

.section {
  padding: 40px 0;
}

.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-large);
}

.card {
  max-width: 60rem;
}

.card-election {
  width: 100%;
  max-width: 600px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-content-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: rgb(var(--color-neutral-bg));
}

.button-content {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.info-bubbles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: 478px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
.navigation-bar {
  .grid {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto 1fr;

    @media (max-width: 700px) {
      grid-template-columns: 1fr auto 1fr;
    }

    .title {
      justify-self: center;
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }

    .right {
      justify-content: end;
    }
  }
}
</style>
