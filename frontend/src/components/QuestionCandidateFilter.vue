<script setup lang="ts">
import { useElectionStore } from '@/stores/electionStore';
import { ref, watch } from 'vue';

import PillGroupComponent from '@/components/design-system/input/PillGroupComponent.vue';
import PillGroupItemComponent from '@/components/design-system/input/PillGroupItemComponent.vue';
import TitleText from './design-system/typography/TitleText.vue';

export interface Props {
  modelValue?: Set<string>;
}

defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const electionStore = useElectionStore();

const candidates = electionStore.calculator?.candidates;

const uniqueCandidateIds = new Set<string>(candidates?.map((x) => x.id));

const selectedCandidateIds = ref(
  new Set<string>(
    candidates
      ?.filter((x) => {
        if (x.is_active) return x;
      })
      .map((x) => x.id)
  )
);

const onSelectAllClicked = (event: MouseEvent) => {
  if ((event.target as HTMLInputElement).checked) {
    uniqueCandidateIds.forEach((x) => {
      selectedCandidateIds.value.add(x);
    });
  } else {
    selectedCandidateIds.value.clear();
  }
};

watch(
  selectedCandidateIds,
  (newValue, oldValue) => {
    emit('update:modelValue', newValue);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <form>
    <TitleText class="tag-filter-title" tag="h3" size="small">
      Filtrează după candidați
    </TitleText>
    <pill-group-component>
      <pill-group-item-component
        key="select-all"
        type="checkbox"
        group-name="select-all"
        :checked="true"
        @click="onSelectAllClicked"
      >
        Vybrat vše
      </pill-group-item-component>
      <pill-group-item-component
        v-for="(candidateId, idx) in uniqueCandidateIds"
        :key="idx"
        v-model="selectedCandidateIds"
        type="checkbox"
        :group-name="candidateId"
        :value="candidateId"
        :checked="selectedCandidateIds.has(candidateId)"
      >
        {{
          electionStore.calculator?.candidates.find((x) => x.id === candidateId)
            ?.name
        }}
      </pill-group-item-component>
    </pill-group-component>
  </form>
</template>
<style lang="scss" scoped>
.tag-filter-title {
  padding-bottom: var(--spacing-small);
}
</style>
