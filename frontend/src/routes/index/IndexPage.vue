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

const email = ref('');
const emailError = ref();
const posting = ref();
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
    message.value = 'Dáme vám vedieť!';
  } else {
    posting.value = false;
    message.value = 'Niečo sa pokazilo :( Skúste to znova.';
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
            <HeadlineText tag="h1" size="large" centered
              >Volebná kalkulačka 2023</HeadlineText
            >
            <BodyText size="large" centered
              >Prípravujeme pre vás volebnú kalkulačku pre voľby do Národnej
              rady Slovenskej republiky 2023.</BodyText
            >
            <BodyText size="large" centered
              >Zanechajte nám váš e-mail a dáme vám vedieť, keď kalkulačku
              spustíme.</BodyText
            >
            <BodyText size="medium" centered
              >Zatiaľ sa môžete pozrieť na
              <a href="https://www.volebnikalkulacka.cz">českú verziu</a>
              volebnej kalkulačky.</BodyText
            >
          </StackComponent>
          <StackComponent spacing="small" centered>
            <form>
              <StackComponent
                horizontal
                spacing="small"
                stretched
                wrap
                style="justify-content: center"
              >
                <BodyText size="small">
                  {{ message }}
                </BodyText>
                <TextInputComponent
                  required
                  type="email"
                  placeholder="E-mail"
                  :value="email"
                  v-model="email"
                  :icon="mdiEmailOutline"
                  :disabled="posting"
                  :error="emailError"
                />
                <ButtonComponent
                  kind="filled"
                  color="primary"
                  @click.prevent="handleSubmit"
                  :loading="posting"
                >
                  Dajte mi vedieť
                </ButtonComponent>
              </StackComponent>
            </form>
            <BodyText tag="p" size="small"
              >Odoslaním súhlasíte so zasielaním noviniek o volebnej
              kalkulačke.</BodyText
            >
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
