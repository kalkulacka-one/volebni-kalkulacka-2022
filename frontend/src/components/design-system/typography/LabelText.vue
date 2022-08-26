<script setup lang="ts">
export interface Props {
  tag?: 'span';
  color?: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'span',
  color: 'currentColor',
});
</script>

<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  font-family: var(--typography-label-family);
  font-size: var(--typography-label-size);
  line-height: var(--typography-label-line-height);
  letter-spacing: var(--typography-label-letter-spacing);
  font-weight: 700;
  text-transform: uppercase;
  color: v-bind(color);
}
</style>
