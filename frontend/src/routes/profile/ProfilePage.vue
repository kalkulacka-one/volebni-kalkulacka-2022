<script setup lang="ts">
import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import ElectionCardComponent from '@/components/design-system/containers/ElectionCardComponent.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import ProfileCardComponent from './ProfileCardComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TimelineComponent from '@/components/design-system/containers/TimelineComponent.vue';
import TimelineItemComponent from '@/components/design-system/containers/TimelineItemComponent.vue';

const electionData = {
  electionName: 'Senátní volby',
  electionDateFrom: '23.',
  electionDateTo: '24. září 2023',
  candidates: [
    {
      name: 'Miluše Politická',
      party: 'Koalice pro práva občanů',
      percentage: 95,
      image: 'https://thispersondoesnotexist.com/image',
    },
    {
      name: 'Petr Apolitický',
      party: 'Koalice pro práva občanů',
      percentage: 93,
      image: 'https://thispersondoesnotexist.com/image',
    },
  ],
  updated: '12. 3. 2023',
};
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
        <StackComponent spacing="medium">
          <ProfileCardComponent
            name="Jan Novák"
            email="jannovak@gmail.com"
            class="w-full"
          />

          <HeadlineText tag="h1" size="extra-small">
            Moje kalkulačky
          </HeadlineText>
        </StackComponent>
      </ResponsiveWrapper>

      <StackComponent spacing="large">
        <ResponsiveWrapper medium large extra-large huge>
          <StackComponent
            spacing="large"
            horizontal
            spaceBetween
            class="w-full"
          >
            <HeadlineText tag="h1" size="small"> Moje kalkulačky </HeadlineText>

            <ProfileCardComponent name="Jan Novák" email="jannovak@gmail.com" />
          </StackComponent>
        </ResponsiveWrapper>

        <TimelineComponent class="w-full">
          <TimelineItemComponent v-for="a in 1" v-bind:key="a">
            <ElectionCardComponent
              :electionName="electionData.electionName"
              :electionDateFrom="electionData.electionDateFrom"
              :electionDateTo="electionData.electionDateTo"
              :candidates="electionData.candidates"
              :updated="electionData.updated"
            />
          </TimelineItemComponent>

          <TimelineItemComponent last>
            <BodyText size="small">
              Žádné další vyplněné kalkulačky v roce 2023
            </BodyText>
          </TimelineItemComponent>
        </TimelineComponent>
      </StackComponent>
    </StaticContentLayout>

    <StaticContentLayout>
      <DonateBlock />
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}

.main {
  padding-top: 15%;
  padding-bottom: 15%;

  @media (min-width: 767px) {
    padding-top: 6%;
    padding-bottom: 6%;
  }
}
</style>
