<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="a2larm">
    <router-view />
  </ThemeProvider>
</template>
