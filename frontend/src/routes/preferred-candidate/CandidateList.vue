<script lang="ts" setup>
import type { TTopics } from '@/components/design-system/configurations/avatars-configuration';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import { computed, ref } from 'vue';
import CandidateCard from './CandidateCard.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';
import { useElectionStore } from '@/stores/electionStore';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import DividerComponent from '@/components/design-system/containers/DividerComponent.vue';
import { useUserStore } from '@/stores/userStore';
import { appRoutes } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import { mdiArrowRight } from '@mdi/js';

export interface CandidateList {
  category: TTopics;
  title?: string;
}

const router = useRouter();
const route = useRoute();

const electionStore = useElectionStore();
const candidates = computed(() => randomize(electionStore.calculator!.candidates));

const userStore = useUserStore();

const randomize = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

const answerMap = {
  'no-vote': 'will-not-vote',
  'no-answer': 'did-not-answer',
}

const handleVote = (option: 'no-vote' | 'no-answer' | null) => {
  if (!option) return;
  
  if (!userStore.user) {
    userStore.setUser({ id: 'anonymous' });
  }
  
  userStore.saveVote(answerMap[option]);
  
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
        @click="handleVote('no-answer')"
      >
        Nu știu
        <template>
          <IconComponent :icon="mdiArrowRight" />
        </template>
      </ButtonComponent>
      <ButtonComponent
        kind="outlined"
        color="neutral"
        @click="handleVote('no-vote')"
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