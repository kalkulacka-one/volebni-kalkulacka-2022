<script setup lang="ts">
import ThemeProvider from '@/components/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="e15">
    <slot />
  </ThemeProvider>
</template>
