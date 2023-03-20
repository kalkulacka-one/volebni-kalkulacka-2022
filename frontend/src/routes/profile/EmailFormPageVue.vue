<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiEmailOutline,
  mdiCloseCircleOutline,
} from '@mdi/js';
import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import FormComponent from '@/components/design-system/input/FormComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

export interface Props {
  type?: 'registration' | 'login';
}

withDefaults(defineProps<Props>(), {
  type: 'login',
});

const router = useRouter();
const route = useRoute();
const emailAddress = ref('');
const emailAddressError = ref();
const posting = ref();
const step = ref(0);

const texts = {
  0: {
    registration: {
      title: 'Vytvořit profil',
      info: 'Do e-mailové schránky Vám zašleme e-mail s ověřovacím odkazem. Registraci úspěšně dokončíte po kliknutí na něj.',
    },
    login: {
      title: 'Přihlásit se',
      info: 'Do e-mailové schránky Vám zašleme e-mail s ověřovacím odkazem.',
    },
  },
  1: {
    registration: {
      title: 'Registrace čeká na Vaše potvrzení',
      info: 'Potvrďte registraci na Vašem emailu',
    },
    login: {
      title: 'Přihlášení čeká na Vaše potvrzení',
      info: 'Potvrďte přihlášení na Vašem emailu',
    },
  },
};

const handlePreviousClick = () => router.go(-1);

const validateEmail = (value: string | undefined) => {
  const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (value)
    return expression.test(value)
      ? null
      : 'E-mailová adresa není správném tvaru';
};

const handleClose = () => {
  router.push({
    name: appRoutes.index.name,
    query: { ...route.query },
  });
  // }
};

const handleSubmit = async () => {
  const validate = validateEmail(emailAddress.value);

  if (emailAddress.value === '') {
    emailAddressError.value = 'Pole nesmí být prázdné';
    return;
  }
  if (validate) {
    emailAddressError.value = validate;
    return;
  } else {
    emailAddressError.value = null;
  }

  posting.value = true;

  const response = await fetch('/api/auth/magiclogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destination: emailAddress.value }),
  });

  if (response.ok) {
    posting.value = false;
    step.value = 1;
  } else {
    posting.value = false;
    throw Error('User update failed');
  }
};
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <template v-if="step === 0">
          <ResponsiveWrapper extra-small small>
            <SecondaryNavigationBar centered-title transparent>
              <template #before>
                <IconButton @click="handlePreviousClick">
                  <IconComponent :icon="mdiArrowLeft" title="Zpátky" />
                </IconButton>
              </template>
            </SecondaryNavigationBar>
          </ResponsiveWrapper>
          <ResponsiveWrapper medium large extra-large huge>
            <SecondaryNavigationBar transparent>
              <template #before>
                <IconButton @click="handlePreviousClick">
                  <IconComponent :icon="mdiArrowLeft" title="Zpátky" />
                </IconButton>
              </template>
            </SecondaryNavigationBar>
          </ResponsiveWrapper>
        </template>

        <NavigationBar transparent :with-logo="false" v-if="step === 1">
          <template #right>
            <IconButton kind="link" @click="handleClose">
              <IconComponent :icon="mdiCloseCircleOutline" title="Zavřít" />
            </IconButton>
          </template>
        </NavigationBar>
      </template>
      <StaticContentLayout size="small">
        <StackComponent spacing="medium" centered>
          <TitleText tag="p" size="medium" v-if="step === 0">
            {{ texts[step][type].title }}
          </TitleText>

          <template v-if="step === 1">
            <img src="/images/email.svg" />

            <TitleText tag="span" size="medium" centered>
              {{ texts[step][type].title }}
            </TitleText>
          </template>

          <BodyText strong size="medium" v-if="step === 0">
            Zadajte svoji emailovou adresu
          </BodyText>

          <BodyText size="medium" centered v-if="step === 1">
            {{ texts[step][type].info }}
            <BodyText strong size="medium"> {{ emailAddress }} </BodyText>
          </BodyText>

          <BodyText tag="p" size="medium" centered v-if="step === 0">
            {{ texts[step][type].info }}
          </BodyText>

          <BodyText tag="p" size="medium" centered v-if="step === 1">
            Pokud jste e-mail s ověřovacím odkazem neobdrželi, zkontrolujte
            prosím složku spamu nebo nevyžádanou poštu.
          </BodyText>

          <FormComponent @submit.prevent="handleSubmit" v-if="step === 0">
            <TextInputComponent
              required
              label="E-mail"
              type="email"
              placeholder="E-mail"
              :value="emailAddress"
              v-model="emailAddress"
              :icon="mdiEmailOutline"
              :disabled="posting"
              :error="emailAddressError"
            />

            <ButtonComponent
              kind="filled"
              color="primary"
              @click.prevent="handleSubmit"
              :loading="posting"
            >
              Zaslat potvrdzovací email
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </FormComponent>
        </StackComponent>
      </StaticContentLayout>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>
