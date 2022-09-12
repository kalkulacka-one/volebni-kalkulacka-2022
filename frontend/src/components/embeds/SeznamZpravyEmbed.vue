<script setup lang="ts">
import ThemeProvider from '@/components/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="seznam-zpravy">
    <slot />
  </ThemeProvider>
</template>
