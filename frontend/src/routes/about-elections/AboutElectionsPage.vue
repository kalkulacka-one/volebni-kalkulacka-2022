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
        <HeadlineText tag="h1" size="large">O volbách</HeadlineText>
        <BodyText size="large">
          Nejen koho a jak často volíme, ale také v čem se jednotlivé volby liší
          v čem jsou stejné, ale i na co si dát pozor při volbě - vše podstatné
          jsme shrnuli na této stránce.
        </BodyText>

        <HeadlineText id="komunalni" size="medium" tag="h2">
          Komunální volby
        </HeadlineText>
        <BodyText size="large">
          V komunálních volbách volíme zastupitelstvo jednotlivých obcí. To se
          stará o město či vesnici v určitých otázkách. A co dělá
          zastupitelstvo? Schvaluje rozpočet a závěrečný účet obce, podává
          místní vyhlášky, spravuje obecní majetek či zřizovat obecní policii.
        </BodyText>
        <BodyText size="large">
          Zastupitelstvu se pak odpovídá Rada, které si můžeme představit jako
          vládou obce. V čele má starostu nebo hejtmana v obci zastupuje
          výkonnou moc. V malých obcích funkci Rady vykonává starosta.
        </BodyText>

        <TitleText size="large" tag="h3"> Koho volíme? </TitleText>
        <BodyText size="large">
          Volíme zastupitelstvo obce. Počet volených zastupitelů je 5 až 55 a
          liší se podle velikosti obce.
        </BodyText>
        <BodyText size="large">
          Kandidovat můžou státem registrovaná politická uskupení i nezávislí
          kandidáti či uskupení nezávislých kandidátů. Nezávislí kandidáti musí
          odevzdat také petici od občanů obce podporující kandidaturu. Počet
          podpisů se liší podle velikosti obce.
        </BodyText>
        <BodyText size="large">
          Kandidovat může občan České republiky a to v rámci volebního obvodu,
          ve kterém má trvalé bydliště. Věkový limit je 18 let. Za stejných
          podmínek mohou kandidovat i občané ostatních zemí Evropské unie pokud
          mají v obci přechodný nebo trvalý pobyt.
        </BodyText>

        <TitleText size="large" tag="h3">
          Průběh voleb a rozdělení mandátů?
        </TitleText>
        <BodyText size="large">
          Volební lístky jsou jiné než je známe z ostatních voleb v Česku.Volič
          dává svůj hlas buď konkrétní kandidátní listině nebo kandidátům napříč
          kandidující stranami. V tomto případě se křížkuje.
        </BodyText>
        <BodyText size="large">
          Křížků pro jednotlivce může být maximálně tolik, kolik je v obci
          voleno zastupitelů. Pokud volič křížkuje jen jednu kandidující stran,
          každý člen strany získává jeden hlas.
        </BodyText>
        <BodyText size="large">
          Rozdělení křesel je poměrné. Zisk strany je součtem hlasů pro
          jednotlivé členy kandidátní listiny. Stranám se pak rozdělují hlasy
          podle toho, kolik procent hlasů získali. Pořadí členů kandidátních
          listin se mění jen v případě, že některý z kandidátu získal alespoň o
          10 % více hlasů, než je průměr strany.
        </BodyText>
        <BodyText size="large">
          Ještě v jedné věci se volby liší od ostatních. Při komunálních voleb
          není možné využít volební průkaz.
        </BodyText>

        <TitleText size="large" tag="h3"> Volby a finance </TitleText>
        <BodyText size="large">
          V komunálních volbách není povinnost zřídit transparentní účet ani
          není stanoven limit na kampaň. Za podanou kandidaturu ve volbách se v
          tomto případě neplatí poplatek.
        </BodyText>
        <BodyText size="large">
          Nevyplácí se příspěvek za hlas ani roční příspěvek za mandát. Výjimkou
          je Praha, kde jsou mandáty získané v těchto volbách financovány ročním
          příspěvek 250 000 Kč, stejně jako v krajských zastupitelstvích.
        </BodyText>

        <TitleText size="large" tag="h3">
          Nejčastější důvody neplatných hlasů
        </TitleText>
        <BodyText size="large">
          Ve volbách musí být označen aspoň jeden kandidát nebo přesně jedna
          kandidátní listina, případně jejich kombinace. Pokud není označen
          nikdo, hlas je neplatný.
        </BodyText>
        <BodyText size="large">
          Hlas je neplatný i pokud je na volebních lístku zakřížkováno více
          kandidátních listin či počet zakřížkovoných kandidátů je vyšší než je
          voleno zastupitelů.
        </BodyText>
        <BodyText size="large">
          Hlas musí být odevzdát v úředně označené obálce, kterou dostanete ve
          volební místnosti.
        </BodyText>
        <BodyText size="large">
          Komunální volby se v některých volebních obvodech konají souběžně s
          volbami do Senátu, případně i zároveň s místními referendy. Jednotlivé
          volby se liší barvou obálky. Pokud je hlas ve špatné obálce, je
          neplatný.
        </BodyText>
        <BodyText size="large">
          V případě, že je odevzdaná prázdná obálka, je tento hlas neplatný.
        </BodyText>
        <HeadlineText size="medium" tag="h2">
          <a id="senatni" name="senatni" />Senátní volby
        </HeadlineText>
        <BodyText size="large">
          Senát je horní komorou Parlamentu České republiky. Do Senátu míří ke
          schválení zákony, které v rámci legislativního procesu schválí
          Poslanecká sněmovna. Senát však nemá právo zákon vetovat, v případě
          neschválení jej vrací Poslanecké sněmovně s připomínkami.
        </BodyText>
        <BodyText size="large">
          Dále Senát může podat žalobu k Ústavnímu soudu na prezidenta republiky
          za velezradu, dává souhlas k podpisu mezinárodních smluv, či vyslovuje
          souhlas s jmenováním ústavních soudců i představitelů dalších
          institucí, jako je ombudsman.
        </BodyText>

        <TitleText size="large" tag="h3"> Koho volíme? </TitleText>
        <BodyText size="large">
          V Senátu je celkem 81 mandátů. Třetina, tedy 27 senátorů je volena
          každé 2 roky. Funkční období senátorů je 6 let.
        </BodyText>
        <BodyText size="large">
          Volebních obvodů do Senátu je v Česku stejně jako mandátů 81. Každý
          senátor zastupuje jeden volební obvod.
        </BodyText>
        <BodyText size="large">
          Do voleb kandidují jednotliví kandidáti, kteří mohou být nominovaní
          existující stranou, hnutím nebo koalicí. Případně může kandidovat i
          nezávislý kandidát, který musí pospírat 1 000 podpisů od voličů v jeho
          volebním obvodě.
        </BodyText>
        <BodyText size="large">
          Kandidovat mohou občané České republiky a to v rámci volebního obvodu,
          ve kterém mají trvalé bydliště. Věkový limit je 40 let.
        </BodyText>

        <TitleText size="large" tag="h3">
          Průběh voleb a rozdělení mandátů?
        </TitleText>
        <BodyText size="large">
          Volič dává svůj hlas konkrétnímu kandidátovi.
        </BodyText>
        <BodyText size="large">
          Ve volbách do Senátu se uplatňuje většinový systém, vyhrává kandidát s
          nejvyšším počtem hlasů, v tomto případě musí překročit 50 % hranici.
          Volby jsou dvoukolové. Pokud v prvním kole v daném volební obvodu
          nezíská nikdo z kandidátů 50% většinu hlasů, postupují do druhého kola
          dva kandidáti s největším počtem hlasů.
        </BodyText>
        <BodyText size="large">
          Při volbách do Senátu je možné si vyřídit voličský průkaz. Díky němu
          může volič volit v jakékoliv volebním místnosti v rámci svého
          volebního obvodu.
        </BodyText>

        <TitleText size="large" tag="h3"> Volby a finance </TitleText>
        <BodyText size="large">
          Kandidáti mají finanční limit na volební kampaň a to 2 miliony korun
          českých. V případě postupu do druhého kola se tento limit navyšuje o
          500 000 Kč. Rozdělení financí mezi kampaně v obou kolech není určeno.
          Za podanou kandidaturu ve volbách musí kandidát zaplatit příspěvek 20
          000 Kč.
        </BodyText>
        <BodyText size="large">
          V Senátních volbách se nevyplácí příspěvek za hlas. Strany ale
          dostávají roční příspěvek 900 000 Kč za mandát.
        </BodyText>

        <TitleText size="large" tag="h3">
          Nejčastější důvody neplatných hlasů
        </TitleText>
        <BodyText size="large">
          Ve volbách je možné volit jen jednoho kandidáta. Pokud jsou v obálce
          dva a více kandidátů, hlas je neplatný.
        </BodyText>
        <BodyText size="large">
          Hlas musí být odevzdat v úředně označené obálce, kterou dostanete
          přímo ve volební místnosti.
        </BodyText>
        <BodyText size="large">
          První kolo senátních voleb se koná souběžně s volbami do krajských
          nebo obecních zastupitelstev, případně i s místními referendy.
          Jednotlivé volby se liší barvou obálky. Pokud je hlas ve špatné
          obálce, je neplatný.
        </BodyText>
        <BodyText size="large">
          V případě, že je odevzdaná prázdná obálka, je tento hlas neplatný.
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
