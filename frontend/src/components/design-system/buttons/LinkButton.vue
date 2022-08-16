<script lang="ts">
export enum LinkButtonSizeEnum {
  Small,
  Default,
}
export enum LinkButtonTypeEnum {
  Left,
  Right,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IconArrowForward from '../../icons/IconArrowForward.vue';
import ButtonText from '../typography/ButtonText.vue';

const props = defineProps<{
  size: LinkButtonSizeEnum;
  type: LinkButtonTypeEnum;
  label: string;
}>();

const labelSize = computed(() => {
  switch (props.size) {
    case LinkButtonSizeEnum.Small:
      return 'small';
    default:
      return 'medium';
  }
});

const buttonClass = computed(() => {
  const c = ['button'];
  if (props.size === LinkButtonSizeEnum.Small) {
    c.push('button__small');
  }
  return c;
});

const iconClass = computed(() => {
  const c = new Array('button__icon');
  if (props.size === LinkButtonSizeEnum.Small) {
    c.push('button__icon__small');
  }
  if (props.type === LinkButtonTypeEnum.Left) {
    c.push('button__icon__left');
  }
  return c;
});
</script>

<template>
  <button :class="buttonClass">
    <IconArrowForward :class="iconClass" />
    <ButtonText :size="labelSize" class="button__label">{{
      props.label
    }}</ButtonText>
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
  &:disabled {
    cursor: default;
    > * {
      color: var(--color-neutral-fg-disabled);
    }
  }
  &:hover {
    > * {
      color: var(--color-neutral-fg-hover);
    }
  }
  &:active {
    > * {
      color: var(--color-neutral-fg-active);
    }
  }
  &__small {
    height: 16px;
  }
  &__label {
    order: 2;
    white-space: nowrap;
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 3;
    height: 15.25px;
    width: 15.25px;
    &__left {
      order: 1;
      rotate: 180deg;
    }
    &__small {
      height: 10.17px;
      width: 10.17px;
    }
  }
}
</style>
