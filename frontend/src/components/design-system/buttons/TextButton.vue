<script setup lang="ts">
defineProps<{
  slot: string;
  tag: 'button' | 'a';
  href?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <template>
    <component
      class="button"
      :is="tag"
      :href="href"
      :disabled="disabled"
      @click.prevent="$emit('click')"
    >
      <slot />
    </component>
  </template>
</template>

<style scoped>
.button {
  display: inline-block;
  padding: var(--unit-extra-small);
  border-radius: var(--token-border-radius-small);
  border: var(--unit-extra-small) solid transparent;
  background-color: var(--token-color-fill-light);
  outline: none;
}

.button:hover {
  box-shadow: var(--token-glow);
}

.button:focus,
.button:active {
  background-color: var(--token-color-fill-highlighted);
  box-shadow: var(--token-glow-highlighted);
}

a.button {
  text-decoration: none;
  color: inherit;
}
</style>
