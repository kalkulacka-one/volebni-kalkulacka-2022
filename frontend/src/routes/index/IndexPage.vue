<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { appRoutes } from '@/main';
import { fetchElections } from '@/common/dataFetch';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
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
import Footer from '@/components/Footer.vue';

const router = useRouter();
const route = useRoute();

const elections = await fetchElections();
</script>

<script lang="ts">
export default {
  methods: {
    scrollDown() {
      this.$refs.info.$el.scrollIntoView({ behavior: 'smooth' });
    },
  },
  created() {
    eval(`+function(w, d, s, u, a, b) {
          w["DarujmeObject"] = u;
          w[u] = w[u] || function () { (w[u].q = w[u].q || []).push(arguments) };
          a = d.createElement(s); b = d.getElementsByTagName(s)[0];
          a.async = 1; a.src = "https:\/\/www.darujme.cz\/assets\/scripts\/widget.js";
          b.parentNode.insertBefore(a, b);
        }(window, document, "script", "Darujme");
    Darujme(1, "w2acrk0w61fgr3so", 'render', "https:\/\/www.darujme.cz\/widget?token=w2acrk0w61fgr3so", "100%");`);
  },
};
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent />
      </template>
      <div class="content">
        <div class="section-header section">
          <CardComponent
            padding="small"
            background-color="transparent"
            corner="top-left"
          >
            <div class="card-content">
              <HeadlineText tag="h1" size="medium"
                >Aktuální volební kalkulačky</HeadlineText
              >
              <div class="card-content-text">
                <BodyText size="medium"
                  >pro nadcházející komunální a senátní volby
                  <b>23. 9. 2022 –24. 9. 2022</b></BodyText
                >
                <ButtonComponent kind="link" color="primary"
                  >Více o volbách</ButtonComponent
                >
              </div>
            </div>
          </CardComponent>
          <CardComponent corner="top-right" padding="small" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium"
                  >Komunální volby 2022</TitleText
                >
                <BodyText size="medium"
                  >K dispozici jsou kalkulačky pro 35 největších měst.</BodyText
                >
                <div class="divider" />
                <BodyText size="small">Dnes vyplnilo 12 678 občanů</BodyText>
              </div>
              <ButtonComponent
                kind="filled"
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
                <TitleText tag="h3" size="medium">Senátní volby 2022</TitleText>
                <BodyText size="medium"
                  >Pro jednotlivé volební obvody.</BodyText
                >
                <BodyText size="medium"
                  ><a href="https://google.com"
                    >Více o senátních obvodech</a
                  ></BodyText
                >
              </div>
              <div class="divider" />
              <BodyText size="small">Dnes vyplnilo 12 678 občanů</BodyText>
              <ButtonComponent
                kind="filled"
                color="primary"
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
          <TitleText size="large" tag="h2" ref="info"
            >Jak kalkulačka vzniká?</TitleText
          >
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
          <ButtonComponent kind="link"
            ><div class="button-content">
              Zjistit více<IconComponent
                :icon="mdiArrowRight"
              ></IconComponent></div
          ></ButtonComponent>
        </StackComponent>

        <div class="section-donation section">
          <StackComponent spacing="small">
            <TitleText size="large" tag="h2"
              >Podpořte tvorbu kalkulaček</TitleText
            >
            <BodyText size="medium"
              >Líbí se vám projekt Volební kalkulačka? Budeme rádi pokud nás
              podpoříte a umožníte nám pokračovat v jejich tvorbě.</BodyText
            >
          </StackComponent>
          <div data-darujme-widget-token="w2acrk0w61fgr3so">&nbsp;</div>
        </div>
      </div>
      <Footer class="section" />
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style scoped lang="scss">
.section-header {
  display: grid;
  grid-template-columns: 1.2fr repeat(2, 1fr);
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

.section-donation {
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
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

.content {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
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
</style>
