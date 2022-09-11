<script setup lang="ts">
import { computed } from 'vue';

import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';

export interface Props {
  transparent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
});

const classes = computed(() => ({
  'bottom-bar--transparent': props.transparent,
}));
</script>

<template>
  <ContainerComponent :class="['bottom-bar', classes]" padding="small">
    <slot />
  </ContainerComponent>
</template>

<style scoped lang="scss">
.bottom-bar {
  &--transparent {
    background-color: transparent;
  }
}
</style>
