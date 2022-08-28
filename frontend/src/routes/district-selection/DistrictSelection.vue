<script setup lang="ts">
export interface DistrictSelectionProps {
  submitLabel: string;
  onConfirm: (selection: string) => void;
  options: { district_code: string; label: string }[];
}
const props = defineProps<DistrictSelectionProps>();
const handleSubmitClicked = (event: Event) =>
  props.onConfirm(
    ((event.target as HTMLFormElement).firstChild as HTMLSelectElement).value
  );
</script>

<template>
  <form @submit.prevent="handleSubmitClicked">
    <select id="district-selection" name="district-selection">
      <option
        v-for="x in options"
        :key="x.district_code"
        :value="x.district_code"
      >
        {{ x.label }}
      </option>
    </select>
    <button>{{ submitLabel }}</button>
  </form>
</template>
<style lang="scss" scoped></style>
