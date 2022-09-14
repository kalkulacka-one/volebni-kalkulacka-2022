<script setup lang="ts">
import { computed } from 'vue';

import BodyText from '@/components/design-system/typography/BodyText.vue';

export interface Props {
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  backgroundColor: 'rgb(var(--color-neutral-bg-strong))',
});

const classes = computed(() => ({
  [`filled-circle--${props.size}`]: props.size,
}));

const textSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 'medium';
    case 'medium':
      return 'large';
    case 'large':
      return 'large';
    case 'extra-large':
      return 'large';
    default:
      return 'medium';
  }
});
</script>

<template>
  <div
    :class="['filled-circle', classes]"
    :style="{ 'background-color': backgroundColor }"
  >
    <BodyText class="text" :size="textSize">
      <slot />
    </BodyText>
  </div>
</template>

<style scoped lang="scss">
.filled-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &--small {
    width: var(--spacing-large);
    height: var(--spacing-large);
  }

  &--medium {
    width: var(--spacing-extra-large);
    height: var(--spacing-extra-large);
  }

  &--large {
    width: var(--spacing-huge);
    height: var(--spacing-huge);
  }

  &--extra-large {
    width: calc(3 * var(--spacing-medium));
    height: calc(3 * var(--spacing-medium));
  }
}

.text {
  color: rgb(var(--color-neutral-fg-inverse));
  font-weight: bold;
  word-break: break-all;
}
</style>
