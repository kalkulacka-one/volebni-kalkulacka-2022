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
            <strong>Die Europawahl in Österreich</strong
            ><br />
            9. Juni 2024
            <br />
          </BodyText>
          <HeadlineText tag="p" size="small">
            Europawahl
            <span style="color: rgb(var(--color-neutral-fg))"> 2024 </span>
          </HeadlineText>
          <BodyText size="small"> 42 Fragen, ca. 10 Minuten</BodyText>
          <ButtonComponent
            kind="filled"
            color="primary"
            @click="
              router.push({
                name: appRoutes.guide.name,
                params: {
                  ...route.params,
                  type: `${'wahlen'}`,
                  first: 'europawahl-2024',
                  second: 'wahlrechner',
                },
                query: { ...route.query },
              })
            "
          >
            Start des Wahlrechners
            <template #iconAfter>
              <IconComponent :icon="mdiArrowRight" />
            </template>
          </ButtonComponent>
        </StackComponent>
        <BodyText size="large">—</BodyText>
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
                <strong>Wahlrechner Express</strong>
              </BodyText>
              <BodyText size="small">
                25 Fragen, ca. 5 Minuten
              </BodyText>
              <ButtonComponent
                kind="outlined"
                color="primary"
                @click="
                  router.push({
                    name: appRoutes.guide.name,
                    params: {
                      ...route.params,
                      type: `${'wahlen'}`,
                      first: 'europawahl-2024',
                      second: 'express',
                    },
                    query: { ...route.query },
                  })
                "
              >
                Start des Wahlrechners
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </StackComponent>
          </StackComponent>
        </CardComponent>
      </StackComponent>
    </div>
    <StaticContentLayout>
      <StackComponent class="section" spacing="small" centered>
        <TitleText size="large" tag="h2"
          >Wer steht hinter dem Wahlrechner?</TitleText
        >
        <BodyText size="medium"
          >Wahlrechner.at ist eine zivilgesellschaftliche Initiative der Organisationen KohoVolit.eu, wahlbeobachtung.org, PolEdu - Politics & Education, Bizeps, Vokskabin.hu/Andrássy Universität Budapest und dem Gründungsverein Österreichische Demokratiestiftung. Es handelt sich um ein überparteiliches Instrument, das Wählerinnen und Wählern dabei helfen soll, sich vor der Europawahl 2024 umfassend über die Positionen der kandidierenden Parteien zu informieren.</BodyText
        >
        <div class="info-bubbles-grid section">
          <InfoBubble image="info-1.png">
            <BodyText size="small"
              >Wir stellen etwa 50 Fragen zu aktuellen politischen Themen..
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-2.png">
            <BodyText size="small"
              >Wir befragen die wahlwerbenden Parteien.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-3.png">
            <BodyText size="small"
              >Und die Parteien antworten.
            </BodyText>
          </InfoBubble>
          <InfoBubble image="info-4.png">
            <BodyText size="small"
              >Der Wahlrechner berechnet die Übereinstimmung mit Ihren Antworten.</BodyText
            >
          </InfoBubble>
        </div>
      </StackComponent>
      <StackComponent class="section" spacing="large" centered>
        <BodyText size="medium"
          >Der Wahlrechner ist ein reiner Informationsdienst und dient nicht dazu, konkrete Wahlempfehlungen abzugeben.
        </BodyText>
        <ButtonComponent kind="link" @click="router.push('/uber-den-wahlrechner')">
          <div class="button-content">
            Mehr herausfinden<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <section class="subscribe">
        <StackComponent spacing="small" centered>
          <TitleText size="large" tag="h2">
            Möchten Sie über neue Rechner informiert werden?
          </TitleText>
          <BodyText size="small" centered>
            Hinterlassen Sie uns Ihre E-Mail-Adresse und wir informieren Sie immer, wenn wir einen neuen Rechner starten.
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
                Senden
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

.subscribe {
  padding-top: 40px;
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>
