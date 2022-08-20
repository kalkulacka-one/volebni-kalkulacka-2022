<script setup lang="ts">
export interface Props {
  tag?: string;
  size?: 'extra-small' | 'small' | 'medium' | 'large';
}

withDefaults(defineProps<Props>(), {
  tag: 'p',
  size: 'medium',
});
</script>

<template>
  <component :is="tag" :class="[size]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-body-family);
}

.small {
  font-size: var(--typography-body-small-size);
  line-height: var(--typography-body-small-line-height);
  letter-spacing: var(--typography-body-small-letter-spacing);
}

.medium {
  font-size: var(--typography-body-medium-size);
  line-height: var(--typography-body-medium-line-height);
  letter-spacing: var(--typography-body-medium-letter-spacing);
}

.large {
  font-size: var(--typography-body-large-size);
  line-height: var(--typography-body-large-line-height);
  letter-spacing: var(--typography-body-large-letter-spacing);
}
</style>
