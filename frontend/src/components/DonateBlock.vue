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
      <TitleText size="large" tag="h2"
        >Volební kalkulačka vás potřebuje!</TitleText
      >
      <BodyText size="medium"
        >Abychom mohli pokračovat ve tvorbě Volební kalkulačky, potřebujeme vaši
        pomoc.</BodyText
      >
      <BodyText size="medium">
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
          >Přidejte se k našemu týmu dobrovolníků</a
        >
        a zapojte se do tvorby kalkulačky. Nebo na kalkulačku
        <a
          href="https://www.darujme.cz/darovat/1200653"
          target="_blank"
          @click="logInteraction('donate')"
          >přispějte</a
        >
        finančně: ať už pošlete jakoukoliv částku, moc nám to pomůže.</BodyText
      >
      <StackComponent horizontal spacing="small">
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.kalkulacka.one/cs/zapojte-se"
          kind="outlined"
          color="primary"
          @click="logInteraction('join-us-button')"
        >
          Chci se zapojit
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button')"
        >
          Chci přispět
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium"
        >Děkujeme za podporu, díky které můžeme připravit Volební kalkulačku pro
        podzimní komunální a senátní volby a dále ji vylepšovat.</BodyText
      >
    </StackComponent>
  </section>
  <section v-else-if="randomVariant === 'reciprocity'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2"
        >Líbí se vám Volební kalkulačka?</TitleText
      >
      <BodyText size="medium"
        >Máme radost, že jste využili Volební kakulačku. Díky dobrovolníkům a
        štědrým dárcům můžeme kalkulačku poskytovat zdarma.</BodyText
      >
      <BodyText size="medium">
        Pokud se vám kalkulačka líbí a chcete, aby byla k dispozici i nadále,
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
          >přidejte se k našemu týmu dobrovolníků</a
        >
        nebo nás
        <a
          href="https://www.darujme.cz/darovat/1200653"
          target="_blank"
          @click="logInteraction('donate')"
          >podpořte finančně</a
        >. Každý příspěvek se počítá!</BodyText
      >
      <StackComponent horizontal spacing="small">
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.kalkulacka.one/cs/zapojte-se"
          kind="outlined"
          color="primary"
          @click="logInteraction('join-us-button')"
        >
          Chci se zapojit
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button')"
        >
          Chci přispět
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium"
        >Děkujeme za podporu, díky které můžeme připravit Volební kalkulačku pro
        podzimní komunální a senátní volby a dále ji vylepšovat.</BodyText
      >
    </StackComponent>
  </section>
  <section v-else-if="randomVariant === 'authority'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2"
        >Podpořte tvůrce Volební kalkulačky</TitleText
      >
      <BodyText size="medium"
        >Připravit každou Volební kalkulačku zabere i 120 hodin. Náš tým
        dobrovolníků a odborníků na volby a politiku využívá své jedinečné
        know-how, aby vám poskytl co nejpřesnější a nejspolehlivější
        informace.</BodyText
      >
      <BodyText size="medium">
        Podpořte nás a
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
          >zapojte se do tvorby Volební kalkulačky</a
        >
        nebo nám
        <a
          href="https://www.darujme.cz/darovat/1200653"
          target="_blank"
          @click="logInteraction('donate')"
          >přispějte finančně</a
        >.</BodyText
      >
      <StackComponent horizontal spacing="small">
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.kalkulacka.one/cs/zapojte-se"
          kind="outlined"
          color="primary"
          @click="logInteraction('join-us-button')"
        >
          Chci se zapojit
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button')"
        >
          Chci přispět
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium"
        >Vaše podpora je klíčová pro to, abychom mohli pokračovat v naší práci
        pro nadcházející volby a vylepšovat kalkulačku. Děkujeme!</BodyText
      >
    </StackComponent>
  </section>
  <section v-else-if="randomVariant === 'anchoring'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">Podpořte Volební kalkulačku</TitleText>
      <BodyText size="medium"
        >Abychom mohli pokračovat v tvorbě Volební kalkulačky a poskytovat ji
        zdarma, potřebujeme vaši podporu. I malý příspěvek může udělat velký
        rozdíl. Podpořte nás
        <a
          href="https://www.darujme.cz/darovat/1200653"
          target="_blank"
          @click="logInteraction('donate')"
          >jakoukoliv částkou</a
        >, kterou můžete.</BodyText
      >
      <StackComponent horizontal spacing="small" wrap>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653?frequency=once&amount=100"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-100')"
        >
          100 Kč
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653?frequency=once&amount=200"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-200')"
        >
          200 Kč
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653?frequency=once&amount=500"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button-200')"
        >
          500 Kč
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button')"
        >
          Jiná částka
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium"
        >Nebo se
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
          >přidejte k našemu týmu dobrovolníků</a
        >
        a zapojte se do tvorby kalkulačky.</BodyText
      >
      <ButtonComponent
        tag="a"
        target="_blank"
        href="https://www.kalkulacka.one/cs/zapojte-se"
        kind="outlined"
        color="primary"
        @click="logInteraction('join-us-button')"
      >
        Chci se zapojit
        <template #iconAfter>
          <IconComponent :icon="mdiArrowRight" />
        </template>
      </ButtonComponent>
      <BodyText size="medium"
        >Vaše podpora je klíčová pro to, abychom mohli pokračovat v naší práci
        pro nadcházející volby a vylepšovat kalkulačku. Děkujeme!</BodyText
      >
    </StackComponent>
  </section>
  <section v-else-if="randomVariant === 'social-proof'">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2"
        >Staňte se součástí Volební kalkulačky</TitleText
      >
      <BodyText size="medium"
        >Máme radost, že jste využili Volební kalkulačku. Připojte se k více než
        1000 dárcům, kteří nás finančně podpořili, a pomozte nám pokračovat v
        této důležité práci.
        <a
          href="https://www.darujme.cz/darovat/1200653"
          target="_blank"
          @click="logInteraction('donate')"
          >Podpořte nás jakoukoliv částkou</a
        >, která vám vyhovuje. Každý příspěvek se počítá!</BodyText
      >
      <BodyText size="medium">
        Nebo se
        <a
          href="https://www.kalkulacka.one/cs/zapojte-se"
          target="_blank"
          @click="logInteraction('join-us')"
          >přidejte k našemu týmu dobrovolníků</a
        >
        a pomozte milionům lidí, kteří Volební kalkulačku využívají: třeba jen v
        prezidentských volbách 2024 si kalkulačku vyplnilo přes 1 milion
        lidí.</BodyText
      >
      <StackComponent horizontal spacing="small">
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.kalkulacka.one/cs/zapojte-se"
          kind="outlined"
          color="primary"
          @click="logInteraction('join-us-button')"
        >
          Chci se zapojit
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
        <ButtonComponent
          tag="a"
          target="_blank"
          href="https://www.darujme.cz/darovat/1200653"
          kind="outlined"
          color="primary"
          @click="logInteraction('donate-button')"
        >
          Chci přispět
          <template #iconAfter>
            <IconComponent :icon="mdiArrowRight" />
          </template>
        </ButtonComponent>
      </StackComponent>
      <BodyText size="medium"
        >Vaše podpora je klíčová pro to, abychom mohli pokračovat v naší práci
        pro nadcházející volby a vylepšovat kalkulačku. Děkujeme!</BodyText
      >
    </StackComponent>
  </section>
</template>

<style scoped lang="scss">
section {
  max-width: 48rem;
}
</style>
