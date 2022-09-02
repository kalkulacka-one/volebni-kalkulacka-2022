<script setup lang="ts">
import ThemeProvider from '@/components/ThemeProvider.vue';
</script>

<template>
  <Suspense>
    <ThemeProvider>
      <router-view />
    </ThemeProvider>
  </Suspense>
</template>
