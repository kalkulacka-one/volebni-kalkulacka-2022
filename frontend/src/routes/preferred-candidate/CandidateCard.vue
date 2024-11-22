<script setup lang="ts">
import { useElectionStore } from '@/stores/electionStore';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';

import AvatarComponent from '@/components/design-system/other/AvatarComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';

import {
  vkiLogoInFavour,
} from '@/components/design-system/icons';
import { useSubscriberStore } from '@/stores/subscriberStore';
import { useRoute, useRouter } from 'vue-router';
import { appRoutes } from '@/main';

export interface CandidateCardProps {
  order: number;
  canidateId: string;
}
const props = defineProps<CandidateCardProps>();
const store = useElectionStore();
const subscriberStore = useSubscriberStore();
const candidate = store.calculator?.candidates.find(
  (x) => x.id === props.canidateId
);

const router = useRouter();
const route = useRoute();

const handleVote = (candidateId: string | null) => {
  if (!candidateId) return;
  subscriberStore.saveVote(candidateId);
  router.push({
    name: appRoutes.result.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

</script>
<template>
  <CardComponent
    :class="[
      'result-question-card',
    ]"
    corner="top-left"
    border
    shadow
    padding="medium"
  >
    <div class="avatar desktop">
      <AvatarComponent
        size="medium"
        background-color="rgb(var(--palette-primary-90))"
        :background-image="
          candidate?.img_url ||
          (candidate?.parties?.length === 1
            ? candidate?.parties[0].img_url
            : undefined)
        "
      >
      </AvatarComponent>
    </div>
    <div class="avatar mobile">
      <AvatarComponent
        size="medium"
        :background-color="
          order === 1
            ? 'rgb(var(--palette-primary-50))'
            : 'rgb(var(--palette-primary-90))'
        "
        :background-image="
          candidate?.img_url ||
          (candidate?.parties?.length === 1
            ? candidate?.parties[0].img_url
            : undefined)
        "
      >
      </AvatarComponent>
    </div>
    <div class="text">
      <BodyText class="desktop mobile" tag="p" size="medium">
        <strong>{{ candidate?.short_name }}</strong>
      </BodyText>
    </div>
    <ButtonComponent
        v-show="true"
        class="vote-button"
        kind="answer"
        color="primary"
        size="small"
        selected
        @click="handleVote(candidate?.id)"
      >
        <template #icon>
          <IconComponent
            :icon="vkiLogoInFavour"
            title="vote"
          />
        </template>
    </ButtonComponent>
  </CardComponent>
</template>

<style lang="scss" scoped>
.result-question-card {
  max-width: 100%;
  display: grid;
  // grid-template-columns: 4.5rem 1fr 4.5rem auto;
  grid-template-areas:
    'avatar text vote-button';
  grid-template-columns: max-content 10fr 2fr;
  column-gap: var(--responsive-spacing-medium);

  .avatar {
    grid-area: avatar;
    align-self: center;
    justify-self: right;
  }

  .text {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    grid-area: text;
    align-self: center;
    padding-left: 12px;
  }

  .vote-button {
    grid-area: vote-button;
    align-self: center;
    justify-self: right;
  }

  @media (max-width: 700px) {
    grid-template-columns: 3rem 1fr auto;
    column-gap: var(--responsive-spacing-extra-small);
  }

  .desktop,
  .mobile {
    display: none;
  }

  @media (min-width: 700px) {
    .desktop {
      display: initial;
    }
  }

  @media (max-width: 700px) {
    .mobile {
      display: initial;
    }
  }
}
</style>
