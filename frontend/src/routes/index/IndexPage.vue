<script setup lang="ts">
import { fetchElections } from '@/common/dataFetch';

import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';
import HeadingComponent from '@/components/design-system/typography/HeadingComponent.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';

const elections = await fetchElections();
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent />
    </template>
    <div class="wrapper">
      <CardComponent class="card" shadow corner="top-left" padding="large">
        <StackComponent spacing="small">
          <HeadingComponent size="medium">
            Volební kalkulačka 2022
            <template #secondary>již brzy</template>
          </HeadingComponent>
          <BodyText size="large">
            Ve spolupráci s
            <a href="https://cesko.digital/projects/volebni-kalkulacka">
              Česko.Digital
            </a>
            pro vás chystáme novou volební kalkulačku. Spustíme ji začátkem
            záři. Sledujte Twitter
            <a href="https://twitter/CeskoDigital">@CeskoDigital</a>.
          </BodyText>
          <StackComponent horizontal spacing="small">
            <ButtonComponent
              kind="filled"
              href="https://twitter.com/intent/follow?screen_name=ceskodigital"
            >
              Sledovat @CeskoDigital na Twitteru
            </ButtonComponent>
            <ButtonComponent
              kind="outlined"
              href="https://www.volebnikalkulacka.cz/"
            >
              Volební kalkulačky z předchozích let
            </ButtonComponent>
          </StackComponent>
          <StackComponent horizontal spacing="small">
            <ButtonComponent
              v-for="election in elections"
              :key="election.id"
              kind="filled"
              :href="`/kalkulacka/${election.key}`"
            >
              {{ election.name }}
            </ButtonComponent>
          </StackComponent>
        </StackComponent>
      </CardComponent>
    </div>
  </StickyHeaderLayout>
</template>

<style scoped>
.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-large);
}

.card {
  max-width: 60rem;
}
</style>
