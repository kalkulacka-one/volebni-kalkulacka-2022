<script setup lang="ts">
export interface Props {
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: 'xx-small' | 'small' | 'medium' | 'large';
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
  font-family: var(--typography-headline-family);
  font-weight: 700;
  color: v-bind(color);
}

.xx-small {
  font-size: var(--typography-title-smaller-small-size);
  line-height: var(--typography-title-smaller-small-line-height);
}

.small {
  font-size: var(--typography-headline-small-size);
  line-height: var(--typography-headline-small-line-height);
  letter-spacing: var(--typography-headline-small-letter-spacing);
}

.medium {
  font-size: var(--typography-headline-medium-size);
  line-height: var(--typography-headline-medium-line-height);
  letter-spacing: var(--typography-headline-medium-letter-spacing);
}

.large {
  font-size: var(--typography-headline-large-size);
  line-height: var(--typography-headline-large-line-height);
  letter-spacing: var(--typography-headline-large-letter-spacing);
}
</style>
