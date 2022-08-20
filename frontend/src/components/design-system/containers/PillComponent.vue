<script lang="ts">
export enum ColorPill {
  Light,
  Dark,
}
</script>

<script setup lang="ts">
export interface Props {
  icon: boolean;
  color?: ColorPill;
  title: string;
}
withDefaults(defineProps<Props>(), {
  icon: false,
  color: ColorPill.Light,
  title: 'Label',
});
</script>

<template>
  <slot />
</template>
