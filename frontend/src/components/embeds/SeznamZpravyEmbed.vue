<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="seznam-zpravy">
    <router-view />
  </ThemeProvider>
</template>
