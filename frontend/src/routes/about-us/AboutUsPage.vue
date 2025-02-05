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
        <HeadlineText tag="h1" size="large">Rreth Kalkulatorit Zgjedhor</HeadlineText>
        <BodyText size="large">
          Udhëzuesi për votuesit në Kosovë
        </BodyText>

        <TitleText size="large" tag="h2"> Misioni </TitleText>
        <BodyText size="large">
          Demokracia e Austrisë ka nevojë për një mbështetje të paanshme, të 
          ekuilibruar, të aksesueshme dhe të bazuar shkencërisht për votuesit. 
          Veçanërisht, votuesit për herë të parë kanë nevojë për udhëzime 
          orientuese.
        </BodyText>
        <BodyText size="large">
          Për këtë qëllim, organizatat e mëposhtme nga shoqëria civile dhe 
          akademia janë bashkuar për të zhvilluar një udhëzues të ri për 
          votuesit në Kosovë (Voting Advice Application, VAA):
        </BodyText>
        <BodyText size="large">
          <ul>
            <li>KohoVolit.eu</li>
            <li>Open Data Kosovo</li>
            <li>Polcon</li>
          </ul>
        </BodyText>
        <TitleText size="large" tag="h2">
          Si funksionon Kalkulatori Zgjedhor?
        </TitleText>
        <BodyText size="large">
          Kalkulatori Zgjedhor është një mjet interaktiv online me qëllim 
          informimin e përdoruesve mbi çështjet më të rëndësishme (shoqërore
           dhe politike) të periudhës aktuale zgjedhore dhe ofrimin e një 
           udhëzuesi mbi qëndrimet e partive. 
        </BodyText>
        <BodyText size="large">
          Kalkulatori Zgjedhor u paraqet përdoruesve rreth 20 pyetje, të 
          cilave ata mund t'u përgjigjen me 'Po' ose 'Jo'. Përveç kësaj,
           mund të zgjidhet edhe opsioni 'Nuk e di/Vazhdo'. Të dhënat e 
           përdoruesve krahasohen me qëndrimet e partive dhe ata marrin një 
           rezultat që tregon sa përputhen përgjigjet e tyre me ato të partive. 
        </BodyText>
        <TitleText size="large" tag="h2">
          Si e garanton Kalkulatori Zgjedhor pavarësinë dhe balancën e tij politike?
        </TitleText>
        <BodyText size="large">
          Programi nuk ruan të dhëna personale, duke siguruar kështu anonimitetin
           e përdoruesve. Bazuar në përgjigjet 'Po/Jo' ose 'Nuk e di/Vazhdo', 
           përdoruesit mund të krahasojnë përputhshmërinë ose mospërputhshmërinë 
           përqindësisht midis qëndrimeve të tyre dhe atyre të partive, të 
           cilat pas plotësimit të pyetësorit përmblidhen në një diagram me 
           përqindje dhe një renditje. Programi llogarit shkallën e 
           përputhshmërisë ose mospërputhshmërisë duke përdorur një ekuacion 
           matematikor.
        </BodyText>
        <BodyText size="large">
          Në varësi të përgjigjeve, gjenerohen vlera të ndryshme. Vlera është 
          1 nëse përgjigjet e partive dhe të përdoruesve janë identike dhe -1 
          nëse përgjigjet janë të ndryshme. Përgjigjet 'Nuk e di/Vazhdo' dhe 
          kalimi i pyetjeve, pra nëse përdoruesit nuk zgjedhin asnjë nga 
          opsionet e përgjigjeve për një ose më shumë pyetje, këto pyetje nuk 
          përfshihen në përllogaritje. Në fund, programi i njofton përdoruesit 
          se rezultati është llogaritur bazuar në pyetjet e përgjigjura me 
          'Po' ose 'Jo'.
        </BodyText>
        <BodyText size="large">
          Për zhvilluesit e Kalkulatorit Zgjedhor, detyra e parë dhe më e 
          rëndësishme ishte përcaktimi i parimeve dhe objektivave të 
          programit, përkatësisht shkencorësia, objektiviteti dhe 
          neutraliteti politik.
        </BodyText>
        <TitleText size="large" tag="h2">
          Si financohet Kalkulatori Zgjedhor?
        </TitleText>
        <BodyText size="large">
          Kalkulatori Zgjedhor financohet nga disa burime: një grant nga 
          Visegrad Fund, organizatat pjesëmarrëse dhe crowdfunding-u.
        </BodyText>
        <TitleText size="large" tag="h2">
          Si llogaritet përputhshmëria?
        </TitleText>
        <BodyText size="large">
          Një shembull:<br />
          Nëse përgjigjeni me ✅ "Për" në 42 pyetje dhe një parti ka votuar 
          ✅ "Për" 37 herë, është shprehur neutrale 2 herë dhe ka votuar 
          ❌ "Kundër" 3 herë, llogaritja është si më poshtë:<br />
          37x Përputhje (Ju keni zgjedhur ✅ "Për", partia gjithashtu ✅ "Për") = 37 pikë<br />
          2x Neutralitet (Ju keni zgjedhur ✅ "Për", partia është neutrale) = 0 pikë<br />
          3x Mospërputhje (Ju keni zgjedhur ✅ "Për", partia ❌ "Kundër") = -3 pikë<br />

          Rezultati për këtë parti: 34 pikë<br />
          Numri i pyetjeve të përgjigjura: 42<br />

          Kalkulatori e shndërron këtë rezultat në një përqindje (0% - 100%) duke përdorur formulën:<br />
          ((34 / 42) + 1) / 2 ∗ 100% = <strong>90 %</strong><br />
        </BodyText>
      </StackComponent>
      <DonateBlock />
      <img class="v4-logo" :src="'/images/logo-visegrad.svg'">
      <FooterMultiWord />
    </StaticContentLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.section {
  padding: 40px 0;
}
.v4-logo {
  height: 130px;
  width: 290px;
}
</style>
