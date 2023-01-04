<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

const router = useRouter();

const handlePreviousClick = () => router.go(-1);
const handleGoToLoginClick = () => {
  router.push({
    name: appRoutes.login.name,
  });
};

const onSubmit = (e: Event) => {
  router.push(appRoutes.consent);
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

      <form id="register-form" ref="form" @submit.prevent="(e) => onSubmit(e)">
        <StackComponent spacing="large" class="section" centered>
          <TitleText tag="p" size="medium"> Vytvořit profil </TitleText>

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
                modelValue="registration"
              />

              <ButtonComponent kind="filled" color="primary" class="w-full">
                Pokračovat
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </StackComponent>
          </CardComponent>

          <StackComponent horizontal centered spacing="extra-small">
            <BodyText size="medium" strong>Už máte profil?</BodyText>
            <ButtonComponent
              kind="link"
              color="primary"
              @click="handleGoToLoginClick"
            >
              Přihlašte se
            </ButtonComponent>
          </StackComponent>
        </StackComponent>
      </form>
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
