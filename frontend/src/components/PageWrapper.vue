<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore';
import { useRoute } from 'vue-router';
const route = useRoute();
const themeStore = useThemeStore();
if (route.params.theme && route.params.theme !== themeStore.theme) {
  console.debug(`Switching theme to '${route.params.theme}'`);
  themeStore.setTheme(route.params.theme as string);
}
</script>
<template>
  <slot />
</template>
