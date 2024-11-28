<script setup lang="ts">
import { useElectionStore } from '@/stores/electionStore';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';

import AvatarComponent from '@/components/design-system/other/AvatarComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';

import {
  vkiLogoAgainst,
} from '@/components/design-system/icons';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';
import { appRoutes } from '@/main';
import { ref } from 'vue';

export interface CandidateCardProps {
  order: number;
  canidateId: string;
}
const props = defineProps<CandidateCardProps>();
const store = useElectionStore();
const userStore = useUserStore();
const candidate = store.calculator?.candidates.find(
  (x) => x.id === props.canidateId
);

const router = useRouter();
const route = useRoute();

const handleVote = (candidateId: string | null) => {
  if (!candidateId) return;
  userStore.saveVote(candidateId);
  router.push({
    name: appRoutes.result.name,
    params: { ...route.params },
    query: { ...route.query },
  });
};

const hovered = ref(false);

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
      <BodyText class="desktop" tag="p" size="medium">
        <strong>{{ candidate?.name }}</strong>
      </BodyText>
      <BodyText class="mobile" tag="p" size="medium">
        <strong>{{ candidate?.short_name }}</strong>
      </BodyText>
    </div>
    <ButtonComponent
        v-show="true"
        class="vote-button"
        kind="outlined"
        color="neutral"
        size="small"
        selected
        @click="handleVote(candidate?.id ?? null)"
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
      >
        <template #icon>
          <ResponsiveWrapper medium large extra-large huge>
            <IconComponent
              :icon="vkiLogoAgainst"
              :color="hovered ? 'neutral' : 'white'"
              title="vote"
            />
          </ResponsiveWrapper>
          <ResponsiveWrapper extra-small small>
            <IconComponent
              :icon="vkiLogoAgainst"
              color="#ccc"
              title="vote"
            />
          </ResponsiveWrapper>
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
