<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiArrowLeft, mdiArrowRight, mdiCloseCircleOutline } from '@mdi/js';

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
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();
const subscriberStore = useSubscriberStore();

const election = electionStore.election as Election;
const electionName = election.name;
const electionDescription = election.description;

const breadcrumbs = electionName;

const selected = ref((route.params.district as string) || null);

const email = ref(subscriberStore.subscriber?.email || '');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

const handlePreviousClick = () => {
  router.push({
    name: appRoutes.preferredCandidate.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

const onSubmit = async () => {
  console.log('handleSubmit');
  if (email.value === '') {
    emailError.value = 'Email Necesar';
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

    router.push({
      name: appRoutes.result.name,
      query: { ...route.query },
    });
  } else {
    if (response.status === 500) [
      emailError.value = 'Internal server error',
      onRefuse()
    ]
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
  router.push({
    name: appRoutes.result.name,
    query: { ...route.query },
  });
};
</script>

<template>
  <BackgroundComponent :is-image="false">
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar>
          <template #title>{{ breadcrumbs }}</template>
          <template #right>
            <EmbedWrapper>
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
                    title="Pagina Principală"
                    />
                  </template>
              </ButtonComponent>
              </ResponsiveWrapper>
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
                  Pagina Principală
                  <template #iconAfter>
                    <IconComponent :icon="mdiCloseCircleOutline" />
                  </template>
                </ButtonComponent>
              </ResponsiveWrapper>
            </EmbedWrapper>
          </template>
        </NavigationBar>
      </template>
      <template #sticky-header>
        <ResponsiveWrapper extra-small small>
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Recapitulare" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="medium">Adresa de contact</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Recapitulare" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large">Adresa de contact</TitleText>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <StepWrapper centered>
          <template #before />
          <StackComponent spacing="small">
            <BodyText size="medium">
              Am vrea să te invităm să faci parte dintr-un grup de cetățeni pe care îi vom contacta din nou cu întrebări despre problemele, nevoile și opiniile lor. 
            </BodyText>
            <BodyText size="medium">
              Am folosi răspunsurile tale doar în formă anonimizată, pentru a scrie cercetări academice. Putem să te contactăm în viitor pentru acest lucru?
            </BodyText>
            <BodyText size="medium">
              Îți vom trimite la aceeași adresă și un rezumat al ceea ce a reieșit din analiza statistică a răspunsurilor la TestVot.
            </BodyText>
          </StackComponent>
          <template #after />
        </StepWrapper>
        <template #bottom-bar>
          <ResponsiveWrapper medium large extra-large huge>
            <StackComponent class="bottom-bar" spacing="small">
              <BodyText size="small">
                Prin furnizarea adresei dvs. de e-mail, sunteți de acord cu <a href="" target="_blank">politica de confidențialitate</a> aplicabilă.
              </BodyText>
              <form v-if="!success">
                <StackComponent
                  horizontal
                  stretched
                  spacing="small"
                >
                  <TextInputComponent
                    v-model="email"
                    required
                    type="email"
                    placeholder="nume.exemplu@example.ro"
                    :value="email"
                    :icon="mdiEmailOutline"
                    :disabled="posting"
                    :error="emailError"
                  />
                  <ButtonComponent
                    kind="filled"
                    color="primary"
                    :loading="posting"
                    @click.prevent="onSubmit"
                  >
                    Trimit
                    <template #iconAfter>
                      <IconComponent :icon="mdiArrowRight" />
                    </template>
                  </ButtonComponent>
                </StackComponent>
              </form>
              <ButtonComponent
                  kind="outlined"
                  color="neutral"
                  :loading="posting"
                  @click.prevent="onRefuse"
                >
                  Nu vreau să ofer adresa mea de email
                </ButtonComponent>
            </StackComponent>
          </ResponsiveWrapper>
          <ResponsiveWrapper extra-small small>
            <BottomBar class="bottom-bar" spacing="small">
              <BodyText size="small">
                Prin furnizarea adresei dvs. de e-mail, sunteți de acord cu <a href="" target="_blank">politica de confidențialitate</a> aplicabilă.
              </BodyText>
              <form v-if="!success">
                <StackComponent
                  horizontal
                  stretched
                  spacing="small"
                >
                  <TextInputComponent
                    v-model="email"
                    required
                    type="email"
                    placeholder="nume.exemplu@example.ro"
                    :value="email"
                    :icon="mdiEmailOutline"
                    :disabled="posting"
                    :error="emailError"
                  />
                  <ButtonComponent
                    kind="filled"
                    color="primary"
                    :loading="posting"
                    @click.prevent="onSubmit"
                  >
                    <template #icon>
                      <IconComponent :icon="mdiArrowRight" />
                    </template>
                  </ButtonComponent>
                </StackComponent>
              </form>
              <ButtonComponent
                  kind="outlined"
                  color="neutral"
                  :loading="posting"
                  @click.prevent="onRefuse"
                >
                  Nu vreau să ofer adresa mea de email
                </ButtonComponent>
            </BottomBar>
          </ResponsiveWrapper>
        </template>
      </BottomBarWrapper>
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
/* @media (max-width: 700px) {
  .bottom-bar {
    grid-template-columns: max-content;
  }
} */

.bottom-bar {
  display: grid;
  grid-template-columns: min-content;
  gap: var(--spacing-small);
  justify-content: center;
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

form .input-wrapper {
  flex-grow: 1;
}
</style>
