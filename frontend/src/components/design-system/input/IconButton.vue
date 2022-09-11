<script setup lang="ts">
//const props = defineProps<{}>();
</script>

<template>
  <button class="icon-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
/* Auto layout */
.icon-button {
  padding: var(--spacing-extra-small);
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  color: inherit;

  &:disabled {
    color: rgb(var(--color-neutral-fg-disabled));
    background: transparent !important;
    cursor: not-allowed;
  }

  @media (hover: hover) {
    &:hover {
      background: rgba(var(--color-neutral-bg-backdrop-hover));
    }
  }

  &:active {
    background: rgba(var(--color-neutral-bg-backdrop-active));
  }
}
</style>
