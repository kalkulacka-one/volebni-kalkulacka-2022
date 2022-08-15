<script setup lang="ts">
export interface Props {
  tag?: 'button' | 'a';
  href?: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'button',
  href: undefined,
});
</script>

<template>
  <component :is="tag" :href="href">
    <slot />
  </component>
</template>
