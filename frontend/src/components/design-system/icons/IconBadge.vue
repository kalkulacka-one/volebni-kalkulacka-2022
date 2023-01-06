<script setup lang="ts">
import IconComponent from '@/components/design-system/icons/IconComponent.vue';

export interface Props {
  icon: string;
  color?: string;
  backgroundColor: string;
  title?: string;
}

withDefaults(defineProps<Props>(), {
  color: 'rgb(var(--color-neutral-fg-inverse))',
  title: undefined,
});
</script>

<template>
  <div class="icon-badge">
    <IconComponent :icon="icon" :color="color" :title="title" size="small" />
  </div>
</template>

<style lang="scss" scoped>
.icon-badge {
  padding: var(--spacing-extra-small);
  border-radius: 50%;
  background-color: v-bind(backgroundColor);
  aspect-ratio: 1 / 1;
  width: max-content;
  display: inline-block;
}
</style>
