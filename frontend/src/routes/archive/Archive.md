<script setup lang="ts">
import { mdiArrowDown, mdiArrowRight, mdiEmailOutline } from '@mdi/js';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import BlobComponent from '@/components/design-system/style/BlobComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import DonateBlock from '@/components/DonateBlock.vue';
import FooterMultiWord from '@/components/FooterMultiWord.vue';
import FormComponent from '@/components/design-system/input/FormComponent.vue';
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import MasonryGrid from '@/components/design-system/layout/MasonryGrid.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import StaticContentLayout from '@/components/layouts/StaticContentLayout.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
</script>

Poslední volby se v Česku konaly před rokem a půl – prezidentské v lednu 2023. A tedy i prezidentská kalkulačka byla až do teď ta poslední.

Ale spustili jsme od té doby spoustu kalkulaček [na Slovensku](https://volebnakalkulacka.sk), [v Rakousku](https://wahlrechner.at) a [Maďarsku](https://voksmonitor.hu).

Společně s prezidentskou kalkulačkou jsme chtěli přidat funkci profilu, abyste se mohli k výsledkům svých kalkulaček vracet. Bohužel jsme v tom trochu přecenili síly a tak jsme pro evropské volby museli udělat malý krok zpět a spustit evropskou kalkulačku odděleně, bez profilu.

Možnost **přihlásit se** do svého profilu a **prezidentskou, senátní a komunální** kalkulačku tak teď najdete v **[archivu](https://archiv.volebnikalkulacka.cz)** na adrese [archiv.volebnikalkulacka.cz](https://archiv.volebnikalkulacka.cz).

Máme v plánu kalkulačky zase sloučit a pro krajské a senátní, ale hlavně parlamentní volby příští rok chystáme další vylepšení, aby kalkulačka byla ještě lepší, než kdy dřív. Nechcete nám s tím pomoct? Pokud byste chtěli pomoct jako dobrovolník, ozvěte se nám na [info@kohovolit.eu](mailto:info@kohovolit.eu) nebo budeme rádi, když nás [podpoříte](https://www.darujme.cz/darovat/1200653) finančně.

<br />

<MasonryGrid style="align-self: stretch">
   <CardComponent corner="top-right" padding="medium" border shadow>
   <div class="card-content">
      <div class="card-content-text">
         <TitleText tag="h3" size="medium"
         >Prezidentské volby 2023</TitleText
         >
         <BodyText size="medium"
         >Volby prezidenta České republiky 2023, 42 otázek, cca 10
         minut</BodyText
         >
      </div>
      <ButtonComponent
         kind="filled"
         color="primary"
         tag="a"
         href="https://archiv.volebnikalkulacka.cz/volby/prezidentske-2023/pro-kazdeho/navod"
      >
         Spustit kalkulačku pro 1. kolo
         <template #iconAfter>
         <IconComponent :icon="mdiArrowRight" />
         </template>
      </ButtonComponent>
   </div>
   </CardComponent>
   <CardComponent corner="top-right" padding="medium" border shadow>
   <div class="card-content">
      <div class="card-content-text">
         <TitleText tag="h3" size="medium"
         >Prezidentské volby 2023: 2. kolo</TitleText
         >
         <BodyText size="medium"
         >Volební kalkulačka pro 2. kolo, 20 otázek, cca 5
         minut</BodyText
         >
      </div>
      <ButtonComponent
         kind="outlined"
         color="primary"
         tag="a"
         href="https://archiv.volebnikalkulacka.cz/volby/prezidentske-2023/pro-kazdeho-2-kolo/navod"
      >
         Spustit kalkulačku
         <template #iconAfter>
         <IconComponent :icon="mdiArrowRight" />
         </template>
      </ButtonComponent>
   </div>
   </CardComponent>
   <CardComponent corner="top-right" padding="medium" border shadow>
   <div class="card-content">
      <div class="card-content-text">
         <TitleText tag="h3" size="medium"
         >Prezidentské volby 2023: pro nadšence</TitleText
         >
         <BodyText size="medium"
         >Všech 98 otázek, které jsme položili prezidentským
         kandidátům.
         </BodyText>
      </div>
      <ButtonComponent
         kind="outlined"
         color="primary"
         tag="a"
         href="https://archiv.volebnikalkulacka.cz/volby/prezidentske-2023/pro-nadsence/navod"
      >
         Spustit kalkulačku
         <template #iconAfter>
         <IconComponent :icon="mdiArrowRight" />
         </template>
      </ButtonComponent>
   </div>
   </CardComponent>
   <CardComponent corner="top-right" padding="medium" border shadow>
   <div class="card-content">
      <div class="card-content-text">
         <TitleText tag="h3" size="medium"
         >Prezidentské volby 2023: pro mladé</TitleText
         >
         <BodyText size="medium"
         >Otázky, které rezonují mladou generací.<br />
         Ve spolupráci s projektem
         <a href="https://www.nazorypolitiku.cz" target="_blank">
            NázoryPolitiků.cz </a
         >.</BodyText
         >
      </div>
      <ButtonComponent
         kind="outlined"
         color="primary"
         tag="a"
         href="https://archiv.volebnikalkulacka.cz/volby/prezidentske-2023/pro-mlade/navod"
      >
         Spustit kalkulačku
         <template #iconAfter>
         <IconComponent :icon="mdiArrowRight" />
         </template>
      </ButtonComponent>
   </div>
   </CardComponent>
   <CardComponent corner="top-right" padding="medium" border shadow>
   <div class="card-content">
      <div class="card-content-text">
         <TitleText tag="h3" size="medium"
         >Komunální volby 2022</TitleText
         >
         <BodyText size="medium"
         >K dispozici jsou kalkulačky pro vybraná města.</BodyText
         >
         <div class="divider" />
         <BodyText size="small"
         >Komunální kalkulačku vyplnilo přes 100 tisíc lidí.</BodyText
         >
      </div>
      <ButtonComponent
         kind="filled"
         color="primary"
         href="https://archiv.volebnikalkulacka.cz/volby/komunalni-2022/vyber"
         >Spustit kalkulačku</ButtonComponent
      >
   </div>
   </CardComponent>
   <CardComponent corner="top-left" padding="medium" border shadow>
   <div class="card-content">
      <div class="card-content-text">
         <TitleText tag="h3" size="medium">Senátní volby 2022</TitleText>
         <BodyText size="medium"
         >Pro jednotlivé volební obvody.</BodyText
         >
         <BodyText size="medium"
         ><a
            href="https://2022.programydovoleb.cz/senatni-volby#kde-se-letos-voli"
            >Více o senátních obvodech</a
         ></BodyText
         >
      </div>
      <div class="divider" />
      <BodyText size="small"
         >Senátní kalkulačku vyplnilo přes 25 tisíc lidí.</BodyText
      >
      <ButtonComponent
         color="primary"
         kind="filled"
         href="https://archiv.volebnikalkulacka.cz/volby/senatni-2022/vyber"
         >Spustit kalkulačku</ButtonComponent
      >
   </div>
   </CardComponent>
</MasonryGrid>