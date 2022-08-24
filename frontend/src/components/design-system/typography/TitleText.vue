<script setup lang="ts">
export interface Props {
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: 'extra-small' | 'small' | 'medium' | 'large';
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: 'rgb(var(--color-neutral-fg-strong))',
});
</script>

<template>
  <component :is="tag" :class="[size]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  font-family: var(--typography-title-family);
  font-weight: 700;
  color: v-bind(color);
}

.medium {
  font-size: var(--typography-title-medium-size);
  line-height: var(--typography-title-medium-line-height);
  letter-spacing: var(--typography-title-medium-letter-spacing);
}

.large {
  font-size: var(--typography-title-large-size);
  line-height: var(--typography-title-large-line-height);
  letter-spacing: var(--typography-title-large-letter-spacing);
}
</style>
