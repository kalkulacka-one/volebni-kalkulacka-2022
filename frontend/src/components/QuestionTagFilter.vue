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

const uniqueTags = electionStore.uniqueQuestionTags;
const selectedTags = ref(new Set<string>(electionStore.uniqueQuestionTags));
const onSelectAllClicked = (event: MouseEvent) => {
  if ((event.target as HTMLInputElement).checked) {
    electionStore.uniqueQuestionTags.forEach((x) => {
      selectedTags.value.add(x);
    });
  } else {
    selectedTags.value.clear();
  }
};

watch(
  selectedTags,
  (newValue, oldValue) => {
    emit('update:modelValue', newValue);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <form>
    <TitleText class="tag-filter-title" tag="h3" size="small">
      Filtrează după teme
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
        v-for="(tag, idx) in uniqueTags"
        :key="idx"
        v-model="selectedTags"
        type="checkbox"
        :group-name="tag"
        :value="tag"
        :checked="selectedTags.has(tag)"
      >
        {{ tag }}
      </pill-group-item-component>
    </pill-group-component>
  </form>
</template>
<style lang="scss" scoped>
.tag-filter-title {
  padding-bottom: var(--spacing-small);
}
</style>
