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
import { mdiArrowBottomRight, mdiArrowDown, mdiArrowRight, mdiLink } from '@mdi/js';
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
      <NavigationBar transparent style="position: absolute" />
    </template>
    <div class="prezident-hero">
      <BlobComponent color="blue" class="blob1" />
      <BlobComponent color="red" class="blob2" />
      <div class="avatars">
        <div class="avatar pavel-fischer">
          <img alt="Fotografie – Pavel Fischer"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-10-lossy-page1-1691___up-ccd4-51.jpg" />
        </div>
        <div class="avatar shift jaroslav-basta">
          <img alt="Fotografie – Jaroslav Bašta"
            src="https://data.programydovoleb.cz/lide/uploads/basta-jaroslavjpg___up_1626355989_4fcd45fdffc5edb54030ac215b59b26a.jpg" />
        </div>
        <div class="avatar shift josef-stredula">
          <img alt="Fotografie – Josef Středula"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/12-07-screenshot-2022-___up-4fcd-78.jpg" />
        </div>
        <div class="avatar petr-pavel">
          <img alt="Fotografie – Petr Pavel"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-22-screenshot-2022-___up-ccd4-54.jpg" />
        </div>
        <div class="avatar shift tomas-zima">
          <img alt="Fotografie – Tomáš Zima"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-10-tomas_zima_cropp___up-ccd4-89.jpg" />
        </div>
        <div class="avatar danuse-nerudova">
          <img alt="Fotografie – Danuše Nerudová"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-23-screenshot-2022-___up-ccd4-11.jpg" />
        </div>
        <div class="avatar andrej-babis">
          <img alt="Fotografie – Andrej Babiš"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-10-1920px-andrej_ba___up-ccd4-85.jpg" />
        </div>
        <div class="avatar shift karel-divis">
          <img alt="Fotografie – Karel Diviš"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-25-screenshot-2022-___up-4fcd-80.jpg" />
        </div>
        <div class="avatar shift marek-hilser">
          <img alt="Fotografie – Marek Hilšer"
            src="https://data.programydovoleb.cz/volby/p/2023/kandidat/10-10-marek_hilser_fot___up-ccd4-26.jpg" />
        </div>
      </div>
      <StackComponent spacing="medium" centered class="calc-main">
        <BodyText size="medium" tag="h1">
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
        <BodyText size="small">
          <a href="https://programydovoleb.cz/">Kdo kandiduje (Programy do voleb) </a>
        </BodyText>
      </StackComponent>
      <div class="other-calcs">
        <CardComponent corner="bottom-left" padding="large" border borderRadius="large" shadow
          class="other-calc-card calc-ultimate">
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
        <CardComponent corner="top-left" padding="large" border borderRadius="large" shadow
          class="other-calc-card calc-youth">
          <StackComponent spacing="small" centered>
            <BodyText size="medium" tag="h2">
              <strong>Kalkulačka pro mladé</strong><br> Prezident 2023
            </BodyText>
            <BodyText size="small">
              Otázky, které rezonují mladou generací.<br>Připravilo sdružení Názory politiků.
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
    <StackComponent class="section" spacing="large" centered>
      <ButtonComponent kind="link" @click="scrollDown">
        <div class="button-content">
          Starší kalkulačky<IconComponent :icon="mdiArrowDown"></IconComponent>
        </div>
      </ButtonComponent>
    </StackComponent>

    <StaticContentLayout>
      <StackComponent class="section" spacing="small" centered>
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
        <div ref="info"></div>
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
  padding-top: 10%;

  .avatars {
    display: none;
  }

  .avatar {
    position: relative;
    width: 100%;

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
      padding-left: 100%;
    }

    >img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      left: 0;
      box-shadow: 0px 8px 32px rgba(var(--color-neutral-fg), 0.1);
    }
  }

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

  .other-calcs>* {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

    .calc-main {
      grid-row: 1/6;
      grid-column: 4/10;
      margin-bottom: 16px;
    }

    .other-calcs {
      grid-row: 6;
      grid-column: 2/12;
      grid-template-columns: 1fr 1fr;
      padding: 0;
    }

    .avatars {
      display: contents;

      .avatar.shift {
        top: -50%;
      }

      .pavel-fischer {
        grid-row: 2;
        grid-column: 1;
      }

      .jaroslav-basta {
        grid-row: 3;
        grid-column: 2;
      }

      .josef-stredula {
        grid-row: 4;
        grid-column: 1;
      }

      .petr-pavel {
        grid-row: 4;
        grid-column: 2;
      }

      .tomas-zima {
        grid-row: 4;
        grid-column: 3;
      }

      .danuse-nerudova {
        grid-row: 4;
        grid-column: 10;
      }

      .andrej-babis {
        grid-row: 2;
        grid-column: 11;
      }

      .karel-divis {
        grid-row: 4;
        grid-column: 11;
      }

      .marek-hilser {
        grid-row: 3;
        grid-column: 12;
      }

    }
  }

  @media (min-width: 992px) {
    .other-calcs {
      grid-column: 3/11;
    }
  }

  @media (min-width: 1200px) {
    .other-calcs {
      grid-column: 4/10;
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
