<script setup lang="ts">
import { computed, inject } from 'vue';

import { EmbedKey } from '@/components/EmbedKey';

export interface Props {
  embed?: boolean | string;
}

const props = withDefaults(defineProps<Props>(), {
  embed: false,
});

const currentEmbed = inject(EmbedKey);

const classes = computed(() => ({
  [`embed-wrapper--${currentEmbed}`]: props.embed,
}));
</script>

<template>
  <div
    v-if="(currentEmbed && embed === true) || embed === currentEmbed"
    :class="['embed-wrapper', classes]"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.embed-wrapper {
  display: contents;
}
</style>
