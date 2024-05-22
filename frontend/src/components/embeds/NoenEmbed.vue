<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="puls-24">
    <router-view />
  </ThemeProvider>
</template>
