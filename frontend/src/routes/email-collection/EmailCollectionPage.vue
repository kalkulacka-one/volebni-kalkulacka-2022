<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { Subscriber, useSubscriberStore } from '@/stores/subscriberStore';

import { mdiEmailOutline } from '@mdi/js';

import type { Election } from '@/types/election';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import RadioButtonComponent from '@/components/design-system/input/RadioButtonComponent.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import MarkdownIt from '@/components/utilities/MarkdownIt.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import { stringToNormalizedHyphenated } from '@/common/utils';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();
const subscriberStore = useSubscriberStore();

const election = electionStore.election as Election;
const electionName = election.name;
const electionDescription = election.description;

const breadcrumbs = electionName;

const selected = ref((route.params.district as string) || null);

const email = ref('');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

const onSubmit = async () => {
  console.log('handleSubmit');
  if (email.value === '') {
    emailError.value = 'Missing email';
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
    message.value = 'Sikeres feliratkozás!';

    const subscriber = await response.json() as Subscriber;

    subscriberStore.setSubscriber({
      id: subscriber.id,
      email: subscriber.email,
    })

    /* router.push({
      name: appRoutes.result.name,
      params: {
        ...route.params,
        election: 'presidential-2023',
        district: 'national',
      },
      query: { ...route.query },
    }); */

    router.push({
      name: appRoutes.preferredCandidate.name,
      query: { ...route.query },
    });
  } else {
    const error = await response.json();

    posting.value = false;
    success.value = false;
    emailError.value = error.detail;
  }
};

const onRefuse = async () => {
  subscriberStore.setSubscriber({
      id: undefined,
      email: undefined,
    })
  /* router.push({
    name: appRoutes.result.name,
    params: {
      ...route.params,
      election: 'presidential-2023',
      district: 'national',
    },
    query: { ...route.query },
  }); */
  router.push({
    name: appRoutes.preferredCandidate.name,
    query: { ...route.query },
  });
};
</script>

<template>
  <BackgroundComponent :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent>
          <template #title>{{ breadcrumbs }}</template>
          <template #right>
            <EmbedWrapper>
              <ResponsiveWrapper medium large extra-large huge>
                <ButtonComponent
                  kind="link"
                  @click="
                    router.push({
                      name: appRoutes.index.name,
                      query: { ...route.query },
                    })
                  "
                >
                  Vissza a főoldalra
                  <template #iconAfter>
                    <IconComponent :icon="mdiCloseCircleOutline" />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
              <ResponsiveWrapper extra-small small>
                <ButtonComponent
                  kind="link"
                  @click="
                    router.push({
                      name: appRoutes.index.name,
                      query: { ...route.query },
                    })
                  "
                >
                  <template #icon>
                    <IconComponent
                      :icon="mdiCloseCircleOutline"
                      title="Nem adom"
                    />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
            </EmbedWrapper>
          </template>
        </NavigationBar>
      </template>
      <template #sticky-header>
        <ResponsiveWrapper extra-small small>
          <SecondaryNavigationBar transparent centered-title>
            <TitleText tag="h2" size="medium">{{ title }}</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar transparent>
            <TitleText tag="h2" size="large">{{ title }}</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <section class="subscribe">
        <StackComponent spacing="small" centered>
          <TitleText size="large" tag="h2">
            Adresa de contact
          </TitleText>
          <BodyText size="small" centered class="bodyText">
            Dorim să vă transmitem analiza noastră a rezultatelor complete ale acestui sondaj după alegeri, adică câți oameni au fost de acord cu fiecare declarație politică de mai sus dintre toți respondenții și dintre susținătorii diferitelor partide și cum au fost recomandate recomandările pe care le codificăm. pozițiile părților diferă de preferințele lor declarate de partid. Vă rugăm să scrieți mai jos pe o adresă de e-mail unde putem trimite acest raport?
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
                placeholder="kovacsferenc@gmail.com"
                :value="email"
                :icon="mdiEmailOutline"
                :disabled="posting"
                :error="emailError"
              />
              <ButtonComponent
                kind="outlined"
                color="primary"
                :loading="posting"
                @click.prevent="onSubmit"
              >
                Senden
              </ButtonComponent>
            </StackComponent>
          </form>
          <BodyText v-if="!success" tag="p" size="small">{{
            'Ha megadod az email-címed, azzal elfogadod az erre vonatkozó adatvédelmi szabályzatot.'
          }}</BodyText>
          <ButtonComponent
              kind="outlined"
              color="neutral"
              size="small"
              :loading="posting"
              @click.prevent="onRefuse"
              class="refuse"
            >
              Nem szeretném megadni az email-címem
            </ButtonComponent>
        </StackComponent>
      </section>
      <!-- <form id="district-form" ref="form" @submit.prevent="onSubmit">
        <BottomBarWrapper>
          <div class="main">
            <StackComponent spacing="medium">
              <BodyText size="medium">
                <StackComponent spacing="extra-small">
                  <MarkdownIt :markdown="text" />
                </StackComponent>
              </BodyText>
              <div class="list" style="align-self: stretch">
                <RadioButtonComponent
                  v-for="option in options"
                  :key="option.value"
                  v-model="selected"
                  group-name="district-selection"
                  :value="option.value"
                >
                  {{ option.label }}
                </RadioButtonComponent>
              </div>
            </StackComponent>
          </div>
          <template #bottom-bar>
            <ResponsiveWrapper medium large extra-large huge>
              <BottomBar class="bottom-bar" transparent>
                <ButtonComponent
                  kind="filled"
                  type="submit"
                  color="primary"
                  :disabled="!selected"
                >
                  Potvrdit a pokračovat
                </ButtonComponent>
              </BottomBar>
            </ResponsiveWrapper>
            <ResponsiveWrapper extra-small small>
              <BottomBar class="bottom-bar">
                <ButtonComponent
                  kind="filled"
                  type="submit"
                  color="primary"
                  :disabled="!selected"
                >
                  Potvrdit a pokračovat
                </ButtonComponent>
              </BottomBar>
            </ResponsiveWrapper>
          </template>
        </BottomBarWrapper>
      </form> -->
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: minmax(24rem, max-content);
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: var(--spacing-small);
}

/* TODO: update breakpoint */
@media (max-width: 700px) {
  .main {
    grid-template-columns: 1fr;
  }
}

.bodyText {
  max-width: 800px;
}

form {
  display: contents;
}

.refuse {
  margin-top: var(--spacing-medium);
}

.bottom-bar {
  display: grid;
  grid-template-columns: max-content;
  justify-content: center;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}
</style>
