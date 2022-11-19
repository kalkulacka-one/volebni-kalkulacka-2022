<script setup lang="ts">
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';

import EmbedProvider from '@/components/utilities/embedding/EmbedProvider.vue';
import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

const route = useRoute();

const embed = computed(() => route.query.embed as string);

provide(EmbedKey, embed.value);
</script>

<template>
  <EmbedProvider :embed="embed">
    <router-view />
  </EmbedProvider>
</template>
