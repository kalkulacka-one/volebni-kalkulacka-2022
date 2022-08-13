<script setup lang="ts">
export interface Props {
  tag?: 'div' | 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

withDefaults(defineProps<Props>(), {
  tag: 'div',
});
</script>

<template>
  <component :is="tag">
    <slot />
  </component>
</template>
