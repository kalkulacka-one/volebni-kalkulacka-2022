<script setup lang="ts">
import { ref, provide } from 'vue';

import { ToggleKey } from '@/components/design-system/containers/AccordionKey';

const isOpen = ref(false);
// const toggleAccordion = (() => {
//   isOpen.value = !isOpen.value;
// });

const switchIsOpen = (isOpenVal: boolean): boolean => {
  isOpen.value = isOpenVal;
  return isOpen.value;
};

provide(ToggleKey, { isOpen: isOpen, switch: switchIsOpen });
</script>

<template>
  <div>
    <slot name="toggle" />
    <slot name="alwaysVisible" />

    <template v-show="!isOpen">
      <slot name="collapsedVisible" />
    </template>

    <template v-show="isOpen">
      <slot name="uncollapsedVisible" />
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
