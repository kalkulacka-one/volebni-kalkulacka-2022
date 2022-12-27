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
import MarkdownIt from '@/components/utilities/MarkdownIt.vue';

const content = `
## 1. Otázka se musí týkat toho, co mají zvolení politici šanci ovlivnit.

- ČR by měla vystoupit z EU. (otázka v krajských volbách)
- ČR by měla vystoupit z EU. (otázka v celostátních volbách)
- Chtěl/a bych, aby se v příštích volbách Praha vrátila k systému jediného volebního obvodu (otázka v pražských volbách)

## 2. Na otázku musí jít odpovědět ano i ne a neměla by navádět k odpovědi.

Při tvorbě si musíme umět představit lidi, kteří vybírají obě varianty odpovědi, ano i ne. Z otázky by také nemělo být poznat, jak na ni odpovídá sám autor otázky.

- Měla by se zlepšit dopravní situace v městských částech Považský Chlmec a Vranie?
- Chtěl/a bych, aby Opencard nebyla pro cestující cenově výhodnější oproti „papírové tramvajence“, aby si cestující mohli vybrat. (“aby si mohli vybrat” navádí k odpovědi)
- Měla by se vybudovat oddychová zóna pri Rajčianke? (pouze za předpokladu, že “každý” ví, o co jde, diskutovalo se o tom po městě hodně, ví se, kolik by to stálo, apod.)
- Mělo by se alespoň 1% z rozpočtu města určeného na dopravu vyčlenit na cyklistickou dopravu?


## 3. Otázky mají být důležité

Bereme např. v potaz, na co vydává dané zastupitelstvo/parlament nejvíce veřejných peněz.

Témata vybíráme tak, aby byla relevantní pro všechny skupiny voličů (věkové, příjmové, zájmové).

- Mělo se město omluvit pí. Lorenzové a p. Cejthamrovi za výroky, které při této konfrontaci byly vysloveny?
- Hlasovali byste za zrušení garance a automatický vstup do druhého pilíře?
- Hlasovali byste za dúvěru vládě a permanentní euroval?

## 4. Otázka má být co nejkonkrétnější

Jde nám o to, aby se dala odpověď zkontrolovat po 4 letech/na konci volebního období.

- Mala by sa zahušťovat výstavba v centru města?
- Podle mého názoru by z letiště Ruzyně do centra Prahy měla vést rychlodráha (správně by bylo: Budu prosazovat/chci, aby se rychlodráha z letiště do centra Prahy začala budovat v následujících 4 letech)
- Měla by se zvýšit dotace pro MHD minimálně o 10% oproti roku 2010?

## 5. Otázka musí být krátká a srozumitelná

Chceme, aby tázaný/á otázky opravdu pročetl/a a porozuměl/a jim. Formulujeme je tedy o max. délce 20 slov, případný popis omezujeme na 50 slov.

- Hlasovali byste pro:
 	zrušení sociálního příplatku pro sólo rodiče,

 	redukci dávky – porodného jen na nízkopříjmové rodiče,

 	jednotnou celkovou vyplacenou částku rodičovského příspěvku (220 000) a větší

	flexibilitu ve volbě výše a délky RP,

 	snížení příspěvku na péči,

 	snížení podpory v nezaměstnanosti a zrušení možnosti minimálního přivýdělku k

 	podpoře,

 	zavedení příspěvku pro začínající podnikatele/ky,

 	zpřísnění podmínek nároku na nemocenské a mateřskou u OSVČ?

- Souhlasím se zavedením turniketů do metra.

## 6. Otázky s popisem musejí dávat smysl i bez něj

Velký počet lidí totiž čte pouze otázku samotnou, ne její popis. Může se take stát, že popis na mobilním zařízení nezobrazí.

- Hlasovali by ste za zrušení garancie a automatický vstup do druhého pilíře?
- Má podle Vás smysl připojovat se k podobným projektům?
- Souhlasím se zpoplatněním vjezdu automobilů do centra města, například formou mýtného

## 7. Upřednostňujeme otázky v pozitivním tvaru, vyhýbáme se matoucí dvojité negaci.

Z příkladu níže je viditelné, že dvojitá negace je zavádějící a nepřesná.

- Na Vysočině by úložiště jaderného odpadu nemělo vzniknout za žádnou cenu.

Zde totiž není jasné, s čím tázaný/á nesouhlasí:

a) ne, nemělo by vzniknout,

b) nesouhlasím, mělo by vzniknout.


Správně formulována otázka by měla znít: “Měl by kraj učinit vše proti vzniku úložiště jaderného odpadu?”)

- Střední školy by se měly nadále slučovat do větších celků.

Nikoliv “Střední školy už by se nadále neměly slučovat do větších celků”.

## 8. Otázka musí být psána snadno pochopitelným jazykem

Otázky píšeme tak, aby ji a tématu porozuměli různé společenské skupiny.

- Nový územní plán musí regulovat výškovou výstavbu, která může poškodit panorama Prahy.
- Výstavba mrakodrapů v historickém centru má být zakázána.

## 9. Vybíráme i otázky, které jsou zajímavé, i když ne zcela důležité.

- Hlasovali by ste za (ironicky myslené) návrh farebne napovedať poslancom, ako hlasovať?
- Hlasovali byste pro zákon “Václav Havel se zasloužil o svobodu a demokracii.”?
`;
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
        <HeadlineText tag="h1" size="large"
          >Metodika výběru a tvorby otázek</HeadlineText
        >

        <BodyText size="medium">
          <MarkdownIt :markdown="content" />
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
ol {
  list-style-type: upper-alpha;
}
</style>
