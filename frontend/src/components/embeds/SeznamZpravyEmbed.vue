<script setup lang="ts">
import ThemeProvider from '@/components/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="seznam-zpravy">
    <div>Najdu tam, co neznám.</div>
    <slot />
  </ThemeProvider>
</template>
