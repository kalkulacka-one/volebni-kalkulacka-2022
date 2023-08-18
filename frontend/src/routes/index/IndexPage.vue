<script setup lang="ts">
import { ref } from 'vue';
import { mdiArrowRight, mdiEmailOutline } from '@mdi/js';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import FormComponent from '@/components/design-system/input/FormComponent.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const email = ref('');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

const handleSubmit = async () => {
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
    message.value = t('routes.index.IndexPage.confirmation-message');
  } else {
    posting.value = false;
    success.value = false;
    message.value = t('routes.index.IndexPage.unknown-error');
  }
};
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
              $t('routes.index.IndexPage.title')
            }}</HeadlineText>
            <BodyText size="large" centered>{{
              $t('routes.index.IndexPage.primary-text')
            }}</BodyText>
            <BodyText size="large" centered>{{
              $t('routes.index.IndexPage.secondary-text')
            }}</BodyText>
            <BodyText size="medium" centered>
              {{ $t('routes.index.IndexPage.czech-version.prefix') }}
              <a href="https://www.volebnikalkulacka.cz" target="_blank">
                {{ $t('routes.index.IndexPage.czech-version.link') }}
              </a>
              {{ $t('routes.index.IndexPage.czech-version.suffix') }}
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
                  :placeholder="t('routes.index.IndexPage.input-label')"
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
                  {{ $t('routes.index.IndexPage.subscribe-button-label') }}
                </ButtonComponent>
              </StackComponent>
            </form>
            <BodyText v-if="!success" tag="p" size="small">{{
              $t('routes.index.IndexPage.disclaimer')
            }}</BodyText>
          </StackComponent>
        </StackComponent>
      </section>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style scoped lang="scss">
section {
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>
