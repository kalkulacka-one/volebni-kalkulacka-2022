<script setup lang="ts">
export interface Props {
  tag?: string;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'span',
  color: 'rgb(var(--color-neutral-fg-strong))',
});
</script>

<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-label-family);
  font-size: var(--typography-label-size);
  line-height: var(--typography-label-line-height);
  letter-spacing: var(--typography-label-letter-spacing);
  font-weight: 700;
  text-transform: uppercase;
  color: v-bind(color);
}
</style>
