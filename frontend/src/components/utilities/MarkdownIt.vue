<script setup lang="ts">
import { computed } from 'vue';
import markdownIt from 'markdown-it';

export interface Props {
  markdown: string;
}

const props = defineProps<Props>();

const renderer = new markdownIt();
const html = computed(() => renderer.render(props.markdown));
</script>

<template>
  <div v-html="html" />
</template>
