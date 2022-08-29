<script setup lang="ts">
export interface TabFilterProps {
  tags: string[];
  selectedTag: string;
  inputChange: (id: string) => void;
}
defineProps<TabFilterProps>();
</script>

<template>
  <div class="wrapper">
    <span v-for="x in tags" :key="x">
      <input
        :id="x"
        :key="x"
        type="radio"
        name="tag"
        :value="x"
        :checked="x === selectedTag"
        @change="() => inputChange(x)"
      />
      <label :for="x">{{ x }}</label>
    </span>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 5px;
  width: 100%;
}
</style>
