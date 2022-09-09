<script lang="ts" setup>
import type { calculateRelativeAgreement } from '@/common/resultParser';
import type { TTopics } from '@/components/design-system/configurations/avatars-configuration';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import { computed, ref } from 'vue';
import ResultCandidateCard from './ResultCandidateCard.vue';
import { mdiChevronDown } from '@mdi/js';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import StackComponent from '../../components/design-system/layout/StackComponent.vue';

export interface ResultCategoryProps {
  result: ReturnType<typeof calculateRelativeAgreement>;
  category: TTopics;
  title: string;
  maxVisibleCandidates: number;
}
const props = defineProps<ResultCategoryProps>();
const isExpanded = ref(false);
const handleExpandClick = () => {
  isExpanded.value = !isExpanded.value;
};
const visibleCandidates = computed(() =>
  isExpanded.value
    ? props.result.length
    : props.maxVisibleCandidates > props.result.length
    ? props.result.length
    : props.maxVisibleCandidates
);
console.debug(visibleCandidates.value);
</script>

<template>
  <TitleText tag="h4" size="medium">{{ title }}</TitleText>
  <StackComponent style="display: grid" spacing="medium">
    <ResultCandidateCard
      v-for="i in visibleCandidates"
      :key="result[i - 1].cId"
      :order="i"
      :canidate-id="result[i - 1].cId"
      :result="result[i - 1].result.result_percent"
      :strong="i === 1"
      :category="category"
    />
  </StackComponent>
  <ButtonComponent
    kind="link"
    size="medium"
    class="expand-btn"
    @click="handleExpandClick"
  >
    {{ isExpanded ? 'Skrýt kandidáty' : 'Zobrazit všechny kandidáty' }}
    <template #iconAfter>
      <IconComponent
        :class="[
          'expand-btn-icon',
          isExpanded ? 'expand-btn-icon--active' : '',
        ]"
        size="medium"
        :icon="mdiChevronDown"
        color="rgb(var(--color-neutral-fg))"
      />
    </template>
  </ButtonComponent>
</template>

<style lang="scss" scoped>
.expand-btn {
  justify-content: center;
  &-icon {
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
</style>
