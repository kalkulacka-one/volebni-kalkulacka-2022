<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { appRoutes } from '@/main';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import { mdiArrowRight } from '@mdi/js';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import BlobComponent from '@/components/design-system/style/BlobComponent.vue';
import { useUserStore } from '@/stores/userStore';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CheckboxComponent from '@/components/design-system/input/CheckboxComponent.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const info = ref<HTMLElement | null>(null);
const scrollDown = () => info.value?.scrollIntoView({ behavior: 'smooth' });

const hasCheckedPrivacy = ref(false);
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
        <HeadlineText tag="p" size="small">
          Testează-ți votul!
        </HeadlineText>
        <StackComponent class="section" spacing="large" centered>
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">
                  TestVot 2025 alegeri prezidențiale
                </TitleText>
                <BodyText size="medium">
                  Pentru a folosi aplicația trebuie să fii de acord cu <router-link to="/protectia-datelor">politica de confidențialitate</router-link> a datelor.
                </BodyText>
                <CheckboxComponent groupName="privacy" label="Sunt de acord cu politica de confidențialitate" @update:check="checked => hasCheckedPrivacy = checked">
                  Sunt de acord
                </CheckboxComponent>
              </div>
              <ButtonComponent
                :kind="hasCheckedPrivacy ? 'filled' : 'outlined'"
                :color="hasCheckedPrivacy ? 'primary' : 'primary'"
                :readOnly="!hasCheckedPrivacy"
                tag="a"

                @click="() => {
                  if (!hasCheckedPrivacy) return;

                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      election: 'presidential-2025',
                      district: 'global',
                    },
                    query: { ...route.query },
                  })
                }"
              >
                Continuă
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
  max-width: 400px;
}

.card-content-text h3 {
  padding-bottom: 8px;
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
