<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { appRoutes } from '@/main';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import { mdiCloseCircleOutline } from '@mdi/js';
import SocialMediaConnectComponent from './SocialMediaConnectComponent.vue';

const router = useRouter();
const route = useRoute();

// TODO: see https://stackoverflow.com/questions/62358716/check-if-there-is-a-previous-page-in-vue-route
const handleClose = () => {
  router.push({
    name: appRoutes.index.name,
    query: { ...route.query },
  });
};

const handleGoToLoginClick = () => router.push(appRoutes.login);
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent :with-logo="false">
          <template #right>
            <IconButton kind="link" @click="handleClose">
              <IconComponent :icon="mdiCloseCircleOutline" title="Zavřít" />
            </IconButton>
          </template>
        </NavigationBar>
      </template>
      <StackComponent spacing="large" centered>
        <StackComponent spacing="small" centered>
          <TitleText tag="p" size="medium">Vytvořit profil</TitleText>
          <BodyText strong size="small">
            Sledujte názorový vývoj ve svém profilu
          </BodyText>
        </StackComponent>
        <StackComponent spacing="medium" centered>
          <SocialMediaConnectComponent />
        </StackComponent>
        <StackComponent centered spacing="extra-small">
          <BodyText size="medium">Už máte profil?</BodyText>
          <ButtonComponent
            kind="link"
            color="primary"
            @click="handleGoToLoginClick"
          >
            Přihlásit se
          </ButtonComponent>
        </StackComponent>
      </StackComponent>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>
