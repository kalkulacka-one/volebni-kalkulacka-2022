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
        <HeadlineText tag="h1" size="large">O kalkulačce</HeadlineText>
        <BodyText size="large">
          Volební kalkulačka® (anglicky voting advice application) je
          jednoduchý, zpravidla internetový test porovnávající Vaše politické
          postoje s postoji politických stran či osob (zákonodárců, kandidátů ve
          volbách atd.). Více o historii volebních kalkulaček a o úspěšných
          příkladech ze světa se můžete dočíst na
          <a href="https://cs.wikipedia.org/wiki/Volebn%C3%AD_kalkulačka"
            >Wikipedii</a
          >.
        </BodyText>
        <BodyText size="large">
          Českou a slovenskou Volební kalkulačku vyvíjí a provozuje spolek
          KohoVolit.eu již od roku 2006. Celkem jsme vytvořili již přes 30
          volebních kalkulaček pro všechny druhy voleb (evropské, prezidentské,
          parlamentní, regionální i komunální). Pravidelně také pomáháme tvořit
          kalkulačky v Maďarsku a v dalších zemích. Zatím nejúspěšnější
          kalkulačku před prvním kolem prezidentských voleb v ČR v roce 2018
          použil více než 1,25 milionu voličů.
        </BodyText>
        <BodyText size="large">
          KohoVolit.eu vytváří dva druhy kalkulaček: Inventura hlasování
          porovnává Vaše odpovědi s reálnými hlasováními v zákonodárném sboru za
          uplynulé funkční období. Volební kalkulačka (názorový test) porovnává
          Vaše odpovědi s odpověďmi, které nám poskytly samotné politické strany
          či kandidáti ve volbách. Pokud některá strana či kandidát v názorovém
          testu chybí, je to vždy proto, že jsme neobdrželi odpovědi.
        </BodyText>
        <BodyText size="large">
          Použitá loga politických stran a fotografie osob pochází z webových
          stránek politických stran, z Wikipedie nebo z webových stránek
          příslušeného zastupitelského sboru.
        </BodyText>

        <TitleText size="large" tag="h2"> Tvorba otázek </TitleText>
        <BodyText size="large">
          Obzvláště v názorovém testu ("volební kalkulačce") je výběr a
          formulace otázek klíčovým místem tvorby kalkulačky. Z důvodu
          tranpsarentnosti zde uvádíme náš dokument, kterým se při tvorbě otázek
          řídíme:
          <a
            href="https://docs.google.com/document/u/2/d/1JRCRWKQKCHnTCPfzSeeHsSAdEkHMga-vwpppYThA1j4/pub"
          >
            Metodika výběru témat a tvorby otázek
          </a></BodyText
        ><BodyText size="large">
          V naprosté většině případů názorového testu ("volební kalkulačky")
          stranám nebo kandidátům posíláme více otázek, než kolik se použije ve
          výsledné kalkulačce. Obvykle se vyřadí otázky, kde je u kandidátů
          shoda (tj. takové otázky nerozdělují kandidáty). Potom otázky, které
          se nepovedly (kandidáti správně upozorní na nějaký problém s otázkou,
          příp. na něj přijdeme sami až po odeslání), a otázky, které jsou
          podobné jako jiné.
        </BodyText>
        <TitleText size="large" tag="h2">
          Popis výpočtu shody se stranou nebo kandidátem
        </TitleText>
        <BodyText size="large">
          Otázka, u níž neodpovíte „Ano“ či „Ne“, se do výpočtu nezahrnuje.
          Pokud na otázku odpovíte „Ano“, strany či kandidáti, kteří rovněž
          odpověděli „Ano“, získávají jeden bod. Strany či kandidáti, kteří
          odpověděli „Ne“, jeden bod ztrácejí. Pokud odpovíte „Ne“, získávají
          jeden bod strany či kandidáti, kteří rovněž odpověděli „Ne“. Ti, kteří
          odpověděli „Ano“, naopak jeden bod ztrácejí. Strany či kandidáti,
          kteří na otázku neodpověděli „Ano“ ani „Ne“, nezískávají ani neztrácí
          žádné body.
        </BodyText>
        <BodyText size="large">
          Následně se každé straně či kandidátovi sečtou body za všechny otázky,
          u nichž jste odpověděli „Ano“ či „Ne“, a výsledek se vydělí počtem
          takových otázek. Tím je získána shoda v rozmezí -100 % až 100 %. Pro
          větší názornost se shoda převádí na rozmezí 0 % až 100 % tak, že se
          vydělí dvěma a přičte se k ní 50 % (u kalkulaček od poloviny roku
          2013).
        </BodyText>

        <TitleText size="large" tag="h2">
          Důležitost otázek a hlasování
        </TitleText>
        <BodyText size="large">
          U každé otázky či hlasování máte možnost nastavit, jakou pro Vás má
          shoda důležitost, tedy váhu s jakou se má zahrnout do celkového součtu
          shody. Každé ze dvou úrovní důležitosti (normální, vysoká) odpovídá
          jistá váha a celková shoda je pak váženým průměrem shody v
          jednotlivých otázkách či hlasováních. Ve skutečnosti se tedy místo
          jednoho bodu ke shodě přičte, resp. odečte váha příslušné otázky či
          hlasování a na konci se dělí nikoli počtem otázek či hlasování, ale
          součtem absolutních hodnot jejich vah. Nastavení vah je takové, že
          vysoká důležitost má oproti normální důležitosti dvojnásobnou váhu.
          Zobrazení výsledné shody
        </BodyText>
        <BodyText size="large">
          Může se stát, že Vám vyjde stejná shoda se dvěma nebo více stranami či
          osobami. V tom případě je pořadí stran či osob při zobrazení výsledné
          shody určeno náhodně.
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
