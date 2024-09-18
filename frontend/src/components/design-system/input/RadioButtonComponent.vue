<script setup lang="ts">
import BodyText from '@/components/design-system/typography/BodyText.vue';

export interface Props {
  groupName: string;
  value: string;
  modelValue: string | null;
  disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
});

defineEmits(['update:modelValue']);

import { useSlots } from 'vue';

const slots = useSlots();
const content = slots.default ? slots.default()[0]?.children : '';
</script>

<template>
  <label class="label">
    <input
      type="radio"
      :value="value"
      :name="props.groupName"
      :checked="props.modelValue === value"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :disabled="props.disabled"
    />
    <span class="radio-checkbox"></span>
    <BodyText size="medium">
      <span v-html="content"></span>
    </BodyText>
  </label>
</template>

<style scoped lang="scss">
label:has(input:disabled) {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}

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
