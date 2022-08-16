<script lang="ts">
export enum IconButtonSizeEnum {
  Small,
  Medium,
  Large,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
const elementSize = computed(() => {
  switch (props.size) {
    case IconButtonSizeEnum.Small:
      return { button: 32, icon: 16 };
    case IconButtonSizeEnum.Medium:
      return { button: 40, icon: 24 };
    case IconButtonSizeEnum.Large:
      return { button: 56, icon: 40 };
    default:
      return { button: 32, icon: 16 };
  }
});

const props = defineProps<{
  size: IconButtonSizeEnum;
  testText?: string;
}>();
console.debug(elementSize);
</script>

<template>
  <button
    class="button"
    :style="{
      width: elementSize.button + 'px',
      height: elementSize.button + 'px',
      borderRadius: elementSize.button + 'px',
    }"
  >
    {{ props.testText }}
    <div
      class="button__star"
      :style="{
        width: elementSize.icon + 'px',
        height: elementSize.icon + 'px',
      }"
    >
      <slot
        :style="{
          width: elementSize.icon + 'px',
          height: elementSize.icon + 'px',
        }"
      />
    </div>
  </button>
</template>

<style scoped lang="scss">
/* Auto layout */
.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-width: 0px;
  background-color: inherit;
  &:hover {
    background: rgba(218, 216, 215, 0.2);
    cursor: pointer;
  }
  &:active {
    background: rgba(218, 216, 215, 0.6);
  }
  .__star {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
