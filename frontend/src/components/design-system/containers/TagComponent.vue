<script setup lang="ts">
import { computed } from 'vue';
import LabelText from '@/components/design-system/typography/LabelText.vue';

export interface Props {
  kind: 'neutral' | 'primary' | 'secondary';
}
const classes = computed(() => [`tag--${props.kind}`]);

const props = withDefaults(defineProps<Props>(), {
  kind: 'neutral',
});
</script>

<template>
  <div :class="['tag', classes]">
    <LabelText>
      <slot />
    </LabelText>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  padding: var(--spacing-tiny) var(--spacing-extra-small);
  border-radius: var(--radius-extra-small);
  text-align: center;

  &--primary {
    background-color: rgb(var(--color-primary-bg));
    color: rgb(var(--color-primary-fg-strong));
  }

  &--secondary {
    background-color: rgb(var(--color-secondary-bg));
    color: rgb(var(--color-secondary-fg-strong));
  }

  &--neutral {
    background-color: rgb(var(--color-neutral-bg));
    color: rgb(var(--color-neutral-fg));
  }
}
</style>
