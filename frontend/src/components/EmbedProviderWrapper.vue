<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import EmbedProvider from '@/components/EmbedProvider.vue';

const route = useRoute();

const embed = computed(() => route.query.embed as string);
</script>

<template>
  <EmbedProvider :embed="embed">
    <router-view />
  </EmbedProvider>
</template>
