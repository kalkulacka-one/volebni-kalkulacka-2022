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
<<<<<<< HEAD
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
// debug
// import { useI18n } from 'vue-i18n';
// const { t, locale } = useI18n();
// locale.value = 'cz';
// end of debug
=======
import BlobComponent from '@/components/design-system/style/BlobComponent.vue';
import { useUserStore } from '@/stores/userStore';
>>>>>>> a5acb6b (fix: store user votes on registation via e-mail)

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
await userStore.fetchUser();

<<<<<<< HEAD
const handleSubmit = async () => {
  console.log('handleSubmit');
  if (email.value === '') {
    emailError.value = 'Pole nesmie byť prázdne';
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
    message.value = 'Dáme vám vedieť!';
  } else {
    posting.value = false;
    success.value = false;
    message.value = 'Niečo sa pokazilo :( Skúste to znova.';
  }
};
const czechVerURL = 'https://www.volebnikalkulacka.cz';
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent />
      </template>
      <section style="padding: 2rem">
        <StackComponent spacing="large" centered>
          <StackComponent spacing="small" centered>
            <HeadlineText tag="h1" size="large" centered>{{
              $t('index.title')
            }}</HeadlineText>
            <BodyText size="large" centered>{{ $t('index.info1') }}</BodyText>
            <BodyText size="large" centered>{{ $t('index.info2') }}</BodyText>
            <BodyText size="medium" centered>
              <i18n-t keypath="index.info3.prefix">
                <a :href="czechVerURL" target="_blank">{{
                  $t('index.info3.link')
                }}</a>
              </i18n-t>
              {{ $t('index.info3.sufix') }}
            </BodyText>
          </StackComponent>
          <StackComponent spacing="small" centered>
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
                  placeholder="E-mail"
                  :value="email"
                  :icon="mdiEmailOutline"
                  :disabled="posting"
                  :error="emailError"
                />
                <ButtonComponent
                  kind="filled"
                  color="primary"
                  :loading="posting"
                  @click.prevent="handleSubmit"
                >
                  {{ $t('index.sendButton') }}
                </ButtonComponent>
              </StackComponent>
            </form>
            <BodyText v-if="!success" tag="p" size="small">{{
              $t('index.sendDisclaimer')
            }}</BodyText>
=======
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
          <b>2. kolo prezidentských voleb</b><br />
          27.–28. ledna 2023
          <br />
        </BodyText>
        <HeadlineText tag="p" size="small">
          <span style="color: rgb(var(--color-neutral-fg))">
            Petr Pavel × Andrej Babiš<br />
          </span>
          Kdo z&nbsp;nich bude reprezentovat<br />vaše&nbsp;názory?
        </HeadlineText>
        <BodyText size="small" tag="h2">
          Volební kalkulačka pro 2. kolo<br />20 otázek, cca 5 minut
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
          Spustit kalkulačku
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <BodyText size="small">
          <a href="https://prezident2023.programydovoleb.cz/"
            >Kdo kandiduje (Programy do voleb)
          </a>
        </BodyText>
        <BodyText size="small">
          Volební kalkulačku už vyplnilo přes 1 milion lidí.
        </BodyText>
        <ButtonComponent
          kind="outlined"
          color="primary"
          tag="a"
          @click="
            router.push({
              name: appRoutes.guide.name,
              params: {
                ...route.params,
                election: 'prezidentske-2023',
                district: 'pro-kazdeho',
              },
              query: { ...route.query },
            })
          "
        >
          Spustit kalkulačku pro 1. kolo
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <BodyText size="small" tag="h2">42 otázek, cca 10 minut</BodyText>
      </StackComponent>
      <div class="avatars">
        <div class="avatar pavel-fischer">
          <img
            alt="Fotografie – Pavel Fischer"
            src="@/assets/prezidenti-2023/cand-pavel-fischer-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-pavel-fischer-1x.webp,
              @/assets/prezidenti-2023/cand-pavel-fischer-2x.webp 2x
            "
          />
        </div>
        <div class="avatar shift jaroslav-basta">
          <img
            alt="Fotografie – Jaroslav Bašta"
            src="@/assets/prezidenti-2023/cand-jaroslav-basta-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-jaroslav-basta-1x.webp,
              @/assets/prezidenti-2023/cand-jaroslav-basta-2x.webp 2x
            "
          />
        </div>
        <div class="avatar shift josef-stredula">
          <img
            alt="Fotografie – Josef Středula"
            src="@/assets/prezidenti-2023/cand-josef-stredula-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-josef-stredula-1x.webp,
              @/assets/prezidenti-2023/cand-josef-stredula-2x.webp 2x
            "
          />
        </div>
        <div class="avatar petr-pavel">
          <img
            alt="Fotografie – Petr Pavel"
            src="@/assets/prezidenti-2023/cand-petr-pavel-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-petr-pavel-1x.webp,
              @/assets/prezidenti-2023/cand-petr-pavel-2x.webp 2x
            "
          />
        </div>
        <div class="avatar shift tomas-zima">
          <img
            alt="Fotografie – Tomáš Zima"
            src="@/assets/prezidenti-2023/cand-tomas-zima-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-tomas-zima-1x.webp,
              @/assets/prezidenti-2023/cand-tomas-zima-2x.webp 2x
            "
          />
        </div>
        <div class="avatar danuse-nerudova">
          <img
            alt="Fotografie – Danuše Nerudová"
            src="@/assets/prezidenti-2023/cand-danuse-nerudova-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-danuse-nerudova-1x.webp,
              @/assets/prezidenti-2023/cand-danuse-nerudova-2x.webp 2x
            "
          />
        </div>
        <div class="avatar andrej-babis">
          <img
            alt="Fotografie – Andrej Babiš"
            src="@/assets/prezidenti-2023/cand-andrej-babis-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-andrej-babis-1x.webp,
              @/assets/prezidenti-2023/cand-andrej-babis-2x.webp 2x
            "
          />
        </div>
        <div class="avatar shift karel-divis">
          <img
            alt="Fotografie – Karel Diviš"
            src="@/assets/prezidenti-2023/cand-karel-divis-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-karel-divis-1x.webp,
              @/assets/prezidenti-2023/cand-karel-divis-2x.webp 2x
            "
          />
        </div>
        <div class="avatar shift marek-hilser">
          <img
            alt="Fotografie – Marek Hilšer"
            src="@/assets/prezidenti-2023/cand-marek-hilser-1x.jpg"
            srcset="
              @/assets/prezidenti-2023/cand-marek-hilser-1x.webp,
              @/assets/prezidenti-2023/cand-marek-hilser-2x.webp 2x
            "
          />
        </div>
      </div>
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
              <strong>Kalkulačka pro nadšence</strong><br />
              Prezident 2023
            </BodyText>
            <BodyText size="small">
              Všech 98 otázek, které jsme položili prezidentským kandidátům.
            </BodyText>
            <ButtonComponent
              kind="outlined"
              color="primary"
              tag="a"
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
              Spustit kalkulačku
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
>>>>>>> a5acb6b (fix: store user votes on registation via e-mail)
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
              <strong>Kalkulačka pro mladé</strong><br />
              Prezident 2023
            </BodyText>
            <BodyText size="small">
              Otázky, které rezonují mladou generací.<br />
              Ve spolupráci s projektem
              <a href="https://www.nazorypolitiku.cz" target="_blank">
                NázoryPolitiků.cz </a
              >.
            </BodyText>
            <ButtonComponent
              kind="outlined"
              color="primary"
              tag="a"
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
              Spustit kalkulačku
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </StackComponent>
        </CardComponent>
      </div>
    </div>
    <StackComponent class="section" spacing="large" centered>
      <ButtonComponent kind="link" @click="scrollDown">
        <div class="button-content">
          Starší kalkulačky<IconComponent :icon="mdiArrowDown"></IconComponent>
        </div>
      </ButtonComponent>
    </StackComponent>

    <StaticContentLayout>
      <StackComponent class="section" spacing="small" centered>
        <TitleText size="large" tag="h2">Jak kalkulačka vzniká?</TitleText>
        <BodyText size="medium"
          >Volební kalkulačka je projekt neziskové organizace KohoVolit.eu a je
          nestranným pomocníkem při Vašem rozhodování koho volit.</BodyText
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
              >Volební kalkulačka vám s nimi spočítá názorovou shodu.</BodyText
            >
          </InfoBubble>
        </div>
      </StackComponent>
      <StackComponent class="section" spacing="large" centered>
        <BodyText size="medium"
          >Volební kalkulačka je pouze informační služba a není jejím cílem
          dávat konkrétní volební doporučení.</BodyText
        >
        <ButtonComponent kind="link" @click="router.push('/o-nas')">
          <div class="button-content">
            Zjistit více<IconComponent :icon="mdiArrowRight"></IconComponent>
          </div>
        </ButtonComponent>
      </StackComponent>
      <DonateBlock />
      <StackComponent spacing="large">
        <div ref="info"></div>
        <TitleText size="large" tag="h2">
          Volební kalkulačky k už proběhlým volbám
        </TitleText>
        <MasonryGrid style="align-self: stretch">
          <CardComponent corner="top-right" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium"
                  >Komunální volby 2022</TitleText
                >
                <BodyText size="medium"
                  >K dispozici jsou kalkulačky pro vybraná města.</BodyText
                >
                <div class="divider" />
                <BodyText size="small"
                  >Komunální kalkulačku vyplnilo přes 100 tisíc lidí.</BodyText
                >
              </div>
              <ButtonComponent
                kind="outlined"
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
          <CardComponent corner="top-left" padding="medium" border shadow>
            <div class="card-content">
              <div class="card-content-text">
                <TitleText tag="h3" size="medium">Senátní volby 2022</TitleText>
                <BodyText size="medium"
                  >Pro jednotlivé volební obvody.</BodyText
                >
                <BodyText size="medium"
                  ><a
                    href="https://2022.programydovoleb.cz/senatni-volby#kde-se-letos-voli"
                    >Více o senátních obvodech</a
                  ></BodyText
                >
              </div>
              <div class="divider" />
              <BodyText size="small"
                >Senátní kalkulačku vyplnilo přes 25 tisíc lidí.</BodyText
              >
              <ButtonComponent
                color="primary"
                kind="outlined"
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
        </MasonryGrid>
      </StackComponent>
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

  .avatars {
    display: grid;
    grid-template-columns: repeat(9, 1fr);

    .avatar {
      width: 80%;
      left: 10%;

      &.shift {
        top: -25%;
      }
    }
  }

  .avatar {
    position: relative;
    width: 100%;

    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
      padding-left: 100%;
    }

    > img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      left: 0;
      box-shadow: 0px 8px 32px rgba(var(--color-neutral-fg), 0.1);
    }
  }

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

    .avatars {
      display: contents;

      .avatar {
        width: 100%;
        left: 0;

        &.shift {
          top: -50%;
        }
      }

      .pavel-fischer {
        grid-row: 2;
        grid-column: 1;
        filter: grayscale(100%);
        opacity: 60%;
      }

      .jaroslav-basta {
        grid-row: 3;
        grid-column: 2;
        filter: grayscale(100%);
        opacity: 60%;
      }

      .josef-stredula {
        grid-row: 4;
        grid-column: 1;
        filter: grayscale(100%);
        opacity: 60%;
      }

      .petr-pavel {
        grid-row: 4;
        grid-column: 2;
      }

      .tomas-zima {
        grid-row: 4;
        grid-column: 3;
        filter: grayscale(100%);
        opacity: 60%;
      }

      .danuse-nerudova {
        grid-row: 4;
        grid-column: 10;
        filter: grayscale(100%);
        opacity: 60%;
      }

      .andrej-babis {
        grid-row: 2;
        grid-column: 11;
      }

      .karel-divis {
        grid-row: 4;
        grid-column: 11;
        filter: grayscale(100%);
        opacity: 60%;
      }

      .marek-hilser {
        grid-row: 3;
        grid-column: 12;
        filter: grayscale(100%);
        opacity: 60%;
      }
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
