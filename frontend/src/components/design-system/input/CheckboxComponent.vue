<script setup lang="ts">
import BodyText from '@/components/design-system/typography/BodyText.vue';
import { mdiCheck } from '@mdi/js';
import { ref } from 'vue';
import IconComponent from '../icons/IconComponent.vue';

export interface Props {
  groupName: string;
  value?: string;
  checked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 'on',
  checked: false,
});
const emit = defineEmits(['update:check']);
const handleClick = () => {
  isChecked.value = !isChecked.value;
  emit('update:check', isChecked.value);
};
const isChecked = ref(props.checked);
</script>

<template>
  <label class="label" @click.prevent="handleClick">
    <input
      type="checkbox"
      :value="value || 'on'"
      :name="props.groupName"
      :checked="isChecked"
    />
    <span class="checkbox"
      ><IconComponent v-if="isChecked" class="checkbox-icon" :icon="mdiCheck"
    /></span>
    <BodyText size="medium">
      <slot />
    </BodyText>
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

.checkbox {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  margin-right: var(--spacing-small);

  border-radius: 0%;
  border: 2px solid rgb(var(--palette-neutral-30));
  &-icon {
    height: 100%;
    width: 100%;
    color: white;
  }
}

.label:hover input ~ .checkbox {
  border-color: rgb(var(--palette-neutral-50));
}

.label input:checked ~ .checkbox {
  background-color: rgb(var(--palette-neutral-30));
}

.label:hover input:checked ~ .checkbox {
  background-color: rgb(var(--palette-neutral-50));
}
</style>
