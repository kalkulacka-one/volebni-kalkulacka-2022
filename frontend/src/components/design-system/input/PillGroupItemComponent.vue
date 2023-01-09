<script setup lang="ts">
import { computed } from 'vue';
import LabelText from '@/components/design-system/typography/LabelText.vue';

export interface Props {
  groupName: string;
  type: 'radio' | 'checkbox';
  value?: string;
  checked?: boolean;
  modelValue?: Set<string>;
}

const props = withDefaults(defineProps<Props>(), {
  value: 'on',
  checked: false,
  modelValue: undefined,
});

const isChecked = computed(() => props.checked);

const emit = defineEmits(['update:modelValue']);
const onInput = (payload: Event) => {
  if (props.modelValue?.has((payload.target as HTMLInputElement).value)) {
    props.modelValue.delete((payload.target as HTMLInputElement).value);
  } else {
    props.modelValue?.add((payload.target as HTMLInputElement).value);
  }
  emit('update:modelValue', props.modelValue);
};
</script>

<template>
  <li class="pill-group__item">
    <label class="pill">
      <input
        ref="input"
        class="pill-input"
        :type="props.type"
        :value="value || 'on'"
        :name="props.groupName"
        :checked="isChecked"
        @input="onInput"
      />
      <LabelText class="pill-label">
        <slot />
      </LabelText>
    </label>
  </li>
</template>

<style lang="scss" scoped>
.pill-group__item {
  display: block;
}
.pill {
  position: relative;
  display: flex;
  cursor: pointer;
}
.pill-input {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-color: rgb(var(--color-neutral-border));
  border-radius: var(--radius-medium);
  border-style: solid;
  border-width: var(--spacing-pico);
  background-color: rgb(var(--color-neutral-bg));
  appearance: none;

  &:checked {
    border-color: rgb(var(--color-neutral-border-strong));
    background-color: rgb(var(--color-neutral-bg-active));
    color: rgb(var(--color-neutral-fg-inverse));

    & + .pill-label {
      color: white;
    }
  }
}
.pill-label {
  position: relative;
  top: 0;
  left: 0;
  color: rgb(var(--color-neutral-fg));
  padding: var(--spacing-extra-small) var(--spacing-small);
  z-index: 10;
}
</style>
