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

import { useUserStore } from '@/stores/userStore';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const info = ref<HTMLElement | null>(null);
const scrollDown = () => info.value?.scrollIntoView({ behavior: 'smooth' });

const { t, locale } = useI18n();

const email = ref('');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

const handleSubscribe = async () => {
  console.log('handleSubmit');
  if (email.value === '') {
    emailError.value = t('routes.index.IndexPage.empty-email-error');
    return;
  } else {
    emailError.value = undefined;
  }

  posting.value = true;

  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value }),
  });

  if (response.ok) {
    posting.value = false;
    success.value = true;
    message.value = t('routes.index.IndexPage.success');
  } else {
    posting.value = false;
    success.value = false;
    message.value = t('routes.index.IndexPage.error');
  }
};
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent with-account :user="user" />
    </template>
    <div class="prezident-hero">
      <BlobComponent color="blue" class="blob1" />
      <BlobComponent color="red" class="blob2" />
      <StackComponent spacing="small" centered class="calc-main">
        <StackComponent spacing="large" centered space-between>
          <BodyText size="medium" tag="h1" color="fg-strong">
            <strong>Európai parlamenti & önkormányzati választás Magyarországon</strong
            ><br />
            2024 június 9.
            <br />
          </BodyText>
          <HeadlineText tag="p" size="small">
            Európai parlamenti & Fővárosi polgármester választás
            <span style="color: rgb(var(--color-neutral-fg))"> 2024 </span>
          </HeadlineText>
          <ResponsiveWrapper extra-small small>
            <StackComponent spacing="large">
              <CardComponent
                corner="bottom-left"
                padding="large"
                border
                border-radius="large"
                shadow
                class="other-calc-card calc-youth"
              >
                <StackComponent spacing="large" centered>
                  <StackComponent spacing="small" centered space-between>
                    <BodyText size="medium" tag="h2" color="fg-strong">
                      <strong>Európai parlamenti voksmonitor</strong>
                    </BodyText>
                    <BodyText size="small">
                      40 kérdés, nagyjából 10 perc
                    </BodyText>
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
                    English version
                      <template #iconAfter>
                        <IconComponent :icon="mdiArrowRight" />
                      </template>
                    </ButtonComponent>
                  </StackComponent>
                </StackComponent>
              </CardComponent>
              <CardComponent
                corner="bottom-left"
                padding="large"
                border
                border-radius="large"
                shadow
                class="other-calc-card calc-youth"
              >
                <StackComponent spacing="large" centered>
                  <StackComponent spacing="small" centered space-between>
                    <BodyText size="medium" tag="h2" color="fg-strong">
                      <strong>Főpolgármesteri voksmonitor</strong>
                    </BodyText>
                    <BodyText size="small">
                      38 kérdés, nagyjából 8-10 perc
                    </BodyText>
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
                    English version
                      <template #iconAfter>
                        <IconComponent :icon="mdiArrowRight" />
                      </template>
                    </ButtonComponent>
                  </StackComponent>
                </StackComponent>
              </CardComponent>
            </StackComponent>
          </ResponsiveWrapper>
          <ResponsiveWrapper medium large extra-large huge>
            <StackComponent horizontal spacing="large">
              <CardComponent
                corner="bottom-left"
                padding="large"
                border
                border-radius="large"
                shadow
                class="other-calc-card calc-youth"
              >
                <StackComponent spacing="large" centered>
                  <StackComponent spacing="small" centered space-between>
                    <BodyText size="medium" tag="h2" color="fg-strong">
                      <strong>Európai parlamenti voksmonitor</strong>
                    </BodyText>
                    <BodyText size="small">
                      40 kérdés, nagyjából 10 perc
                    </BodyText>
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
                    English version
                      <template #iconAfter>
                        <IconComponent :icon="mdiArrowRight" />
                      </template>
                    </ButtonComponent>
                  </StackComponent>
                </StackComponent>
              </CardComponent>
              <CardComponent
                corner="bottom-left"
                padding="large"
                border
                border-radius="large"
                shadow
                class="other-calc-card calc-youth"
              >
                <StackComponent spacing="large" centered>
                  <StackComponent spacing="small" centered space-between>
                    <BodyText size="medium" tag="h2" color="fg-strong">
                      <strong>Főpolgármesteri voksmonitor</strong>
                    </BodyText>
                    <BodyText size="small">
                      38 kérdés, nagyjából 8-10 perc
                    </BodyText>
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
                    English version
                      <template #iconAfter>
                        <IconComponent :icon="mdiArrowRight" />
                      </template>
                    </ButtonComponent>
                  </StackComponent>
                </StackComponent>
              </CardComponent>
            </StackComponent>
          </ResponsiveWrapper>
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
        <ButtonComponent kind="link" @click="router.push('/a-voksmonitorrol')">
          <div class="button-content">
            Tudjon meg többet!<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <section class="subscribe">
        <StackComponent spacing="small" centered>
          <TitleText size="large" tag="h2">
            Érdekel a következő Voksmonitor
          </TitleText>
          <BodyText size="small" centered>
            Iratkozz fel és értesítünk, ha új Voksmonitort indítunk
          </BodyText>
          <BodyText v-if="success" size="small">
            {{ message }}
          </BodyText>
          <form v-if="!success">
            <StackComponent
              horizontal
              spacing="small"
              stretched
              wrap
              style="justify-content: center"
            >
              <TextInputComponent
                v-model="email"
                required
                type="email"
                :placeholder="t('routes.index.IndexPage.input-label')"
                :value="email"
                :icon="mdiEmailOutline"
                :disabled="posting"
                :error="emailError"
              />
              <ButtonComponent
                kind="outlined"
                color="primary"
                :loading="posting"
                @click.prevent="handleSubscribe"
              >
                Elküld
              </ButtonComponent>
            </StackComponent>
          </form>
          <BodyText v-if="!success" tag="p" size="small">{{
            $t('routes.index.IndexPage.disclaimer')
          }}</BodyText>
        </StackComponent>
      </section>
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

.subscribe {
  padding-top: 40px;
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>
