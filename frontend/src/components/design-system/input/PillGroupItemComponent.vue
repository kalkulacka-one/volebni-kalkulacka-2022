<script setup lang="ts">
import { ref, watch } from 'vue';
import LabelText from '@/components/design-system/typography/LabelText.vue';

export interface Props {
  groupName: string;
  value?: string;
  checked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 'on',
  checked: false,
});

// var prev = null;
// const handleChange = (e) => {
//   (prev) ? console.log('prev', prev) : null;

//   if(e.target !== prev) {
//       prev = e.target;
//   }

//   console.log("e", this);
// };

const handleClick = (e) => {
  console.log(e);
  isChecked.value = e.target.checked;
};

const isChecked = ref(props.checked);
const input = ref(null);

watch(
  input,
  (input, prev) => {
    console.log('now, prevCount', input.checked, prev);
  },
  { deep: true }
);
</script>

<template>
  <li class="pill-group__item">
    <label class="pill" :class="{ 'pill--active': isChecked }">
      {{ isChecked }}
      <input
        ref="input"
        class="pill-input"
        type="radio"
        :value="value || 'on'"
        :name="props.groupName"
        :checked="isChecked"
      />
      <LabelText>
        <slot />
      </LabelText>
    </label>
  </li>
</template>

<style lang="scss" scoped>
.pill-group__item {
  display: block;
}
.pill-input {
  // visibility: hidden;
}
.pill {
  display: block;
  border-color: rgb(var(--color-neutral-border));
  border-radius: var(--radius-medium);
  border-style: solid;
  border-width: var(--spacing-pico);
  background-color: rgb(var(--color-neutral-bg));
  color: rgb(var(--color-neutral-fg));
  padding: var(--spacing-extra-small) var(--spacing-small);

  &--active {
    border-color: rgb(var(--color-neutral-border-strong));
    background-color: rgb(var(--color-neutral-bg-active));
    color: rgb(var(--color-neutral-fg-inverse));
  }
}
</style>
