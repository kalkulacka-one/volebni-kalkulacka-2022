<script setup lang="ts">
export interface Props {
  padding?: boolean;
  paddingSize?: 'small' | 'large';
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: false,
  paddingSize: 'small',
  background: 'rgb(var(--color-neutral-bg-container))',
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
