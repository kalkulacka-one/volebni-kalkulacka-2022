<script setup>
import IconBadge from '@/components/design-system/icons/IconBadge.vue'
import StackComponent from '@/components/design-system/layout/StackComponent.vue';

import {
  vkiLogoInFavour,
  vkiLogoAgainst,
} from '@/components/design-system/icons';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Nevyhovujúci príklad

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Vyhovujúci príklad

</StackComponent>

## 1. Otázka sa musí týkať toho, čo majú zvolení politici možnosť ovplyvniť.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Česká republika by mala vystúpiť z EÚ (otázka v regionálnych voľbách).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Česká republika by mala vystúpiť z EÚ (otázka v celoštátnych voľbách).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Chcel/a by som, aby sa Praha v nasledujúcich voľbách vrátila k systému jedného volebného obvodu (otázka v pražských voľbách).

</StackComponent>

## 2. Na otázku treba odpovedať áno alebo nie a nemala by viesť k odpovedi.

Pri navrhovaní otázok si musíme vedieť predstaviť, že ľudia si vyberú odpovede áno aj nie. Otázka by tiež nemala byť sugestívna (návodná).

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Mala by sa zlepšiť dopravná situácia v Považskom Chlmci a vo Vraní?

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Bol/a by som rád/a, keby Opencard nebola pre cestujúcich nákladovo výhodnejšia ako "papierová električenka", aby si cestujúci mohli vybrať. (otázka navádza k odpovedi “áno”).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Malo by sa pri Rajčianke vybudovať odpočívadlo? (len za predpokladu, že je všeobecne známe, čo to je, veľa sa o tom v meste diskutovalo, vedia, koľko by to stálo atď.).

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Malo by sa na cyklodopravu vyčleniť aspoň 1 % z rozpočtu mesta na dopravu?

</StackComponent>

## 3. Otázky by mali byť dôležité

Zohľadňujeme napríklad to, na čo dané zastupiteľstvo/parlament vynakladá najviac verejných prostriedkov.

Témy vyberáme tak, aby boli relevantné pre všetky skupiny voličov (vek, príjem, záujmy).

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Malo by sa mesto ospravedlniť pani M. Lorenzovej a pánovi Cejthamrovi za výroky, ktoré zazneli počas tejto konfrontácie?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Hlasovali by ste za zrušenie záruky a automatický vstup do druhého piliera?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Hlasovali by ste za dôveru vláde a zachovanie eura?

</StackComponent>

## 4. Otázka by mala byť čo najkonkrétnejšia

Ide o to, aby bolo možné skontrolovať odpoveď po 4 rokoch (na konci volebného obdobia).

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Mala by sa zahusťovať zástavba v centre mesta?

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Podľa môjho názoru by mala byť vybudovaná rýchlostná cesta z ruzyňského letiska do centra Prahy. (Správna odpoveď by bola: Budem presadzovať/chcem, aby sa v nasledujúcich 4 rokoch začala stavať rýchlodráha z letiska do centra Prahy)

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Mala by sa cena listkov na verejnú dopravu znížiť o 10 % pre seniorov a študentov?

</StackComponent>

## 5. Otázka musí být krátká a srozumitelná

Chceme, aby si respondent otázky skutočne prečítal a porozumel im. Preto ich formulujeme v rozsahu maximálne 20 slov, pričom akýkoľvek popis obmedzujeme na 50 slov.

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Hlasovali by ste za:  
zrušenie sociálneho príspevku pre rodičov samoživiteľov,
zníženie príspevku pri narodení dieťaťa len u rodičov s nízkymi príjmami,
jednotnú celkovú výšku rodičovského príspevku (220 000Kč) a väčšiu flexibilitu pri výbere výšky a dĺžky poberania rodičovského príspevku,
zníženie príspevku na starostlivosť,
zníženie dávky v nezamestnanosti a zrušenie možnosti príplatku k dávke vo výške minimálneho zárobku,
zavedenie príspevku na začatie podnikania,
sprísnenie podmienok nároku na nemocenské a materské pre samostatne zárobkovo činné osoby?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Súhlasím so zavedením turniketov v metre.

</StackComponent>

## 6. Otázky s popismi musia mať zmysel aj bez nich

Veľký počet ľudí číta len samotnú otázku, nie popis. Môže sa stať, že popis sa na mobilnom zariadení nezobrazí.

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Hlasovali by ste za zrušenie záruky a automatický vstup do druhého piliera?

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Má podľa vás zmysel pripájať sa k podobným projektom?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Súhlasím so spoplatnením vjazdu áut do centra mesta, napríklad formou mýta.

</StackComponent>

## 7. Uprednostňujeme otázky v pozitívnej forme, vyhýbame sa mätúcej forme dvojitému záporu

Nasledujúci príklad ukazuje, že dvojitý zápor je zavádzajúci a nepresný.

<br />

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Na Vysočine by nemalo byť úložisko jadrového odpadu za každú cenu.

<br />

V skutočnosti tu nie je jasné, s čím opýtaný nesúhlasí:

a) nie, nemalo by sa stavať,

b) nesúhlasím, malo by sa vybudovať.

Správne formulovaná otázka by mala znieť: "Mal by kraj urobiť všetko pre to, aby zabránil vybudovaniu úložiska jadrového odpadu?").

<br />

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Stredné školy by sa mali naďalej zlučovať do väčších celkov.

<br />

Nie "Stredné školy by sa už nemali spájať do väčších celkov".

## 8. Otázka musí byť napísaná zrozumiteľným jazykom

Otázky sú formulované tak, aby im porozumeli rôzne sociálne skupiny.

<br />

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoAgainst" :background-color="'white'" :color="'rgb(var(--color-secondary-fg))'" /> Nový územný plán musí regulovať výškovú výstavbu, ktorá môže poškodiť panorámu Prahy.

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Výstavba mrakodrapov v historickom centre by mala byť zakázaná.

</StackComponent>

## 9. Vyberáme aj témy, ktoré sú zaujímavé, aj keď nie úplne dôležité.

<StackComponent spacing="extra-small">

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Hlasovali by ste za návrh na farebnú signalizáciu pre poslancov, ako majú hlasovať?

<IconBadge :icon="vkiLogoInFavour" :background-color="'white'" :color="'rgb(var(--color-primary-fg))'" /> Hlasovali by ste za zákon "Václav Havel prispel k slobode a demokracii."?

</StackComponent>
