<script setup lang="ts">
import { useRouter } from 'vue-router';
import { appRoutes } from '@/main';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import { mdiArrowLeft, mdiEmailOutline } from '@mdi/js';
import SocialMediaConnectComponent from './SocialMediaConnectComponent.vue';

const router = useRouter();

const handlePreviousClick = () => router.go(-1);
const handleGoToFormClick = () => {
  router.push({
    name: appRoutes.registerForm.name,
  });
};
const handleGoToLoginClick = () => {
  router.push({
    name: appRoutes.login.name,
  });
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

      <StackComponent spacing="large" class="section" centered>
        <StackComponent spacing="small" centered>
          <TitleText tag="p" size="medium">Vytvořit profil</TitleText>
          <BodyText tag="strong" strong size="small">
            Sledujte názorový vývoj ve svém profilu
          </BodyText>
        </StackComponent>
        <StackComponent spacing="medium" centered>
          <SocialMediaConnectComponent />

          <ButtonComponent
            v-if="false"
            kind="outlined"
            color="neutral"
            class="w-full"
            @click="handleGoToFormClick"
          >
            <template #icon>
              <IconComponent :icon="mdiEmailOutline" />
            </template>
            Vytvořit profil pomocí emailu
          </ButtonComponent>
        </StackComponent>
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
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
</style>
