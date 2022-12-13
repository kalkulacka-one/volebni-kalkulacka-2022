<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="e15">
    <router-view />
  </ThemeProvider>
</template>
