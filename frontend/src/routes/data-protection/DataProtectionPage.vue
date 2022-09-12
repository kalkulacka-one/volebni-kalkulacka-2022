<script setup lang="ts">
import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <NavigationBar transparent />
      </template>
    </StickyHeaderLayout>
    <StaticContentLayout>
      <StackComponent spacing="large" class="section">
        <HeadlineText tag="h1" size="large">Ochrana dat</HeadlineText>
        <BodyText size="large">
          Volební Kalkulačka nepoužívá cookies a nesbírá žádná osobní data.
        </BodyText>
      </StackComponent>
      <DonateBlock />
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.section {
  padding: 40px 0;
}
</style>
