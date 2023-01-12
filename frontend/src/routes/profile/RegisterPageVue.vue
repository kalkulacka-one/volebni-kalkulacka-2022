<script setup lang="ts">
import { computed } from 'vue';
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

const returnPath = computed(() => route.query.returnPath as string);
const calculatorId = computed(() => route.query.calculatorId as string);
const updateToken = computed(() => route.query.updateToken as string);

const href = ({
  provider,
  returnPath,
  calculatorId,
  updateToken,
}: {
  provider: string;
  returnPath?: string;
  calculatorId?: string;
  updateToken?: string;
}) => {
  // TODO: PUBLIC_URL
  const PUBLIC_URL =
    import.meta.env.VITE_PUBLIC_URL ||
    `https://${import.meta.env.VITE_VERCEL_URL}`;
  const url = new URL(`/api/auth/${provider}`, PUBLIC_URL);

  if (returnPath) {
    url.searchParams.append('returnTo', returnPath);
  }

  if (calculatorId && updateToken) {
    url.searchParams.append('calculatorId', calculatorId);
    url.searchParams.append('updateToken', updateToken);
  }

  return url.href;
};

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
          <SocialMediaConnectComponent
            :google-url="
              href({
                provider: 'google',
                returnPath,
                calculatorId,
                updateToken,
              })
            "
            :facebook-url="
              href({
                provider: 'facebook',
                returnPath,
                calculatorId,
                updateToken,
              })
            "
          />
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
