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
  }

  @media (min-width: 992px) {
    .calc-main {
      grid-column: 3/11;
    }
  }

  @media (min-width: 1200px) {
    .calc-main {
      grid-column: 4/10;
    }
  }
}
</style>
