<script setup lang="ts">
import ThemeProvider from '@/components/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider>
    <slot />
  </ThemeProvider>
</template>
