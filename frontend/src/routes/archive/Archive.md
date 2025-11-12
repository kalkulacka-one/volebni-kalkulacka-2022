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

Tato stránka slouží jako archiv starších volebních kalkulaček. Aktuální kalkulačku vždy najdete na hlavní adrese [www.volebnikalkulacka.cz](https://www.volebnikalkulacka.cz).



Archivní kalkulačky jsou stále plně funkční a můžete si je kdykoliv vyzkoušet a podívat se, s jakými kandidáty nebo stranami byste se shodli v minulých volbách.



**Archiv 2022–2023:** Kalkulačky z prezidentských, komunálních a senátních voleb najdete na [archiv.volebnikalkulacka.cz](https://archiv.volebnikalkulacka.cz).



**Co se stalo s profily?** Funkci profilů jsme zrušili. Pokud jste měli vytvořený profil, automaticky jsme vás přihlásili k odběru našeho newsletteru, abyste zůstali v kontaktu a informovali se o nových kalkulačkách.



Kromě českých kalkulaček tvoříme kalkulačky i [na Slovensku](https://volebnakalkulacka.sk), [v Rakousku](https://wahlrechner.at) a [Maďarsku](https://voksmonitor.hu).



Chcete nám pomoct? Pokud byste chtěli pomoct jako dobrovolník, ozvěte se nám na [info@kohovolit.eu](mailto:info@kohovolit.eu) nebo budeme rádi, když nás [podpoříte](https://www.darujme.cz/darovat/1200653) finančně.

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