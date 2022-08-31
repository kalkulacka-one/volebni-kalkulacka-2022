<script setup lang="ts">
const props = defineProps<{
  groupName: string;
  value: string;

  // It depends on the implementation, but it should be enough to have just the target.value as the callback parameter
  onSelect(target: HTMLInputElement): void;
}>();
</script>

<template>
  <label class="label">
    <input
      type="radio"
      :value="value"
      :name="props.groupName"
      @input="(event: Event) => onSelect(event.target as HTMLInputElement)"
    />
    <span class="radio-checkbox"></span>
    <slot></slot>
  </label>
</template>

<style scoped lang="scss">
.label {
  display: flex;
  align-items: center;

  position: relative;
  cursor: pointer;

  border-bottom: 1px solid rgb(var(--palette-neutral-70));
  padding: var(--spacing-smaller) var(--spacing-small);
}

.label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-checkbox {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  margin-right: var(--spacing-small);

  border-radius: 50%;
  border: 2px solid rgb(var(--palette-neutral-30));
}

.label:hover input ~ .radio-checkbox {
  border-color: rgb(var(--palette-neutral-50));
}

.radio-checkbox:after {
  content: '';
  position: absolute;
  display: none;
}

.label .radio-checkbox:after {
  top: 5px;
  left: 5px;
  width: 10px;
  height: 10px;

  border-radius: 50%;
  background-color: rgb(var(--palette-neutral-30));
}

.label input:checked ~ .radio-checkbox:after {
  display: block;
}

.label:hover input ~ .radio-checkbox:after {
  background-color: rgb(var(--palette-neutral-50));
}
</style>
