<script setup lang="ts">
import { camelize, capitalize, defineAsyncComponent } from 'vue';

export interface Props {
  embed?: string;
}

const props = defineProps<Props>();

const importEmbed = () =>
  props.embed !== undefined
    ? import(`../../embeds/${capitalize(camelize(props.embed))}Embed.vue`)
    : import('./WebProvider.vue');

const Embed = defineAsyncComponent(() => importEmbed());
</script>

<template>
  <component :is="Embed" class="embed-provider" />
</template>

<style scoped lang="scss">
.embed-provider {
  display: contents;
}
</style>
