<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="denik">
    <router-view />
  </ThemeProvider>
</template>
