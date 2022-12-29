<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="cnn-prima">
    <router-view />
  </ThemeProvider>
</template>
