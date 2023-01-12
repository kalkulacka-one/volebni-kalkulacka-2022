<script setup lang="ts">
import { computed } from 'vue';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import ProfileCardComponent from './ProfileCardComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const user = computed(() => userStore.user);
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent style="position: absolute" />
      </template>
    </StickyHeaderLayout>
    <StaticContentLayout size="medium" class="main">
      <ResponsiveWrapper extra-small small>
        <StackComponent stretched spacing="medium">
          <HeadlineText tag="h1" size="extra-small">
            Moje kalkulačky
          </HeadlineText>
          <ProfileCardComponent
            :name="user?.displayName"
            :email="user?.email"
          />
        </StackComponent>
      </ResponsiveWrapper>
      <ResponsiveWrapper medium large extra-large huge>
        <StackComponent spacing="large" horizontal space-between>
          <HeadlineText tag="h1" size="small">Moje kalkulačky</HeadlineText>
          <ProfileCardComponent
            :name="user?.displayName"
            :email="user?.email"
          />
        </StackComponent>
      </ResponsiveWrapper>
    </StaticContentLayout>
    <StaticContentLayout>
      <DonateBlock />
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.main {
  padding-top: 15%;
  padding-bottom: 15%;

  @media (min-width: 767px) {
    padding-top: 6%;
    padding-bottom: 6%;
  }
}
</style>
