<script lang="ts"></script>

<script setup lang="ts">
import { computed } from 'vue';
import IconArrowForward from '../../icons/IconArrowForward.vue';
import ButtonText from '../typography/ButtonText.vue';

const props = defineProps<{
  size: 'small' | 'medium';
  iconPosition: 'start' | 'end';
}>();

const labelSize = computed(() => {
  return props.size;
});

const buttonClass = computed(() => {
  const c = ['button'];
  if (props.size === 'small') {
    c.push('button__small');
  }
  return c;
});

const iconClass = computed(() => {
  const c = new Array('icon');
  if (props.size === 'small') {
    c.push('icon__small');
  }
  if (props.iconPosition === 'start') {
    c.push('icon__start');
  }
  return c;
});
</script>

<template>
  <button :class="buttonClass">
    <IconArrowForward :class="iconClass" />
    <ButtonText :size="labelSize" class="label"><slot /></ButtonText>
  </button>
</template>

<style scoped lang="scss">
/* Auto layout */
.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;
  height: 24px;
  border-width: 0px;
  background-color: transparent;
  cursor: pointer;
  > * {
    color: rgb(var(--color-neutral-fg));
  }
  &:disabled {
    cursor: default;
    > * {
      color: rgb(var(--color-neutral-fg-disabled));
    }
  }
  &:hover {
    > * {
      color: rgb(var(--color-neutral-fg-hover));
    }
  }
  &:active {
    > * {
      color: rgb(var(--color-neutral-fg-active));
    }
  }
  &__small {
    height: 16px;
  }
}
.label {
  pointer-events: none;
  order: 2;
  white-space: nowrap;
}
.icon {
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  order: 3;
  height: 15.25px;
  width: 15.25px;
  &__start {
    order: 1;
    rotate: 180deg;
  }
  &__small {
    height: 10.17px;
    width: 10.17px;
  }
}
</style>
