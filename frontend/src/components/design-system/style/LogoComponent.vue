<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  monochromatic?: string;
  text?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  monochromatic: undefined,
  text: true,
});

const classes = computed(() => ({
  'logo--monochromatic': props.monochromatic,
  'logo--text': props.text,
}));
</script>

<template>
  <div :class="['logo', classes]">
    <div class="text">Volební kalkulačka</div>
  </div>
</template>
