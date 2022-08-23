<script setup lang="ts">
export interface Props {
  tag?: 'span';
  size: 'small' | 'medium';
  color?: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'span',
  color: 'currentColor',
});
</script>

<template>
  <component :is="tag" :class="[size]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-button-family);
  font-weight: 700;
  text-transform: uppercase;
  color: v-bind(color);
}

.small {
  font-size: var(--typography-button-small-size);
  line-height: var(--typography-button-small-line-height);
  letter-spacing: var(--typography-button-small-letter-spacing);
}

.medium {
  font-size: var(--typography-button-medium-size);
  line-height: var(--typography-button-medium-line-height);
  letter-spacing: var(--typography-button-medium-letter-spacing);
}
</style>
