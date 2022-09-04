<script setup lang="ts">
import { useElectionStore, type UserAnswer } from '@/stores/electionStore';
import type { Candidate, CandidateAnswer } from '@/types/calculator';
import type { Question } from '@/types/question';
import ResultAvatarComponent from '../../components/ResultAvatarComponent.vue';
import {
  avatarsConfiguration,
  type TTopics,
} from '../../components/design-system/configurations/avatars-configuration';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import TitleText from '../../components/design-system/typography/TitleText.vue';
import IconButton from '../../components/design-system/input/IconButton.vue';
import { mdiChevronDown } from '@mdi/js';
import { ref } from 'vue';
import DividerComponent from '../../components/design-system/containers/DividerComponent.vue';
import ResultCardContacts from './ResultCardContacts.vue';
import SimpleProgress from '../../components/design-system/indicators/SimpleProgress.vue';

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
const isExpanded = ref(false);
const handleExpandClick = () => {
  isExpanded.value = !isExpanded.value;
};
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
</script>
<template>
  <CardComponent
    class="card-wrapper"
    corner="top-left"
    radius="large"
    shadow
    border
    :border-kind="strong ? 'strong' : 'normal'"
    padding="small"
    background-color="white"
  >
    <div class="header">
      <ResultAvatarComponent
        class="avatar"
        :size-avatar="strong ? 'large' : 'medium'"
        :size-order-match="strong ? 'medium' : 'small'"
        :order="order"
        :image-url="candidate?.img_url || ''"
        :alt="candidate?.name || 'unknown'"
        :configuration="avatarConfig"
      />
      <div class="header-central">
        <TitleText tag="p" :size="strong ? 'medium' : 'small'">{{
          candidate?.name
        }}</TitleText>
        <SimpleProgress
          :id="candidate?.id || ''"
          :color-primary="`rgb(var(${primaryColor}))`"
          color-secondary="rgb(var(--color-neutral-bg))"
          height="0.375rem"
          :value="result"
          :max="100"
        ></SimpleProgress>
        <div v-for="party in candidate?.parties" :key="party.id" class="party">
          <img
            v-if="party.img_url"
            class="party-logo"
            :src="party.img_url"
            :alt="party.name"
          />
          <BodyText size="medium">{{ party.name }}</BodyText>
        </div>
      </div>
      <TitleText
        class="header-percentage"
        tag="p"
        :size="strong ? 'large' : 'medium'"
        >{{ result }} %</TitleText
      >
      <IconButton
        :class="[
          'header-expand-btn',
          isExpanded ? 'header-expand-btn--active' : '',
        ]"
        size="medium"
        :icon="mdiChevronDown"
        color="rgb(var(--color-neutral-fg))"
        @click="handleExpandClick"
      />
    </div>
    <div :class="['details', isExpanded ? '' : 'details--collapsed']">
      <BodyText size="small"
        ><strong>Co o sobě kanidát/ka říká</strong></BodyText
      >
      <BodyText size="small">{{ candidate?.description }}</BodyText>
      <DividerComponent class="divider"></DividerComponent>
      <ResultCardContacts
        v-if="candidate?.contact"
        :contact="candidate?.contact"
      ></ResultCardContacts>
    </div>
  </CardComponent>
</template>

<style lang="scss" scoped>
.divider {
  margin: 0px;
  margin-top: var(--spacing-small);
  margin-bottom: var(--spacing-small);
}
.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: fit-content;
  padding: var(--spacing-small);
}
.header {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-extra-large);
  align-items: center;
  &-central {
    flex: 2 1 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-small);
    align-items: flex-start;
    justify-content: space-between;
  }
  &-percentage {
    white-space: nowrap;
  }
  &-expand-btn {
    :deep(svg) {
      transition: transform 0.5s;
    }
    &--active {
      :deep(svg) {
        transform: rotateX(0.5turn);
      }
    }
  }
}
.details {
  transition: all 0.3s ease-out;
  overflow: hidden;
  height: auto;
  &--collapsed {
    height: 0px;
  }
}
</style>
