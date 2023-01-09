<script setup lang="ts">
import { useElectionStore } from '@/stores/electionStore';
import { ref, watch } from 'vue';

export interface Props {
  modelValue?: Set<string>;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const electionStore = useElectionStore();

const selectedTags = ref(new Set<string>(electionStore.uniqueQuestionTags));
const onSelectAllClicked = (event: MouseEvent) => {
  if ((event.target as HTMLInputElement).checked) {
    electionStore.uniqueQuestionTags.forEach((x) => {
      selectedTags.value.add(x);
    });
  } else {
    selectedTags.value.clear();
  }
  console.debug(selectedTags.value);
};

watch(selectedTags, (newValue, oldValue) => {
  emit('update:modelValue', selectedTags);
});
</script>

<template>
  <form class="filter-menu">
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
        v-for="(tag, idx) in electionStore.uniqueQuestionTags"
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
