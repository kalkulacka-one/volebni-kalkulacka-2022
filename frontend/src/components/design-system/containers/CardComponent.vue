<script setup lang="ts">
export interface Props {
  radius?: 'small' | 'large';
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  border?: boolean;
  borderKind?: 'normal' | 'strong';
  shadow?: boolean;
  padding?: 'small' | 'large';
}

withDefaults(defineProps<Props>(), {
  radius: 'small',
  border: false,
  borderKind: 'normal',
  shadow: false,
  padding: 'small',
});
</script>

<template>
  <slot />
</template>
