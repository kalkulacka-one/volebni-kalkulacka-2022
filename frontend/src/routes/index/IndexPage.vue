<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { appRoutes } from '@/main';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
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
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const info = ref<HTMLElement | null>(null);
const scrollDown = () => info.value?.scrollIntoView({ behavior: 'smooth' });
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent with-account :user="user" />
    </template>
    <div class="prezident-hero">
      <BlobComponent color="blue" class="blob1" />
      <BlobComponent color="red" class="blob2" />
      <StackComponent spacing="medium" centered class="calc-main">
        <BodyText size="medium" tag="h1" color="fg-strong">
          <b>Voľby do Národnej rady Slovenskej republiky</b><br />
          30. septembra 2023
          <br />
        </BodyText>
        <HeadlineText tag="p" size="small">
          Parlamentné voľby
          <span style="color: rgb(var(--color-neutral-fg))"> 2023 </span>
        </HeadlineText>
        <BodyText size="medium" tag="h2" color="fg-strong">
          <strong>Inventúra hlasovaní</strong>
        </BodyText>
        <BodyText size="small">
          Volebná kalkulačka na základe skutočných hlasovaní z Národnej rady
          2020–2023
        </BodyText>
        <ButtonComponent
          kind="filled"
          color="primary"
          tag="a"
          @click="
            router.push({
              name: appRoutes.guide.name,
              params: {
                ...route.params,
                election: 'prezidentske-2023',
                district: 'pro-kazdeho-2-kolo',
              },
              query: { ...route.query },
            })
          "
        >
          Spústiť inventúru hlasovaní

          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <div class="other-calcs">
        <CardComponent
          corner="bottom-left"
          padding="large"
          border
          border-radius="large"
          shadow
          class="other-calc-card calc-ultimate"
        >
          <StackComponent spacing="small" centered space-between>
            <BodyText size="medium" tag="h2" color="fg-strong">
              <strong>Volebná kalkulačka 2023</strong>
            </BodyText>
            <BodyText size="small">
              Klasická volebná kalkulačka pre voľby 2023.<br /><i
                >Spustíme počiatkom septembra.</i
              >
            </BodyText>
            <ButtonComponent
              readOnly
              disabled
              kind="outlined"
              color="primary"
              @click="
                router.push({
                  name: appRoutes.guide.name,
                  params: {
                    ...route.params,
                    election: 'prezidentske-2023',
                    district: 'pro-nadsence',
                  },
                  query: { ...route.query },
                })
              "
            >
              Již brzy
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </StackComponent>
        </CardComponent>
        <CardComponent
          corner="top-left"
          padding="large"
          border
          border-radius="large"
          shadow
          class="other-calc-card calc-youth"
        >
          <StackComponent spacing="small" centered space-between>
            <BodyText size="medium" tag="h2" color="fg-strong">
              <strong>Kalkulačka pre mladé</strong>
            </BodyText>
            <BodyText size="small">
              Otázky, ktoré rezonujú mladou generáciou. <br /><i
                >Spustíme počiatkom septembra.</i
              >
            </BodyText>
            <ButtonComponent
              readOnly
              disabled
              kind="outlined"
              color="primary"
              @click="
                router.push({
                  name: appRoutes.guide.name,
                  params: {
                    ...route.params,
                    election: 'prezidentske-2023',
                    district: 'pro-mlade',
                  },
                  query: { ...route.query },
                })
              "
            >
              Již brzy
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </StackComponent>
        </CardComponent>
      </div>
    </div>

    <StaticContentLayout>
      <StackComponent class="section" spacing="small" centered>
        <TitleText size="large" tag="h2">Ako vzniká kalkulačka?</TitleText>
        <BodyText size="medium"
          >Volebná kalkulačka je projektom neziskovej organizácie KohoVolit.eu a
          je nestranným pomocníkom pri vašom rozhodovaní, koho voliť.</BodyText
        >
        <div class="info-bubbles-grid section">
          <InfoBubble image="info-1.png">
            <BodyText size="small"
              >Prípravíme približne 40 otázok na aktuálne politické témy.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-2.png">
            <BodyText size="small"
              >Otázky položíme všetkým kandidátom / stranám.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-3.png">
            <BodyText size="small"
              >Z väčšiny z nich dostaneme odpovede.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-4.png">
            <BodyText size="small"
              >Volebná kalkulačka vám s nimi vypočíta zhodu názorov.</BodyText
            >
          </InfoBubble>
        </div>
      </StackComponent>
      <StackComponent class="section" spacing="large" centered>
        <BodyText size="medium"
          >Volebná kalkulačka je len informačnou službou a jej cieľom nie je
          poskytovať konkrétne volebné odporúčania.
        </BodyText>
        <ButtonComponent kind="link" @click="router.push('/o-nas')">
          <div class="button-content">
            Zistiť viac<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <DonateBlock />
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
      grid-column: 4/10;
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
</style>
