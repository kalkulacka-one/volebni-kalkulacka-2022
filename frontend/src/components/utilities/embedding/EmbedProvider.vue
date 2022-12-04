<script setup lang="ts">
import { camelize, capitalize, computed, defineAsyncComponent } from 'vue';

export interface Props {
  embed?: string;
}

const props = defineProps<Props>();

const importEmbed = () =>
  props.embed !== undefined
    ? import(`../../embeds/${capitalize(camelize(props.embed))}Embed.vue`)
    : import('./WebProvider.vue');

const Embed = defineAsyncComponent(() => importEmbed());
const classes = computed(() => ({
  [`embed-provider--${props.embed}-embed`]: props.embed,
  'embed-provider--web-provider': !props.embed,
}));
</script>

<template>
  <component :is="Embed" :class="['embed-provider', classes]" />
</template>

<style scoped lang="scss">
.embed-provider {
  display: contents;
}
</style>
