<script setup lang="ts">
export interface Props {
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: 'extra-small' | 'small' | 'medium' | 'large';
  centered?: boolean;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  centered: false,
  color: 'rgb(var(--color-neutral-fg-strong))',
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      size,
      {
        centered: centered,
      },
    ]"
  >
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

.extra-small {
  font-size: var(--typography-headline-extra-small-size);
  line-height: var(--typography-headline-extra-small-line-height);
  letter-spacing: var(--typography-headline-extra-small-letter-spacing);
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

.centered {
  text-align: center;
}
</style>
