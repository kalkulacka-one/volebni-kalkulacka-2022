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
        <HeadlineText tag="h1" size="large">O kalkulačke</HeadlineText>
        <BodyText size="large">
          Čo je to volebná kalkulačka? Ako sa dá použiť a ako funguje? Kto za
          ňou stojí? Ako sa vytvárajú a vyhodnocujú otázky? Všetko o nej sa
          dozviete nižšie.
        </BodyText>

        <TitleText size="large" tag="h2">Čo je to volebná kalkulačka</TitleText>
        <BodyText size="large">
          Volebná kalkulačka® (voting advice application) je jednoduchý,
          zvyčajne internetový test, ktorý porovnáva vaše politické postoje s
          postojmi politických strán alebo osôb (zákonodarcov, kandidátov vo
          voľbách atď.). Viac informácií o histórii volebných kalkulačiek a
          úspešných príkladoch z celého sveta si môžete prečítať na Wikipédii.
        </BodyText>

        <TitleText size="large" tag="h2">
          Kto a ako vytvára volebnú kalkulačku
        </TitleText>
        <BodyText size="large">
          Českú a slovenskú volebnú kalkulačku vyvíja a prevádzkuje spoločnosť
          <a href="https://kohovolit.eu/" target="_blank">KohoVolit.eu</a> od
          roku 2006. Celkovo sme vytvorili viac ako 100 volebných kalkulačiek
          pre všetky typy volieb (európske, prezidentské, parlamentné,
          regionálne a komunálne). Pravidelne pomáhame vytvárať kalkulačky aj v
          Maďarsku a ďalších krajinách. Doteraz najúspešnejšiu kalkulačku
          využili viac ako 2 milióny voličov pred prezidentskými voľbami v
          Českej republike v roku 2023.
        </BodyText>
        <BodyText size="large">
          <a href="https://kohovolit.eu/" target="_blank">KohoVolit.eu</a>
          vytvára dva typy kalkulačiek:
        </BodyText>
        <BodyText size="large">
          Volebná kalkulačka (názorový test) porovnáva vaše odpovede s
          odpoveďami, ktoré poskytli politické strany alebo samotní kandidáti.
          Ak niektorá strana alebo kandidát chýba, je to vždy preto, že sme
          odpovede nedostali.
        </BodyText>
        <BodyText size="large">
          Inventúra hlasovaní porovnáva vaše odpovede so skutočnými hlasovaniami
          v zákonodarnom zbore v uplynulom volebnom období.
        </BodyText>

        <TitleText size="large" tag="h2">Ako vytvárame otázky</TitleText>
        <BodyText size="large">
          Najmä vo volebnej kalkulačke je výber a formulácia otázok kľúčovým
          bodom. V záujme transparentnosti uvádzame náš dokument, ktorým sa
          riadi tvorba otázok:
          <router-link to="/metodika-tvorby-otazek">
            Metodika výberu tém a formulácie otázok.
          </router-link></BodyText
        ><BodyText size="large">
          V prevažnej väčšine prípadov zasielame stranám alebo kandidátom viac
          otázok, ako sa použije vo výslednej kalkulačke. Zvyčajne sa vyraďujú
          otázky, pri ktorých existuje zhoda medzi kandidátmi (t. j. takéto
          otázky nerozdeľujú kandidátov). Potom sa vyradia otázky, ktoré sa
          nepodarili (kandidáti správne upozornili na problém s otázkou alebo
          sme naň prišli sami po jej odoslaní), a otázky, ktoré sú podobné iným.
        </BodyText>

        <TitleText size="large" tag="h2">Ako hodnotíme zhodu</TitleText>
        <BodyText size="large">
          Otázka, na ktorú neodpoviete "áno" alebo "nie", sa do výpočtu
          nezapočítava. Ak na otázku odpoviete "Áno", strany alebo kandidáti,
          ktorí tiež odpovedali "Áno", získajú jeden bod. Strany alebo
          kandidáti, ktorí odpovedia "Nie", strácajú jeden bod. Ak odpoviete
          "Nie", strany alebo kandidáti, ktorí tiež odpovedali "Nie", získajú
          jeden bod. Tí, ktorí odpovedia "Áno", strácajú jeden bod. Strany alebo
          kandidáti, ktorí neodpovedali "Áno" alebo "Nie", nezískavajú ani
          nestrácajú žiadne body.
        </BodyText>
        <BodyText size="large">
          Potom sa pre každú stranu alebo kandidáta spočítajú body za všetky
          otázky, na ktoré ste odpovedali "áno" alebo "nie", a výsledok sa
          vydelí počtom takýchto otázok. Takto sa získa zhoda medzi -100 % a 100
          %. Kvôli pohodlnosti sa zhoda prepočíta na rozsah od 0 % do 100 %
          vydelením dvoma a pripočítaním 50 % (pre kalkulačky od polovice roka
          2013).
        </BodyText>

        <TitleText size="large" tag="h2">
          Dôležitosť otázok a hlasovania
        </TitleText>
        <BodyText size="large">
          Pri každej otázke alebo hlasovaní máte možnosť nastaviť, aká dôležitá
          je pre vás zhoda, t. j. váhu, s akou má byť zahrnutá do celkového
          súčtu zhody. Každej z dvoch úrovní dôležitosti (normálna, vysoká) sa
          priradí váha a celkový konsenzus je potom váženým priemerom konsenzu v
          každej otázke alebo hlasovaní. V skutočnosti sa teda namiesto
          pripočítania alebo odpočítania jedného bodu ku konsenzu pripočíta
          alebo odpočíta váha príslušnej otázky alebo hlasovania a na konci sa
          vydelí nie počtom otázok alebo hlasov, ale súčtom absolútnych hodnôt
          ich váh. Spôsob stanovenia váh je taký, že vysoká dôležitosť má
          dvojnásobnú váhu v porovnaní s bežnou dôležitosťou.
        </BodyText>
        <BodyText size="large">
          Môže sa stať, že dosiahnete rovnakú zhodu s dvoma alebo viacerými
          stranami alebo osobami. V takom prípade sa poradie strán alebo osôb v
          zobrazení výslednej zhody určí náhodne.
        </BodyText>

        <TitleText tag="h2" size="large">História kalkulačky</TitleText>
        <BodyText size="large">
          Združenie KohoVolit.eu vytvára volebné kalkulačky od roku 2006 takmer
          pre každé voľby na všetkých úrovniach politickej súťaže (európske,
          prezidentské, parlamentné, regionálne a komunálne) v Českej republike,
          na Slovensku a v posledný rokoch aj v Maďarsku.
        </BodyText>
        <BodyText size="large">
          Celkovo pripravila približne 100 aplikácií. KohoVolit.eu je lídrom v
          oblasti volebných kalkulačiek v oboch krajinách a postupne zaviedol do
          českého a slovenského jazyka pojem "volebná kalkulačka" ako všeobecné
          označenie pre tento druh aplikácií.
        </BodyText>
        <BodyText size="large">
          Pojem volebná kalkulačka sa už vžil do politického myslenia občanov,
          médií i samotných politických subjektov.
        </BodyText>

        <TitleText size="large" tag="h2">
          Významná aktualizácia s Česko.Digital (2022)
        </TitleText>
        <BodyText size="large">
          Vďaka niekoľkomesačnej spolupráci s komunitou odborných dobrovoľníkov
          <a href="https://cesko.digital" target="_blank">Česko.Digital</a> a
          angažovanosti niekoľkých desiatok nadšencov prešla kalkulačka v roku
          2022 zásadnými technickými a dizajnovými zmenami. Všetkým zúčastneným
          patrí obrovská vďaka.
        </BodyText>

        <BodyText size="large">
          <ul>
            <li>
              <a
                href="https://www.seznamzpravy.cz/autor/michal-skop-1250/"
                target="_blank"
                >Michal Škop</a
              >
              - KohoVolit.eu
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lucie-zatorska-81714350/"
                target="_blank"
                >Lucie Zátorská</a
              >
              - Scrum Master
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mwenisch/" target="_blank"
                >Martin Wenisch</a
              >
              - mentor Česko.Digital
            </li>
            <li>
              <a
                href="https://www.seznamzpravy.cz/autor/katerina-mahdalova-815"
                target="_blank"
                >Kateřina Mahdalová</a
              >
              - obsah a komunikace
            </li>
            <li>
              <a href="https://www.linkedin.com/in/krystofk/" target="_blank"
                >Kryštof Korb</a
              >
              - Tech Lead
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mwenisch/" target="_blank"
                >Gabriela Chladilová</a
              >
              - Support Česko.Digital
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/klara-scholleova/"
                target="_blank"
                >Klára Schoelleová</a
              >
              - UX/UI
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/natalia-bebjakova/"
                target="_blank"
                >Natália Bebjaková</a
              >
              - UX/UI
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ondrej-kyjanek-b24832a3/"
                target="_blank"
                >Ondřej Kyjánek</a
              >
              - Tech Team
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/pavel-vojacek-14420713/"
                target="_blank"
                >Pavel Vojáček</a
              >
              - Tech Team
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/martin-ladeck%C3%BD-9366ba5/"
                target="_blank"
                >Martin Ladecký</a
              >
              - Tech Team
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/martinmajlis/"
                target="_blank"
                >Martin Majliš</a
              >
              - Tech Team
            </li>
            <li>
              <a href="https://www.linkedin.com/in/tiborkulcar/" target="_blank"
                >Tibur Kulčár</a
              >
              - Tech Team
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lukasprikryl/"
                target="_blank"
                >Lukáš Přikryl</a
              >
              - Marketing Lead
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/pavla-radkova/"
                target="_blank"
                >Pavla Řádková</a
              >
              - UX Research
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/klara-vostinakova/"
                target="_blank"
                >Klára Vostiňáková</a
              >
              - komunikace
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/doroteja-stamenova-03a50924/"
                target="_blank"
                >Doroteja Stamenova</a
              >
              - UX/UI
            </li>
          </ul>
        </BodyText>

        <TitleText size="large" tag="h2">
          Spolprácia s Memo 98 a Infovolby.sk
        </TitleText>
        <BodyText size="large">
          Obsah volebnej kalkulačky pre parlamentné voľby 2023 sme vytvárali so
          združením <a href="https://memo98.sk" target="_blank">Memo 98</a> a
          projektom
          <a href="https://infovolby.sk" target="_blank">Infovolby.sk</a>.
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
