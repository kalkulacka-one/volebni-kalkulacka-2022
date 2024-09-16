<script setup lang="ts">
import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import LogoComponent from '@/components/design-system/style/LogoComponent.vue';
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
        <HeadlineText tag="h1" size="large">Impressum</HeadlineText>
        <BodyText size="large">
          Wahlrechner.at ist eine zivilgesellschaftliche Initiative der Organisationen KohoVolit.eu, wahlbeobachtung.org, PolEdu - Politics &amp; Education und BIZEPS - Zentrum für selbstbestimmtes Leben.
        </BodyText>
        <BodyText size="large">
          Es ist ein überparteiliches Instrument, das Wähler:innen hilft, sich vor der Wahl umfassend über die Positionen der kandidierenden Parteien zu informieren.
        </BodyText>
        <TitleText size="large" tag="h2">Inhaberin der Website</TitleText>
        <BodyText size="large">
          KohoVolit.eu, ID 22841890 (Tschechische Republik)<br />
          www.kohovolit.eu<br />
          +43 690 10 26 31 60 (Michal Škop)<br />
          info@kohovolit.eu<br />
        </BodyText>

        <TitleText size="large" tag="h2">Für den Inhalt verantwortlich</TitleText>
        <BodyText size="large">
          <ul>
            <li>Paul Grohma</li>
            <li>Manuel Köllner</li>
            <li>Kateřina Mahdalová</li>
            <li>Christian Pöltl-Dienst</li>
            <li>Armin Rabitsch</li>
            <li>Michal Škop</li>
          </ul>
        </BodyText>

      </StackComponent>
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.section {
  padding: 40px 0;
}
</style>
