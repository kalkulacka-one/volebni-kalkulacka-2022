<script lang="ts">
export enum ErrorPageEnum {
  NotFound = 'not-found',
  ApiError = 'api-error',
}
</script>

<script setup lang="ts">
import { appRoutes } from '@/main';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';

import { mdiArrowRight } from '@mdi/js';

import NotFoundImg from '@/assets/error/not-found.svg';

export interface Props {
  case: ErrorPageEnum;
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();

const handleHomeClicked = () => {
  router.push({
    name: appRoutes.index.name,
    query: { ...route.query },
  });
};
const pageInfo = computed(() => {
  let header = 'Unknown Error';
  let imgSrc = '';
  let imgAlt = '';
  switch (props.case) {
    case ErrorPageEnum.NotFound:
      header = 'Tato stránka neexistuje';
      imgSrc = NotFoundImg;
      imgAlt = 'Not Found';
      break;
    case ErrorPageEnum.ApiError:
      header = 'Api Error';
      break;
    default:
      break;
  }
  //extra info is passed as router state as described here: https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
  console.warn(`
    ErroPage: ${props.case},
    redirected from: ${route.redirectedFrom?.fullPath}
    extra info: ${router.options.history.state.extraInfo}
  `);
  // eslint-disable-next-line no-undef
  newrelic?.noticeError(`ErrorPage ${props.case}`, {
    redirectedFrom: route.redirectedFrom?.fullPath || '',
    extraInfo: (router.options.history.state.extraInfo as string) || '',
  });
  return {
    header: header,
    imgSrc: imgSrc,
    imgAlt: imgAlt,
  };
});
</script>
<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <ContainerComponent
          class="navigation-bar"
          padding="medium"
          responsive-padding
          background="transparent"
        >
          <div class="grid">
            <router-link to="/"
              ><LogoComponent responsive />
              <div class="title">
                <BodyText size="small"> </BodyText></div
            ></router-link>
            <StackComponent class="right" horizontal spacing="small">
            </StackComponent>
          </div>
        </ContainerComponent>
      </template>
    </StickyHeaderLayout>
    <StaticContentLayout>
      <StackComponent centered spacing="small" wrap spacing-responsive>
        <HeadlineText tag="h3" size="extra-small">
          {{ pageInfo.header }}
        </HeadlineText>
        <img
          v-if="pageInfo.imgSrc"
          :src="pageInfo.imgSrc"
          :alt="pageInfo.imgAlt"
        />
        <ButtonComponent
          kind="outlined"
          size="medium"
          @click="handleHomeClicked"
        >
          Přejít na hlavní stránku
          <template #iconAfter>
            <IconComponent size="medium" :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>
