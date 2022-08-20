<script setup lang="ts">
export interface Props {
  padding?: 'small' | 'large';
  background?: string;
}

withDefaults(defineProps<Props>(), {
  padding: undefined,
  background: 'rgb(var(--color-neutral-bg-container))',
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
