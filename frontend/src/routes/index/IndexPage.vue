<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { appRoutes } from '@/main';

import { mdiArrowDown, mdiArrowRight } from '@mdi/js';

import BlobComponent from '@/components/design-system/style/BlobComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import MasonryGrid from '@/components/design-system/layout/MasonryGrid.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

const router = useRouter();
const route = useRoute();
const info = ref<HTMLElement | null>(null);
const scrollDown = () => info.value?.scrollIntoView({ behavior: 'smooth' });

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
        <StackComponent spacing="large" centered space-between>
          <BodyText size="medium" tag="h1" color="fg-strong">
            <strong>Arhiva TestVot 2025</strong><br />
            Alegeri prezidențiale în România
            <br />
          </BodyText>
          <HeadlineText tag="p" size="small">
            Arhivă
            <span style="color: rgb(var(--color-neutral-fg))"> 2025 </span>
          </HeadlineText>
        </StackComponent>

        <section class="current-version-hero">
          <StackComponent spacing="medium" centered>
            <CardComponent style="max-width: 48rem; text-align: center;">
              <StackComponent spacing="medium" centered>
                <HeadlineText tag="h1" size="medium" color="fg-strong">
                  TestVot-ul nou este disponibil!
                </HeadlineText>
                <BodyText size="medium" centered>
                  Aceasta este o arhivă a TestVot pentru alegerile prezidențiale din România 2025. <strong>TestVot-ul actual îl găsiți la <a href="https://www.testvot.eu" target="_blank" rel="noopener noreferrer">www.testvot.eu</a></strong>
                </BodyText>
                <ButtonComponent
                  kind="filled"
                  color="primary"
                  size="medium"
                  tag="a"
                  href="https://www.testvot.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <template #icon>
                    <IconComponent :icon="mdiArrowRight" />
                  </template>
                  Mergi la TestVot-ul actual
                </ButtonComponent>
                <BodyText size="small" color="fg-muted" centered>
                  Pe această pagină de arhivă veți găsi TestVot pentru alegerile prezidențiale 2025
                </BodyText>
              </StackComponent>
            </CardComponent>
          </StackComponent>
        </section>

        <StackComponent class="section" spacing="large" centered>
          <ButtonComponent kind="link" @click="scrollDown">
            <div class="button-content">
              Arată calculatoare arhivate<IconComponent
                :icon="mdiArrowDown"
              ></IconComponent>
            </div>
          </ButtonComponent>
        </StackComponent>
      </StackComponent>
    </div>
    <StaticContentLayout>
      <StackComponent class="section" spacing="small" centered>
        <TitleText size="large" tag="h2">Cum se creează calculatorul?</TitleText>
        <BodyText size="medium"
          >TestVot este un proiect al organizației non-profit Median Research Centre (MRC),
          în colaborare cu Open Politics, și este un asistent imparțial în decizia ta de vot.</BodyText
        >
        <div class="info-bubbles-grid section">
          <InfoBubble image="info-1.png">
            <BodyText size="small"
              >Pregătim întrebări despre teme politice actuale.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-2.png">
            <BodyText size="small"
              >Întrebările sunt adresate tuturor candidaților / partidelor.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-3.png">
            <BodyText size="small"
              >Primim răspunsuri de la majoritatea acestora.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-4.png">
            <BodyText size="small"
              >TestVot calculează concordanța ta cu aceștia.</BodyText
            >
          </InfoBubble>
        </div>
      </StackComponent>
      <StackComponent class="section" spacing="large" centered>
        <BodyText size="medium"
          >TestVot este doar un serviciu informativ și nu are scopul de a oferi
          recomandări directe pentru alegeri.
        </BodyText>
        <ButtonComponent kind="link" tag="a" href="https://medianresearch.ro/">
          <div class="button-content">
            Aflați mai multe<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <StackComponent spacing="large">
        <div ref="info"></div>
        <TitleText size="large" tag="h2">
          Calculatoare arhivate
        </TitleText>
        <MasonryGrid style="align-self: stretch">
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  Alegeri prezidențiale 2025
                </TitleText>
                <BodyText size="medium"
                  >Alegeri prezidențiale în România, 2025</BodyText
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
                      election: 'presidential-2025',
                      district: 'global',
                    },
                    query: { ...route.query },
                  })
                "
              >
                Pornește calculatorul
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
        </MasonryGrid>
      </StackComponent>
    </StaticContentLayout>
    <FooterMultiWord class="section" />
  </StickyHeaderLayout>
</template>

<style scoped lang="scss">
.button-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.section {
  padding: 40px 0;
}

.info-bubbles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}

.current-version-hero {
  padding: 40px 0;
  display: grid;
  align-content: center;
  justify-content: center;
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

.prezident-hero {
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  display: grid;
  column-gap: 24px;
  overflow: hidden;
  padding-top: 7%;

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
    display: grid;
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
      grid-column: 2/12;
      margin-bottom: 16px;
    }

    .other-calcs {
      grid-row: 6;
      grid-column: 2/12;
      grid-template-columns: 1fr 1fr;
      padding: 0;
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

.current-version-hero {
  padding: 40px 24px;
  display: grid;
  align-content: center;
  justify-content: center;
  background: rgb(var(--color-primary-bg-container));
}
</style>
