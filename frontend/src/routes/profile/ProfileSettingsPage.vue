<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  mdiAccountOutline,
  mdiArrowLeft,
  mdiTrashCanOutline,
  mdiEmailOutline,
  mdiLogout,
} from '@mdi/js';
import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import ProfileCardComponent from './ProfileCardComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();

const emailAddress = ref('');
const fullName = ref('');

const handlePreviousClick = () => router.go(-1);

const handleDeleteUserClick = () => console.log('DELETE clicked');

const onSubmit = (e: Event) => {
  console.log(emailAddress, e);
  router.push(appRoutes.profileSettings);
};

const userStore = useUserStore();
const user = userStore.user;
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent />
      </template>

      <template #sticky-header>
        <SecondaryNavigationBar centered-title transparent padding="small">
          <template #before>
            <IconButton @click="handlePreviousClick">
              <IconComponent :icon="mdiArrowLeft" title="Zpátky" />
            </IconButton>
          </template>
          <TitleText tag="p" size="medium">Nastavení profilu</TitleText>
        </SecondaryNavigationBar>
      </template>

      <StaticContentLayout size="small" class="content">
        <StackComponent spacing="large" centered>
          <form
            id="register-form"
            class="w-full"
            ref="form"
            @submit.prevent="(e) => onSubmit(e)"
          >
            <CardComponent
              corner="top-left"
              padding="medium"
              border
              border-radius="medium"
              shadow
            >
              <StackComponent spacing="medium" centered>
                <TextInputComponent
                  label="Celé jméno"
                  type="text"
                  placeholder="Jan Novák"
                  class="w-full"
                  :value="user.displayName"
                  v-model="user.displayName"
                  :icon="mdiAccountOutline"
                />

                <TextInputComponent
                  required
                  label="E-mail"
                  type="email"
                  placeholder="E-mail"
                  class="w-full"
                  :value="user.email"
                  v-model="user.email"
                  :icon="mdiEmailOutline"
                />

                <ButtonComponent kind="filled" color="primary" class="w-full">
                  Uložit změny
                </ButtonComponent>
              </StackComponent>
            </CardComponent>
          </form>

          <img src="/images/lock_person.svg" width="32" height="32" alt="" />

          <StackComponent centered spacing="extra-small">
            <BodyText size="small">
              <strong>Jak nakládáme s daty?</strong>
            </BodyText>

            <BodyText size="small">
              Přectěte si o tom na <a href=".">Zásady ochrany dat</a>
            </BodyText>
          </StackComponent>

          <StackComponent centered spacing="extra-small" class="w-full">
            <ButtonComponent
              kind="filled"
              color="white"
              class="w-full"
              @click.prevent="handleDeleteUserClick"
            >
              Odstránit profil
              <template #iconAfter>
                <IconComponent :icon="mdiTrashCanOutline" />
              </template>
            </ButtonComponent>

            <ButtonComponent
              tag="a"
              href="/api/auth/logout"
              kind="filled"
              color="white"
              class="w-full"
            >
              Odhlásit se
              <template #iconAfter>
                <IconComponent :icon="mdiLogout" />
              </template>
            </ButtonComponent>
          </StackComponent>
        </StackComponent>
      </StaticContentLayout>
    </StickyHeaderLayout>

    <StaticContentLayout>
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}

.content {
  padding-top: 5%;
  padding-bottom: 20%;

  @media (min-width: 767px) {
    padding-top: 3%;
    padding-bottom: 6%;
  }
}
</style>
