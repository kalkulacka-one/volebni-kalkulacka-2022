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
        <HeadlineText tag="h1" size="large">O kalkulačce</HeadlineText>
        <BodyText size="large">
          Volební kalkulačka® (anglicky voting advice application) je
          jednoduchý, zpravidla internetový test porovnávající Vaše politické
          postoje s postoji politických stran či osob (zákonodárců, kandidátů ve
          volbách atd.). Více o historii volebních kalkulaček a o úspěšných
          příkladech ze světa se můžete dočíst na Wikipedii.
        </BodyText>
        <BodyText size="large">
          Českou a slovenskou Volební kalkulačku vyvíjí a provozuje spolek
          KohoVolit.eu již od roku 2006. Celkem jsme vytvořili již přes 30
          volebních kalkulaček pro všechny druhy voleb (evropské, prezidentské,
          parlamentní, regionální i komunální). Pravidelně také pomáháme tvožit
          kalkulačky v Maďarsku a v dalších zemích. Zatím nejúspěšnější
          kalkulačku před prvním kolem prezidentských voleb v ČR v roce 2018
          použil více než 1.25 milionu voličů.
        </BodyText>
        <TitleText size="large" tag="h2"> Tvorba otázek </TitleText>
        <BodyText size="large">
          Volič vybírá jednu stranu nebo hnutí. Na daném volebním lístku může
          dát až 4 preferenční hlasy. Přepočet hlasů - od roku 2021 se pro
          přepočet používá Imperialiho kvóta a systém je poměrný, tedy strany,
          která překročí minimální hranici získaných hlasů pro vstup do
          Poslanecké sněmovny PČR si rozdělí mandáty poměrně podle získaných
          hlasů. Přepočet preferenčních hlasů - pokud kandídát získá preferenční
          hlas od alespoň 5 % voličů strany v daném obvodě, přeskakuje pořadí na
          1. místo. Volby v zahraničí - ve volbách do poslanecké sněmovny je
          možné volit na zahraničních zastupitelských orgánech. Volební obvod,
          ke kterému se hlasy připočítávají se volí losem. Voličský průkaz -
          pokud si volič vyřídí voličský průkaz, může volit v kterékoliv volební
          místnosti v Česku i zahraničí.
        </BodyText>
        <TitleText size="large" tag="h2"> Sběr otázek </TitleText>
        <BodyText size="large">
          Volič vybírá jednu stranu nebo hnutí. Na daném volebním lístku může
          dát až 4 Ve volbách můžete volit vždy jen pro jednu stranu, hnutí či
          koalici. Pokud je ve volební obálce více hlasů, hlas je neplatný. Při
          kroužkování je možné započítat maximálně 4 preferenční hlasy, pokud
          jich je více, hlasy jsou neplatné. Pokud by volič upravoval nebo
          dopisoval na hlasovací lístek, nemá to na platnost vliv. Platný je jen
          hlas v úředně označené obálce - té, kterou vám dají až ve volební
          místnoti. Pozor na obálky v případě souběžnosti voleb například s
          městským referendem - ty se liší barevně a v případě, že je volič
          zamění, jeho hlasy jsou neplatné
        </BodyText>
        <TitleText size="large" tag="h2"> Počítání výsledků </TitleText>
        <BodyText size="large">
          Kandidující subjekty mají na převolební kampaň limit 90 milionů korun
          českých. Pro financování kampaně musí být zřízen transparentní
          bankovní účet.
        </BodyText>
        <BodyText size="large">
          Za podanou kandidátní listinu strana platí 19 000 Kč. Pokud strana
          kandiduje ve všech 14 krajích, vyjde ji to na 266 000 Kč.
        </BodyText>
        <BodyText size="large">
          Po volbách strana, hnutí či koalice, která získá alespoň 1,5 % hlasů v
          rámci celé republiky, obdrží za každý platný hlas 100 Kč. V roce 2021
          to znameno 537í.
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
