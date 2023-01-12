<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';

const userStore = useUserStore();
userStore.fetchUser();
</script>

<template>
  <ThemeProvider>
    <router-view />
  </ThemeProvider>
</template>
