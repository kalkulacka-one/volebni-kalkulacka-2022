<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { mdiCloseCircleOutline } from '@mdi/js';
import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import SocialMediaConnectComponent from './SocialMediaConnectComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

const router = useRouter();
const route = useRoute();

// TODO: see https://stackoverflow.com/questions/62358716/check-if-there-is-a-previous-page-in-vue-route
const handleClose = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push({
      name: appRoutes.index.name,
      query: { ...route.query },
    });
  }
};

const handleGoToRegisterClick = () => router.push(appRoutes.register);
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
      <StackComponent spacing="medium" centered>
        <StackComponent spacing="small" centered>
          <TitleText tag="p" size="medium">Přihlásit se</TitleText>
        </StackComponent>
        <StackComponent spacing="medium" centered>
          <SocialMediaConnectComponent />
        </StackComponent>
        <StackComponent centered spacing="extra-small">
          <BodyText size="medium">Ještě nemáte profil?</BodyText>
          <ButtonComponent
            kind="link"
            color="primary"
            @click="handleGoToRegisterClick"
          >
            Vytvořit profil
          </ButtonComponent>
        </StackComponent>
      </StackComponent>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>
