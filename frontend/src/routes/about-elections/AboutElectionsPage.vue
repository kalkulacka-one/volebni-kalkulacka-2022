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
import TitleText from '@/components/design-system/typography/TitleText.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
      <StackComponent spacing="large" class="section">
        <HeadlineText tag="h1" size="large">{{
          $t('routes.about-elections.AboutElectionsPage.first-title')
        }}</HeadlineText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.first-text') }}
        </BodyText>

        <HeadlineText id="prezidentske" size="medium" tag="h2">{{
          $t('routes.about-elections.AboutElectionsPage.second-title')
        }}</HeadlineText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.second-text') }}
        </BodyText>
        <TitleText size="large" tag="h3">{{
          $t('routes.about-elections.AboutElectionsPage.third-title')
        }}</TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.third-text') }}
        </BodyText>

        <TitleText size="large" tag="h3">{{
          $t('routes.about-elections.AboutElectionsPage.fourth-title')
        }}</TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.fourth-text') }}
        </BodyText>

        <TitleText size="large" tag="h3">{{
          $t('routes.about-elections.AboutElectionsPage.fifth-title')
        }}</TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.fifth-text') }}
        </BodyText>
        <TitleText size="large" tag="h3">{{
          $t('routes.about-elections.AboutElectionsPage.sixth-title')
        }}</TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.sixth-text') }}
        </BodyText>

        <HeadlineText id="komunalni" size="medium" tag="h2">
          {{ $t('routes.about-elections.AboutElectionsPage.seventh-title') }}
        </HeadlineText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.seventh-text') }}
        </BodyText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.seventh-sub-text') }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{ $t('routes.about-elections.AboutElectionsPage.eighth-title') }}
        </TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.eighth-text') }}
        </BodyText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.eighth-sub-text') }}
        </BodyText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.eighth-sub-second-text'
            )
          }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{ $t('routes.about-elections.AboutElectionsPage.ninth-title') }}
        </TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.ninth-text') }}
        </BodyText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.ninth-sub-text') }}
        </BodyText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.ninth-sub-second-text'
            )
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.ninth-sub-third-text')
          }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{
            $t('routes.about-elections.AboutElectionsPage.tenth-title')
          }}</TitleText
        >
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.tenth-text') }}
        </BodyText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.tenth-sub-text') }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{ $t('routes.about-elections.AboutElectionsPage.eleventh-title') }}
        </TitleText>
        <BodyText size="large">
          {{ $t('routes.about-elections.AboutElectionsPage.eleventh-text') }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.eleventh-sub-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.elevent-sub-second-text'
            )
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.eleventh-sub-third-text'
            )
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.eleventh-sub-four-text'
            )
          }}
        </BodyText>
        <HeadlineText size="medium" tag="h2">
          <a id="senatni" name="senatni" />{{
            $t('routes.about-elections.AboutElectionsPage.senatni')
          }}
        </HeadlineText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.eleventh-sub-five-text'
            )
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t(
              'routes.about-elections.AboutElectionsPage.eleventh-sub-six-text'
            )
          }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{
            $t('routes.about-elections.AboutElectionsPage.twelfth-title')
          }}</TitleText
        >
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.twelfth-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.twelfth-sub-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.twelfth-sub-second-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.twelfth-sub-third-text')
          }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{
            $t('routes.about-elections.AboutElectionsPage.thirteenth-title')
          }}
        </TitleText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.thirteenth-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.thirteenth-sub-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.thirteenth-sub-second-text')
          }}
        </BodyText>

        <TitleText size="large" tag="h3"> {{
            $t('routes.about-elections.AboutElectionsPage.fourteenth-title')
          }} </TitleText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.fourteenth-text')
          }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.fourteenth-sub-text')
          }}
        </BodyText>

        <TitleText size="large" tag="h3">
          {{
            $t('routes.about-elections.AboutElectionsPage.fifteenth-title') }}
        </TitleText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.fifteenth-text') }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.fifteenth-sub-text') }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.fifteenth-sub-second-text') }}
        </BodyText>
        <BodyText size="large">
          {{
            $t('routes.about-elections.AboutElectionsPage.fifteenth-sub-third-text') }}
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
