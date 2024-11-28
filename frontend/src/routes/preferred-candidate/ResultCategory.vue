<script lang="ts" setup>
import type { TTopics } from '@/components/design-system/configurations/avatars-configuration';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import { computed, ref } from 'vue';
import CandidateCard from './CandidateCard.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import { useElectionStore } from '@/stores/electionStore';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import DividerComponent from '@/components/design-system/containers/DividerComponent.vue';
import { useSubscriberStore } from '@/stores/subscriberStore';
import { appRoutes } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import { mdiArrowRight } from '@mdi/js';

export interface ResultCategoryProps {
  category: TTopics;
  title?: string;
}

const router = useRouter();
const route = useRoute();

const electionStore = useElectionStore();
const candidates = computed(() => randomize(electionStore.calculator.candidates));

const subscriberStore = useSubscriberStore();

const randomize = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

const handleVote = (option: string | null) => {
  if (!option) return;
  if (option === 'no-vote') {
    subscriberStore.saveVote('will-not-vote');
  } else if (option === 'no-answer') {
    subscriberStore.saveVote('did-not-answer');
  } 
  router.push({
    name: appRoutes.emailCollection.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

</script>

<template>
  <TitleText v-if="title" tag="h4" size="medium">{{ title }}</TitleText>
  <StackComponent style="display: grid" spacing="extra-small">
    <CandidateCard
      v-for="i in candidates.length"
      :key="i"
      :order="i"
      :canidate-id="candidates[i - 1].id"
      :strong="false"

    />
    <DividerComponent weight="light" style="margin-top: 1rem; padding-bottom: 6px;" />
    <StackComponent horizontal spacing="small" class="buttons">
      <ButtonComponent
        kind="outlined"
        color="neutral"
        @click="handleVote('no-vote')"
      >
        Nu știu
        <template>
          <IconComponent :icon="mdiArrowRight" />
        </template>
      </ButtonComponent>
      <ButtonComponent
        kind="outlined"
        color="neutral"
        @click="handleVote('no-answer')"
      >
        Nu aș merge la vot
        <template>
          <IconComponent :icon="mdiArrowRight" />
        </template>
      </ButtonComponent>
    </StackComponent>
  </StackComponent>
</template>

<style lang="scss" scoped>
.buttons .button {
    width: 100%;
    max-width: 50%;
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
    align-items: center;
    .button {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>