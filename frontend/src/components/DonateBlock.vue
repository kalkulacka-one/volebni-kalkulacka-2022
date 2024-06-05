<script setup lang="ts">
import { useRoute } from 'vue-router';
import { inject } from 'vue';
import { mdiArrowRight } from '@mdi/js';

import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

const variants = {
  1: 'loss-aversion',
  2: 'reciprocity',
  3: 'authority',
  4: 'anchoring',
  5: 'social-proof',
};
const random = Math.floor(Math.random() * 5) + 1;
const randomVariant = variants[random as keyof typeof variants];

const route = useRoute();
const currentRoute = route.path;
const currentEmbed = inject(EmbedKey);

const logInteraction = (interaction: string) => {
  plausible('Support', {
    props: {
      interaction,
      route: currentRoute,
      embed: currentEmbed,
      variant: randomVariant,
    },
  });
};
</script>

<template>
  <section v-if="randomVariant === 'loss-aversion'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">
        Volebná kalkulačka vás potrebuje!
      </TitleText>
      <BodyText size="medium">
        Aby sme mohli pokračovať vo tvorbe Volebnej kalkulačky, potrebujeme vašu pomoc.
      </BodyText>
      <BodyText size="medium">
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
        >
          Pridajte sa k nášmu tímu dobrovoľníkov
        </a>
        a zapojte sa do tvorby kalkulačky. Alebo na kalkulačku
        <a
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          target="_blank"
          @click="logInteraction('donate')"
        >
          prispejte
        </a>
        finančne: ak pošlete akúkoľvek sumu, veľmi nám to pomôže.
      </BodyText>
      <ButtonComponent
        tag="a"
        target="_blank"
        href="https://www.kalkulacka.one/cs/zapojte-se"
        kind="filled"
        color="primary"
        @click="logInteraction('join-us-button')"
      >
        Chcem sa zapojiť
      </ButtonComponent>
      <StackComponent horizontal spacing="small" wrap>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          kind="filled"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          Chcem prispieť
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=3"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          3 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=10"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-10')"
        >
          10 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=20"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-20')"
        >
          20 EUR
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium">
        Ďakujeme za podporu, vďaka ktorej môžeme pripraviť Volebnú kalkulačku pre jesenné komunálne a senátne voľby a ďalej ju vylepšovať.
      </BodyText>
    </StackComponent>
    </section>
    <section v-else-if="randomVariant === 'reciprocity'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">
        Páči sa vám Volebná kalkulačka?
      </TitleText>
      <BodyText size="medium">
        Máme radosť, že ste využili Volebnú kalkulačku. Vďaka dobrovoľníkom a štedrým darcom môžeme kalkulačku poskytovať zadarmo.
      </BodyText>
      <BodyText size="medium">
        Ak sa vám kalkulačka páči a chcete, aby bola k dispozícii aj naďalej,
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
        >
          pridajte sa k nášmu tímu dobrovoľníkov
        </a>
        alebo nás
        <a
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          target="_blank"
          @click="logInteraction('donate')"
        >
          podporte finančne
        </a>
        . Každý príspevok sa počíta!
      </BodyText>
      <ButtonComponent
        tag="a"
        target="_blank"
        href="https://www.kalkulacka.one/cs/zapojte-se"
        kind="filled"
        color="primary"
        @click="logInteraction('join-us-button')"
      >
        Chcem sa zapojiť
      </ButtonComponent>
      <StackComponent horizontal spacing="small" wrap>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          kind="filled"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          Chcem prispieť
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=3"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          3 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=10"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-10')"
        >
          10 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=20"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-20')"
        >
          20 EUR
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium">
        Ďakujeme za podporu, vďaka ktorej môžeme pripraviť Volebnú kalkulačku pre jesenné komunálne a senátne voľby a ďalej ju vylepšovať.
      </BodyText>
    </StackComponent>
    </section>
    <section v-else-if="randomVariant === 'authority'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">
        Podporte tvorcov Volebnej kalkulačky
      </TitleText>
      <BodyText size="medium">
        Pripraviť každú Volebnú kalkulačku zaberie aj 120 hodín. Náš tím dobrovoľníkov a odborníkov na voľby a politiku využíva svoje jedinečné know-how, aby vám poskytol čo najpresnejšie a najspoľahlivejšie informácie.
      </BodyText>
      <BodyText size="medium">
        Podporte nás a
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
        >
          zapojte sa do tvorby Volebnej kalkulačky
        </a>
        alebo nám
        <a
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          target="_blank"
          @click="logInteraction('donate')"
        >
          prispejte finančne
        </a>
        .
      </BodyText>
      <ButtonComponent
        tag="a"
        target="_blank"
        href="https://www.kalkulacka.one/cs/zapojte-se"
        kind="filled"
        color="primary"
        @click="logInteraction('join-us-button')"
      >
        Chcem sa zapojiť
      </ButtonComponent>
      <StackComponent horizontal spacing="small" wrap>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          kind="filled"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          Chcem prispieť
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=3"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          3 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=10"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-10')"
        >
          10 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=20"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-20')"
        >
          20 EUR
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium">
        Vaša podpora je kľúčová pre to, aby sme mohli pokračovať v našej práci pre nadchádzajúce voľby a vylepšovať kalkulačku. Ďakujeme!
      </BodyText>
    </StackComponent>
    </section>
    <section v-else-if="randomVariant === 'anchoring'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">
        Podporte Volebnú kalkulačku
      </TitleText>
      <BodyText size="medium">
        Aby sme mohli pokračovať vo tvorbe Volebnej kalkulačky a poskytovať ju zadarmo, potrebujeme vašu podporu. Aj malý príspevok môže urobiť veľký rozdiel. Podporte nás
        <a
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          target="_blank"
          @click="logInteraction('donate')"
        >
          akoukoľvek sumou
        </a>
        , ktorú môžete.
      </BodyText>
      <StackComponent horizontal spacing="small" wrap>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=3"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          3 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=10"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-10')"
        >
          10 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=20"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-20')"
        >
          20 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button')"
        >
          Iná suma
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium">
        Alebo sa
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
        >
          pridajte k nášmu tímu dobrovoľníkov
        </a>
        a zapojte sa do tvorby kalkulačky.
      </BodyText>
      <ButtonComponent
        tag="a"
        target="_blank"
        href="https://www.kalkulacka.one/cs/zapojte-se"
        kind="outlined"
        color="primary"
        @click="logInteraction('join-us-button')"
      >
        Chcem sa zapojiť
      </ButtonComponent>
      <BodyText size="medium">
        Vaša podpora je kľúčová pre to, aby sme mohli pokračovať v našej práci pre nadchádzajúce voľby a vylepšovať kalkulačku. Ďakujeme!
      </BodyText>
    </StackComponent>
    </section>
    <section v-else-if="randomVariant === 'social-proof'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">
        Staňte sa súčasťou Volebnej kalkulačky
      </TitleText>
      <BodyText size="medium">
        Máme radosť, že ste využili Volebnú kalkulačku. Pripojte sa k viac ako 1000 darcom, ktorí nás finančne podporili, a pomôžte nám pokračovať v tejto dôležitej práci.
        <a
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          target="_blank"
          @click="logInteraction('donate')"
        >
          Podporte nás akoukoľvek sumou
        </a>
        , ktorá vám vyhovuje. Každý príspevok sa počíta!
      </BodyText>
      <StackComponent horizontal spacing="small" wrap>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?currency=EUR"
          kind="filled"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          Chcem prispieť
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=3"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-3')"
        >
          3 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=10"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-10')"
        >
          10 EUR
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1202684?frequency=once&currency=EUR&amount=20"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-20')"
        >
          20 EUR
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium">
        Alebo sa
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
        >
          pridajte k nášmu tímu dobrovoľníkov
        </a>
        a pomôžte miliónom ľudí, ktorí Volebnú kalkulačku využívajú: napríklad len v prezidentských voľbách 2024 si kalkulačku vyplnilo cez 1 milión ľudí.
      </BodyText>
      <ButtonComponent
        tag="a"
        target="_blank"
        href="https://www.kalkulacka.one/cs/zapojte-se"
        kind="filled"
        color="primary"
        @click="logInteraction('join-us-button')"
      >
        Chcem sa zapojiť
      </ButtonComponent>
      <BodyText size="medium">
        Vaša podpora je kľúčová pre to, aby sme mohli pokračovať v našej práci pre nadchádzajúce voľby a vylepšovať kalkulačku. Ďakujeme!
      </BodyText>
    </StackComponent>
  </section>
</template>

<style scoped lang="scss">
section {
  max-width: 48rem;
}
</style>
