<script setup lang="ts">
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import { mdiEmail, mdiPhone } from '@mdi/js';
import { appRoutes } from '@/main';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="footer-wrapper">
    <div class="content">
      <div class="grid-wrapper">
        <div class="data-1">
          <LogoComponent size="small" text />
          <BodyText size="small">
            TestVot este o aplicație imparțială care poate ajuta în a decide pe cine să votezi.
          </BodyText>
        </div>
        <div class="data-3">
          <StackComponent spacing="medium">
            <TitleText size="small" tag="h5">Despre proiect</TitleText>
            <StackComponent spacing="extra-small">
              <a target="_blank" href="https://medianresearch.ro/">
                <BodyText size="small">
                  Un proiect al Median Research Centre (MRC)
                </BodyText>
              </a>
              <a target="_blank" href="https://www.openpolitics.ro/testvot-alegerile-prezidentiale-2024/"> <!-- TODO25 new link? -->
                <BodyText size="small">
                  Metodologia proiectului
                </BodyText>
              </a>
            </StackComponent>
          </StackComponent>
        </div>
        <div class="data-4">
          <StackComponent spacing="medium">
            <TitleText size="small" tag="h5">Legături (GDPR)</TitleText>
            <StackComponent spacing="extra-small">
              <router-link to="/protectia-datelor">
                <BodyText size="small">Protecția datelor</BodyText>
              </router-link>
            </StackComponent>
          </StackComponent>
        </div>
        <div class="data-5">
          <StackComponent spacing="medium">
            <TitleText size="small" tag="h5">Contact</TitleText>
            <StackComponent spacing="extra-small">
              <a href="mailto:portal@medianresearch.ro">
                <StackComponent spacing="small" centered horizontal>
                  <IconComponent :icon="mdiEmail" />
                  <BodyText size="small">portal@medianresearch.ro</BodyText>
                </StackComponent>
              </a>
            </StackComponent>
          </StackComponent>
        </div>
      </div>
      <div class="logo">
        <BodyText size="small">
          Creat printr-o colaborare a organizațiilor non-profit
        </BodyText>
        <a target="_blank" href="https://kohovolit.eu"><img :src="'/images/logo-kohovolit.svg'"/></a>
        <BodyText size="small">, </BodyText>
        <a href="https://cesko.digital"><img class="cd-logo" :src="'/images/logo-cd.svg'"/></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a:hover {
  text-decoration: underline;
}

a:after {
  content: none;
}
.footer-wrapper {
  background-color: var(--color-neutral-bg);
  width: 100%;
  padding: 40px 0;
}

.content {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: 1.2fr repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 32px;

  @media (max-width: 991px) {
    grid-template-columns: 1.2fr repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}

.data-1 {
  grid-area: 1 / 1 / 2 / 2;

  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 991px) {
    grid-area: 1 / 1 / 3 / 2;
  }

  @media (max-width: 767px) {
    grid-area: 1 / 1 / 2 / 3;
  }
}
.data-2 {
  grid-area: 1 / 2 / 2 / 3;

  @media (max-width: 991px) {
    grid-area: 1 / 2 / 2 / 3;
  }

  @media (max-width: 767px) {
    grid-area: 2 / 1 / 3 / 2;
  }
}
.data-3 {
  grid-area: 1 / 3 / 2 / 4;

  @media (max-width: 991px) {
    grid-area: 1 / 3 / 2 / 4;
  }

  @media (max-width: 767px) {
    grid-area: 2 / 2 / 3 / 3;
  }
}
.data-4 {
  grid-area: 1 / 4 / 2 / 5;

  @media (max-width: 991px) {
    grid-area: 2 / 2 / 3 / 3;
  }

  @media (max-width: 767px) {
    grid-area: 3 / 1 / 4 / 2;
  }
}
.data-5 {
  grid-area: 1 / 5 / 2 / 6;

  @media (max-width: 991px) {
    grid-area: 2 / 3 / 3 / 4;
  }

  @media (max-width: 767px) {
    grid-area: 3 / 2 / 4 / 3;
  }
}

.logo {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-start;
  align-items: center;

  margin-top: 32px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
}

.cd-logo {
  height: 20px;
}
</style>
