<script setup lang="ts">
import { ref } from 'vue';
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';

import { useElectionStore } from '@/stores/electionStore';
import {
  avatarsConfiguration,
  type TTopics,
} from '../../components/design-system/configurations/avatars-configuration';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import TitleText from '../../components/design-system/typography/TitleText.vue';
import IconButton from '../../components/design-system/input/IconButton.vue';
import DividerComponent from '../../components/design-system/containers/DividerComponent.vue';
import ResultCardContacts from './ResultCardContacts.vue';
import SimpleProgress from '../../components/design-system/indicators/SimpleProgress.vue';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';

import FilledCircle from '@/components/design-system/containers/FilledCircle.vue';

export interface ResultCandidateCardProps {
  order: number;
  canidateId: string;
  result: number;
  strong: boolean;
  category: TTopics;
}
const props = defineProps<ResultCandidateCardProps>();
const store = useElectionStore();
const candidate = store.calculator?.candidates.find(
  (x) => x.id === props.canidateId
);
let avatarConfig = avatarsConfiguration.general;
let primaryColor = '--palette-primary-50';
switch (props.category) {
  case 'environment':
    avatarConfig = avatarsConfiguration.environment;
    primaryColor = '--palette-green-50';
    break;
  case 'health':
    avatarConfig = avatarsConfiguration.health;
    primaryColor = '--palette-red-50';
    break;
  default:
    break;
}

const isExpanded = ref(false);
const toggleClick = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
<template>
  <CardComponent
    :class="[
      'result-question-card',
      isExpanded && 'result-question-card--expanded',
    ]"
    corner="top-left"
    border
    shadow
    padding="small"
  >
    <div class="avatar desktop">
      <FilledCircle
        :size="order === 1 ? 'extra-large' : 'large'"
        :background-color="`rgb(var(${primaryColor}))`"
      >
        {{ order }}.
      </FilledCircle>
    </div>
    <div class="avatar mobile">
      <FilledCircle
        :size="order === 1 ? 'large' : 'medium'"
        :background-color="`rgb(var(${primaryColor}))`"
      >
        {{ order }}.
      </FilledCircle>
    </div>
    <div class="text">
      <TitleText class="desktop" tag="p" :size="strong ? 'medium' : 'small'">
        {{ candidate?.name }}
      </TitleText>
      <BodyText class="mobile" tag="p" :size="strong ? 'medium' : 'small'">
        <strong>{{ candidate?.name }}</strong>
      </BodyText>
    </div>
    <div class="progress-bar">
      <SimpleProgress
        :id="candidate?.id || ''"
        :color-primary="`rgb(var(${primaryColor}))`"
        color-secondary="rgb(var(--color-neutral-bg))"
        height="0.375rem"
        :value="result"
        :max="100"
      ></SimpleProgress>
    </div>
    <div class="secondary-text">
      <div class="party-wrapper">
        <div
          v-for="(party, i) in candidate?.parties"
          :key="party.id"
          class="party"
        >
          <img
            v-if="party.img_url"
            class="party-logo"
            :src="party.img_url"
            :alt="'nologo'"
          />
          <BodyText size="medium"
            >{{ i !== 0 ? ', ' : '' }}{{ party.name }}</BodyText
          >
        </div>
      </div>
    </div>
    <TitleText
      class="percentage desktop"
      tag="p"
      :size="order === 1 ? 'large' : 'medium'"
    >
      {{ result }}&nbsp;%
    </TitleText>
    <TitleText
      class="percentage mobile"
      tag="p"
      :size="order === 1 ? 'medium' : 'small'"
    >
      {{ result }}&nbsp;%
    </TitleText>
    <div v-if="candidate?.motto" class="toggle">
      <IconButton @click="toggleClick">
        <IconComponent
          :icon="isExpanded ? mdiChevronUp : mdiChevronDown"
          size="medium"
          title="Zobrazit detaily"
        />
      </IconButton>
    </div>
    <div v-if="candidate?.motto" v-show="isExpanded" class="expansion">
      <BodyText size="small"
        ><strong>Co o sobě kanidát/ka říká</strong></BodyText
      >
      <BodyText size="small">{{ candidate?.motto }}</BodyText>
      <DividerComponent class="divider"></DividerComponent>
      <ResultCardContacts
        v-if="candidate?.contact"
        :contact="candidate?.contact"
      ></ResultCardContacts>
    </div>
  </CardComponent>
</template>

<style lang="scss" scoped>
.party-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .party {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--spacing-extra-small);
    .party-logo {
      height: var(--spacing-medium);
      width: var(--spacing-medium);
      object-fit: cover;
    }
  }
}

.result-question-card {
  display: grid;
  grid-template-columns: 4.5rem 1fr 4.5rem auto;
  grid-template-areas:
    'avatar text percentage toggle'
    'avatar progress-bar percentage toggle'
    'avatar secondary-text percentage toggle';
  column-gap: var(--spacing-medium);
  row-gap: var(--spacing-small);

  .avatar {
    grid-area: avatar;
    align-self: center;
    justify-self: center;
  }

  .text {
    grid-area: text;
  }

  .progress-bar {
    grid-area: progress-bar;
  }

  .secondary-text {
    grid-area: secondary-text;
  }

  .percentage {
    grid-area: percentage;
    align-self: center;
  }

  .toggle {
    grid-area: toggle;
    align-self: center;
  }

  .expansion {
    grid-area: expansion;
  }

  &--expanded {
    grid-template-areas:
      'avatar text percentage toggle'
      'avatar progress-bar percentage toggle'
      'avatar secondary-text percentage toggle'
      'expansion expansion expansion expansion';

    .expansion {
      margin-top: var(--spacing-medium);
    }
  }

  @media (max-width: 700px) {
    grid-template-columns: 3rem 1fr 4.5rem auto;
    column-gap: var(--spacing-extra-small);

    &--expanded {
      row-gap: var(--spacing-small);
    }
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
