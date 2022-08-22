<script setup lang="ts">
const props = defineProps<{
  submitLabel: string;
  onConfirm: (selection: string) => void;
  options: { id: string; label: string }[];
}>();
const handleSubmitClicked = (event: Event) =>
  props.onConfirm(
    ((event.target as HTMLFormElement).firstChild as HTMLSelectElement).value
  );
</script>

<template>
  <form @submit.prevent="handleSubmitClicked">
    <select id="district-selection" name="district-selection">
      <option v-for="x in options" :key="x.id" :value="x.id">
        {{ x.label }}
      </option>
    </select>
    <button>{{ submitLabel }}</button>
  </form>
</template>
<style lang="scss" scoped></style>
