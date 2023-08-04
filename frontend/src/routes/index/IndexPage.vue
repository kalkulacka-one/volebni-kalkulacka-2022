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
// debug
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
locale.value = 'cz';
// end of debug

const email = ref('');
const emailError = ref();
const posting = ref();
const success = ref();
const message = ref();

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
    uccess.value = false;
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
