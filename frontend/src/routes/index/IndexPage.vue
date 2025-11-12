<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { appRoutes } from '@/main';
import { mdiArrowRight } from '@mdi/js';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import BlobComponent from '@/components/design-system/style/BlobComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent />
    </template>
    <div class="prezident-hero">
      <BlobComponent color="blue" class="blob1" />
      <BlobComponent color="yellow" class="blob2" />
      <BlobComponent color="red" class="blob3" />
      <StackComponent spacing="small" centered class="calc-main">
        <section class="current-version-hero">
          <CardComponent style="max-width: 48rem; text-align: center;">
            <StackComponent spacing="medium" centered>
              <HeadlineText tag="h1" size="medium" color="fg-strong">
                TestVot-ul nou este disponibil!
              </HeadlineText>
              <BodyText size="medium" centered>
                Aceasta este o arhivă a TestVot pentru alegerile prezidențiale 2025.
                <strong>TestVot-ul actual îl găsiți la
                <a href="https://www.testvot.eu" target="_blank" rel="noopener noreferrer">www.testvot.eu</a></strong>
              </BodyText>
              <ButtonComponent
                kind="filled"
                color="primary"
                tag="a"
                href="https://www.testvot.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mergi la TestVot-ul actual
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </StackComponent>
          </CardComponent>
        </section>
        <HeadlineText tag="p" size="small">
          Arhivă 2025
        </HeadlineText>
        <StackComponent class="section" spacing="large" centered>
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  TestVot 2025 alegeri prezidențiale
                </TitleText>
              </div>
              <ButtonComponent
                kind="outlined"
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
                Pornește versiunea arhivată
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </div>
          </CardComponent>
        </StackComponent>
      </StackComponent>
    </div>
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
    right: 35%;
  }

  .blob3 {
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
  }
}

.section {
  padding: 40px 0;
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
  max-width: 400px;
}

.current-version-hero {
  padding: 40px 24px;
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>
