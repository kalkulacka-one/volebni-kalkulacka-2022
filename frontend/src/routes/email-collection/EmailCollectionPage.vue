<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mdiArrowLeft, mdiArrowRight, mdiCloseCircleOutline } from '@mdi/js';

import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
import { User, useUserStore } from '@/stores/userStore';

import { mdiEmailOutline } from '@mdi/js';

import type { Election } from '@/types/election';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import BottomBar from '@/components/design-system/navigation/BottomBar.vue';
import BottomBarWrapper from '@/components/design-system/layout/BottomBarWrapper.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import StepWrapper from '@/components/design-system/layout/StepWrapper.vue';

const router = useRouter();
const route = useRoute();
const electionStore = useElectionStore();
const userStore = useUserStore();

const election = electionStore.election as Election;
const electionName = election.name;

const breadcrumbs = electionName;

const email = ref(userStore.user?.email || '');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

const handlePreviousClick = () => {
  router.push({
    name: appRoutes.recap.name,
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
    message.value = '';

    const user = (await response.json()) as User;
    userStore.setUser(user);

    router.push({
      name: appRoutes.preferredCandidate.name,
      query: { ...route.query },
    });
  } else {
    if (response.status === 500)
      [(emailError.value = 'Internal server error'), onRefuse()];
    const error = await response.json();

    posting.value = false;
    success.value = false;
    emailError.value = error.detail;
  }
};

const onRefuse = async () => {
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
            <TitleText tag="h2" size="medium"
              >Lasă-ne adresa ta de email</TitleText
            >
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar centered-title>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Recapitulare" />
              </IconButton>
            </template>
            <TitleText tag="h2" size="large"
              >Lasă-ne adresa ta de email</TitleText
            >
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>
      <BottomBarWrapper>
        <StepWrapper centered>
          <template #before />
          <StackComponent spacing="small">
            <BodyText size="medium">
              Ne-am bucura să ne spui ce crezi despre TestVot sau despre
              alegeri. Poți să ne scrii la
              <a target="_blank" href="mailto:portal@medianresearch.ro"
                >portal@medianresearch.ro</a
              >.
            </BodyText>
            <BodyText size="medium">
              Te invităm să faci parte dintr-un grup de cetățeni pe care îi vom
              contacta din nou cu întrebări despre problemele, nevoile și
              opiniile lor. Eventualele tale răspunsuri vor fi folosite doar în
              formă anonimizată.
            </BodyText>
            <BodyText size="medium">
              Iți vom trimite pe același email și un rezumat a ceea ce a reieșit
              din analiza statistică a răspunsurilor la TestVot.
            </BodyText>
          </StackComponent>
          <template #after />
        </StepWrapper>
        <template #bottom-bar>
          <ResponsiveWrapper medium large extra-large huge>
            <StackComponent class="bottom-bar" spacing="small">
              <BodyText size="small">
                Prin furnizarea adresei dvs. de e-mail, sunteți de acord cu
                <a href="" target="_blank">politica de confidențialitate</a>
                aplicabilă.
              </BodyText>
              <form v-if="!success">
                <StackComponent horizontal stretched spacing="small">
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
                Nu ofer adresa de email
              </ButtonComponent>
            </StackComponent>
          </ResponsiveWrapper>
          <ResponsiveWrapper extra-small small>
            <BottomBar class="bottom-bar" spacing="small">
              <BodyText size="small">
                Prin furnizarea adresei dvs. de e-mail, sunteți de acord cu
                <a href="" target="_blank">politica de confidențialitate</a>
                aplicabilă.
              </BodyText>
              <form v-if="!success">
                <StackComponent horizontal stretched spacing="small">
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
                Nu ofer adresa de email
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
