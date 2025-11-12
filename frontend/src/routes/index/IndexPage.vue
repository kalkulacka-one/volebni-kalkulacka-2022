<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { appRoutes } from '@/main';

import { mdiArrowDown, mdiArrowRight, mdiEmailOutline } from '@mdi/js';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BlobComponent from '@/components/design-system/style/BlobComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import FormComponent from '@/components/design-system/input/FormComponent.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import MasonryGrid from '@/components/design-system/layout/MasonryGrid.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';

const router = useRouter();
const route = useRoute();
const info = ref<HTMLElement | null>(null);
const scrollDown = () => info.value?.scrollIntoView({ behavior: 'smooth' });

const { t, locale } = useI18n();

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
          <StackComponent spacing="large" centered space-between style="text-align: center;">
            <BodyText size="medium" tag="h1" color="fg-strong">
            <strong>Voksmonitor Archívum 2024</strong
            ><br />
            Európai parlamenti & önkormányzati választások
            <br />
          </BodyText>
          <HeadlineText tag="p" size="small">
            Archívum
            <span style="color: rgb(var(--color-neutral-fg))"> 2024 </span>
          </HeadlineText>
        </StackComponent>

    <section class="current-version-hero">
      <StackComponent spacing="medium" centered>
        <CardComponent style="max-width: 48rem; text-align: center;">
          <StackComponent spacing="medium" centered>
            <HeadlineText tag="h1" size="medium" color="fg-strong">
              Új Voksmonitor!
            </HeadlineText>
            <BodyText size="medium" centered>
              Ez a 2024-es Voksmonitor archívuma. <strong>Az aktuális Voksmonitor elérhető a <a href="https://www.voksmonitor.hu" target="_blank" rel="noopener noreferrer">www.voksmonitor.hu</a> címen</strong>
            </BodyText>
            <ButtonComponent
              kind="filled"
              color="primary"
              size="medium"
              tag="a"
              href="https://www.voksmonitor.hu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <template #icon>
                <IconComponent :icon="mdiArrowRight" />
              </template>
              Menj az aktuális Voksmonitorra
            </ButtonComponent>
            <BodyText size="small" color="fg-muted" centered>
              Ezen az archív oldalon megtalálod a 2024-es európai parlamenti és önkormányzati választások Voksmonitorait
            </BodyText>
          </StackComponent>
        </CardComponent>
      </StackComponent>
    </section>

        <StackComponent class="section" spacing="large" centered>
          <ButtonComponent kind="link" @click="scrollDown">
            <div class="button-content">
              Archív Voksmonitorok megtekintése<IconComponent
                :icon="mdiArrowDown"
              ></IconComponent>
            </div>
          </ButtonComponent>
        </StackComponent>
      </StackComponent>
    </div>
    <StaticContentLayout>
      <StackComponent class="section" spacing="small" centered>
        <TitleText size="large" tag="h2">Hogyan készül a Voksmonitor?</TitleText>
        <BodyText size="medium"
          >A Voksmonitor a K-Monitor és a KohoVolit.eu nonprofit szervezetek közös projektje, ami a pártok programjára alapozva segít mérlegelni, hogy kire szavazzon.</BodyText
        >
        <div class="info-bubbles-grid section">
          <InfoBubble image="info-1.png">
            <BodyText size="small"
              > A kérdőív körülbelül 40 kérdésben méri fel a kitöltő álláspontját aktuális európai politikai témákról.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-2.png">
            <BodyText size="small"
              >A kérdéseket minden listát állító, érdemi támogatottsággal rendelkező pártnak feltettük.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-3.png">
            <BodyText size="small"
              >A válaszaikat összevetjük az Ön válaszaival.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-4.png">
            <BodyText size="small"
              >A Voksmonitor pedig kiszámolja, hogy Ön mennyire ért velük egyet.
</BodyText
            >
          </InfoBubble>
        </div>
      </StackComponent>
      <StackComponent class="section" spacing="large" centered>
        <BodyText size="medium"
          >A Voksmonitor célja a tájékoztatás és a választói mérlegelés segítése. A végső döntést a szavazófülkében Ön hozza meg.
        </BodyText>
        <ButtonComponent kind="link" tag="a" href="/a-voksmonitorrol">
          <div class="button-content">
            Tudjon meg többet!<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <StackComponent spacing="large">
        <div ref="info"></div>
        <TitleText size="large" tag="h2">
          Lezajlott választások Voksmonitorjai
        </TitleText>
        <MasonryGrid style="align-self: stretch">
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  Európai parlamenti voksmonitor 2024
                </TitleText>
                <BodyText size="medium"
                  >Európai parlamenti választások, 40 kérdés, kb. 10 perc</BodyText
                >
              </div>
              <ButtonComponent
                kind="filled"
                color="primary"
                @click="
                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      type: `${'valasztasok'}`,
                      first: 'europai-2024',
                      second: 'voksmonitor',
                    },
                    query: { ...route.query },
                  })
                "
              >
                A Voksmonitor elindítása
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  European Parliament Voksmonitor 2024
                </TitleText>
                <BodyText size="medium"
                  >European Parliament elections, 40 questions, approx. 10 minutes</BodyText
                >
              </div>
              <ButtonComponent
                kind="outlined"
                color="primary"
                @click="
                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      type: `${'valasztasok'}`,
                      first: 'europai-2024',
                      second: 'english',
                    },
                    query: { ...route.query },
                  })
                "
              >
                Launch Voksmonitor
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  Budapest önkormányzati választások 2024
                </TitleText>
                <BodyText size="medium"
                  >Budapest főpolgármester választás, 38 kérdés, nagyjából 8-10 perc</BodyText
                >
              </div>
              <ButtonComponent
                kind="filled"
                color="primary"
                @click="
                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      type: `${'valasztasok'}`,
                      first: 'onkormanyzati-2024',
                      second: 'budapest',
                    },
                    query: { ...route.query },
                  })
                "
              >
                A Voksmonitor elindítása
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  Budapest municipal elections 2024
                </TitleText>
                <BodyText size="medium"
                  >Budapest mayoral elections, 38 questions, approx. 8-10 minutes</BodyText
                >
              </div>
              <ButtonComponent
                kind="outlined"
                color="primary"
                @click="
                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      type: `${'valasztasok'}`,
                      first: 'onkormanyzati-2024',
                      second: 'budapest-english',
                    },
                    query: { ...route.query },
                  })
                "
              >
                Launch Voksmonitor
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  Debrecen önkormányzati választások 2024
                </TitleText>
                <BodyText size="medium"
                  >Debrecen polgármester választás, 23 kérdés, nagyjából 5-7 perc</BodyText
                >
              </div>
              <ButtonComponent
                kind="filled"
                color="primary"
                @click="
                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      type: `${'valasztasok'}`,
                      first: 'onkormanyzati-2024',
                      second: 'debrecen',
                    },
                    query: { ...route.query },
                  })
                "
              >
                A Voksmonitor elindítása
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
        </MasonryGrid>
      </StackComponent>
      <DonateBlock />
    </StaticContentLayout>
    <FooterMultiWord class="section" />
  </StickyHeaderLayout>
</template>

<style scoped lang="scss">
.prezident-hero {
  box-sizing: border-box;
  background-image: radial-gradient(
      at 10% 10%,
      rgba(var(--color-primary-bg-container), 50%) 0px,
      transparent 50%
    ),
    radial-gradient(
      at 90% 90%,
      rgba(var(--color-secondary-bg-container), 50%) 0px,
      transparent 50%
    );
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 80px 16px;

  .calc-main {
    width: 100%;
    max-width: 800px;
  }

  @media (min-width: 600px) {
    padding: 120px 48px;
  }
}

.current-version-hero {
  padding: 40px 0;
}

.other-calc-card {
  max-width: 400px;
  width: 100%;

  @media (min-width: 768px) {
    flex: 1;
    min-width: 300px;
    max-width: 48%;
  }
}

.calc-main > div:first-child {
  z-index: 1;
}

.blob1 {
  position: absolute;
  top: 0;
  left: 0;
}

.blob2 {
  position: absolute;
  bottom: 0;
  right: 0;
}

.section {
  padding: 40px 0;
}

.button-content {
  display: flex;
  flex-direction: row;
  align-items: center;
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
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.card-content-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider {
  height: 1px;
  width: 100%;
  background-color: rgb(var(--color-neutral-bg-container));
}
</style>

<style lang="scss">
.calc-youth {
  .corner path {
    fill: rgb(var(--color-primary-bg-container)) !important;
  }
}

.calc-express {
  .corner path {
    fill: rgb(var(--color-secondary-bg-container)) !important;
  }
}
</style>
