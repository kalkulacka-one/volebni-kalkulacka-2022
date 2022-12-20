<script setup lang="ts">
import { computed } from 'vue';
import PillGroupItemComponent from './PillGroupItemComponent.vue';

export interface Props {
  groupName?: string | null;
  items?: object;
  selected?: object;
}

// const classes = computed(() => ({
//   'pill--active': props.groupName,
// }));

const props = withDefaults(defineProps<Props>(), {
  groupName: null,
});
</script>

<template>
  <ul class="pill-group">
    <template v-for="(item, idx) in props.items">
      <PillGroupItemComponent
        :value="item.value"
        :groupName="props.groupName"
        :checked="idx === 0"
      >
        {{ item.name }}
      </PillGroupItemComponent>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
.pill-group {
  display: flex;
  gap: var(--gap-small);
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
