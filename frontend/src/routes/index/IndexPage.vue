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
import BlobComponent from '@/components/design-system/style/BlobComponent.vue';

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
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent />
    </template>
    <div class="prezident-hero">
      <BlobComponent color="blue" class="blob1" />
      <BlobComponent color="red" class="blob2" />
      <StackComponent spacing="medium" centered class="calc-main">
        <BodyText size="large" tag="h1">
          <b>1. kolo prezidentských voleb</b><br>
          13.–14. ledna 2023
          <br>
        </BodyText>
        <HeadlineText tag="p" size="small">
          <span style="color: rgb(var(--color-neutral-fg));">
            9 kandidátů.<br>
          </span>
          Kdo z&nbsp;nich bude reprezentovat<br>vaše&nbsp;názory?
        </HeadlineText>
        <BodyText size="small" tag="h2">
          Základní kalkulačka Prezident 2023<br>40 otázek, cca 10 minut
        </BodyText>
        <ButtonComponent kind="filled" color="primary" tag="a">
          Spustit kalkulačku
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <div class="other-calcs">
        <CardComponent corner="top-left" padding="large" border borderRadius="large" shadow class="other-calc-card calc-youth">
          <StackComponent spacing="small" centered>
            <BodyText size="medium" tag="h2">
              <strong>Kalkulačka pro mladé</strong><br> Prezident 2023
            </BodyText>
            <BodyText size="small">
              Otázky, které rezonují mladou generací.
            </BodyText>
            <ButtonComponent kind="outlined" color="primary" tag="a">
              Spustit kalkulačku
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </StackComponent>
        </CardComponent>
        <CardComponent corner="bottom-left" padding="large" border borderRadius="large" shadow class="other-calc-card calc-ultimate">
          <StackComponent spacing="small" centered>
            <BodyText size="medium" tag="h2">
              <strong>Kalkulačka pro nadšence</strong><br> Prezident 2023
            </BodyText>
            <BodyText size="small">
              Všech 100 otázek, které jsme položili prezidentským kandidátům.
            </BodyText>
            <ButtonComponent kind="outlined" color="primary" tag="a">
              Spustit kalkulačku
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </StackComponent>
        </CardComponent>
      </div>
    </div>

    <StaticContentLayout>
      <div class="section-header section">
        <CardComponent padding="medium" background-color="transparent" corner="top-left">
          <div class="card-content">
            <HeadlineText tag="h1" size="medium">
              Volební kalkulačka pro prezidentské volby
            </HeadlineText>
            <div class="card-content-text">
              <BodyText size="medium">
                Volební kalkulačku pro prezidentské volby, které proběhnou
                <b>13.&nbsp;a&nbsp;14.&nbsp;ledna 2023</b>, pro vás právě
                chystáme.
              </BodyText>
              <ButtonComponent kind="link" color="primary" tag="a"
                href="https://twitter.com/intent/follow?screen_name=ceskodigital" style="align-self: start">
                Sledovat Česko.Digital na Twitteru
              </ButtonComponent>
            </div>
          </div>
        </CardComponent>
        <CardComponent padding="medium" corner="top-left" border shadow>
          <div class="card-content">
            <TitleText tag="h2" size="large">Kdo kandiduje</TitleText>
            <BodyText size="medium">
              Ministerstvo vnitra zveřejnilo seznam kandidátů, kteří splnili
              zákonné podmínky a budou se ucházet o funkci prezidenta:
              <ul>
                <li>Andrej Babiš</li>
                <li>Jaroslav Bašta</li>
                <li>Karel Diviš</li>
                <li>Pavel Fischer</li>
                <li>Marek Hilšer</li>
                <li>Danuše Nerudová</li>
                <li>Petr Pavel</li>
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
        <BodyText size="medium">Zjistěte během 10 minut, s jakými politiky se názorově shodujete v&nbsp;aktuálních
          otázkách.</BodyText>
        <ButtonComponent kind="link" @click="scrollDown">
          <div class="button-content">
            Více o kalkulačce<IconComponent :icon="mdiArrowDown"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <StackComponent class="section" spacing="small" centered>
        <div ref="info"></div>
        <TitleText size="large" tag="h2">Jak kalkulačka vzniká?</TitleText>
        <BodyText size="medium">Volební kalkulačka je projekt neziskové organizace KohoVolit.eu a
          je nestranným pomocníkem při Vašem rozhodování koho volit.</BodyText>
        <div class="info-bubbles-grid section">
          <InfoBubble image="info-1.png">
            <BodyText size="small">Připravíme zhruba 40 otázek na aktuální politická
              témata.</BodyText>
          </InfoBubble>
          <InfoBubble image="info-2.png">
            <BodyText size="small">Otázky položíme všem kandidátům / stranám.</BodyText>
          </InfoBubble>
          <InfoBubble image="info-3.png">
            <BodyText size="small">Dostaneme od většiny z nich odpovědi.</BodyText>
          </InfoBubble>
          <InfoBubble image="info-4.png">
            <BodyText size="small">Volební kalkulačka vám s nimi spočítá názorovou
              shodu.</BodyText>
          </InfoBubble>
        </div>
      </StackComponent>
      <StackComponent class="section" spacing="large" centered>
        <BodyText size="medium">Volební kalkulačka je pouze informační služba a není jejím cílem
          dávat konkrétní volební doporučení.</BodyText>
        <ButtonComponent kind="link" @click="router.push('/o-nas')">
          <div class="button-content">
            Zjistit více<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <DonateBlock />
      <StackComponent spacing="large">
        <TitleText size="large" tag="h2">
          Volební kalkulačky k už proběhlým volbám
        </TitleText>
        <MasonryGrid style="align-self: stretch">
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">Komunální volby 2022</TitleText>
                <BodyText size="medium">K dispozici jsou kalkulačky pro vybraná města.</BodyText>
                <div class="divider" />
                <BodyText size="small">Komunální kalkulačku vyplnilo přes 100 tisíc
                  lidí.</BodyText>
              </div>
              <ButtonComponent kind="outlined" color="primary" @click="
  router.push({
    name: appRoutes.districtSelection.name,
    params: { ...route.params, election: 'komunalni-2022' },
    query: { ...route.query },
  })
">Spustit kalkulačku</ButtonComponent>
            </div>
          </CardComponent>
          <CardComponent corner="top-left" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">Senátní volby 2022</TitleText>
                <BodyText size="medium">Pro jednotlivé volební obvody.</BodyText>
                <BodyText size="medium"><a href="https://2022.programydovoleb.cz/senatni-volby#kde-se-letos-voli">Více o
                    senátních obvodech</a></BodyText>
              </div>
              <div class="divider" />
              <BodyText size="small">Senátní kalkulačku vyplnilo přes 25 tisíc lidí.</BodyText>
              <ButtonComponent color="primary" kind="outlined" @click="
  router.push({
    name: appRoutes.districtSelection.name,
    params: { ...route.params, election: 'senatni-2022' },
    query: { ...route.query },
  })
                  ">Spustit kalkulačku</ButtonComponent>
            </div>
          </CardComponent>
        </MasonryGrid>
      </StackComponent>
    </StaticContentLayout>
    <FooterMultiWord class="section" />
  </StickyHeaderLayout>

</template>

<style scoped lang="scss">
.prezident-hero {
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  display: grid;
  column-gap: 24px;
  overflow: hidden;

  .calc-main {
    text-align: center;
    padding: 24px;
  }

  .other-calcs {
    width: 100%;
    padding: 24px;
    text-align: center;
    display: grid;
    gap: 24px;
  }

  .other-calcs > * {
    width: 100%;
    padding: 16px;
  }

  .blob1 {
    position: absolute;
    left: 10%;
  }

  .blob2 {
    position: absolute;
    right: 10%;
    top: 10%;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));

    .other-calcs {
      display: contents;
      padding: 0;
    }

    .calc-main {
      grid-row: 3/5;
      grid-column: 2/12;
      margin-bottom: 16px;
    }

    .calc-youth,
    .calc-ultimate {
      grid-row: 6/7;
      height: 100%;
    }

    .calc-youth {
      grid-column: 2/7;
    }

    .calc-ultimate {
      grid-column: 7/12;
    }
  }

  @media (min-width: 992px) {
    .calc-youth {
      grid-column: 3/7;
    }

    .calc-ultimate {
      grid-column: 7/11;
    }
  }
  @media (min-width: 1200px) {
    .calc-youth {
      grid-column: 4/7;
    }

    .calc-ultimate {
      grid-column: 7/10;
    }
  }
}

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
