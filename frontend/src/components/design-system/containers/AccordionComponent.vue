<script setup lang="ts">
import { ref } from 'vue';

import CardComponent from './CardComponent.vue';
import IconComponent from '../icons/IconComponent.vue';

import { mdiChevronDown } from '@mdi/js';

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <button
      :aria-controls="`collapse${$.uid}`"
      :aria-expanded="isOpen"
      class="button"
      @click="toggleAccordion()"
    >
      <div>{{ isOpen ? 'Skrýt detaily' : 'Zobrazit detaily' }}</div>
      <div class="icon">
        <IconComponent
          :style="{ transform: `rotate(${isOpen ? '180deg' : '0deg'} )` }"
          :icon="mdiChevronDown"
          size="medium"
          color="currentColor"
        />
      </div>
    </button>

    <CardComponent
      v-show="isOpen"
      :id="`collapse${$.uid}`"
      corner="top-left"
      background-color="rgb(var(--palette-neutral-90))"
      padding="medium"
      padding-responsive
      :style="{ marginTop: 'var(--accordion-elements-spacing)' }"
    >
      <slot name="content" />
    </CardComponent>
  </div>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-family: var(--typography-family-radio-canada);
  font-size: var(--accordion-title-fs);
  font-weight: 700;
  letter-spacing: var(--accordion-title-ls);
  text-transform: uppercase;
  text-decoration: none;

  background-color: transparent;
  color: rgb(var(--color-neutral-fg));

  cursor: pointer;

  width: 100%;
  height: var(--accordion-title-height);
  padding: 0;
  border: none;

  &:hover {
    color: rgb(var(--color-neutral-fg-hover));
  }

  &:active {
    color: rgb(var(--color-neutral-fg-active));
  }
}

.icon {
  margin-right: 0.75rem;
}
</style>
