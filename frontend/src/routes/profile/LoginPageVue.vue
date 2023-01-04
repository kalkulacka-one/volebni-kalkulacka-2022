<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import SocialMediaConnectComponent from './SocialMediaConnectComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';

const router = useRouter();
const emailAddress = ref('');

const handlePreviousClick = () => router.go(-1);

const handleGoToRegisterClick = () => router.push(appRoutes.register);

const onSubmit = (e: Event) => {
  console.log('Form submitted: ', e);
  router.push(appRoutes.emailSent);
};
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
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

      <StackComponent spacing="medium" class="section" centered>
        <StackComponent spacing="small" centered>
          <TitleText tag="p" size="medium">Přihlásit se</TitleText>
        </StackComponent>
        <StackComponent spacing="medium" centered class="form-wrapper">
          <SocialMediaConnectComponent />

          <BodyText size="small">
            Nebo se přihlašte pomocí přihlašovacích ůdajů
          </BodyText>
        </StackComponent>

        <form
          id="register-form"
          ref="form"
          @submit.prevent="(e) => onSubmit(e)"
        >
          <CardComponent
            corner="top-left"
            padding="medium"
            border
            border-radius="medium"
            shadow
            class="form-wrapper"
          >
            <StackComponent spacing="medium" centered>
              <TextInputComponent
                required
                label="E-mail"
                type="email"
                placeholder="E-mail"
                class="w-full"
                :value="emailAddress"
                v-model="emailAddress"
              />

              <ButtonComponent kind="filled" color="primary" class="w-full">
                Přihlásit se
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </StackComponent>
          </CardComponent>
        </form>

        <StackComponent horizontal centered spacing="extra-small">
          <BodyText size="medium" strong>Ještě nemáte profil?</BodyText>
          <ButtonComponent
            kind="link"
            color="primary"
            @click="handleGoToRegisterClick"
          >
            Vytvořte si ho
          </ButtonComponent>
        </StackComponent>
      </StackComponent>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.form-wrapper {
  width: 340px;
}

.w-full {
  width: 100%;
}
</style>
