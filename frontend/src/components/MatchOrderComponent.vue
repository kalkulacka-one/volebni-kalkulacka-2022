<script setup lang="ts">
import type { TSingleAvatarOrder } from './design-system/configurations/avatars-configuration';

const props = defineProps<{
  order: number;
  size: 'small' | 'medium' | 'large';
  configuration: TSingleAvatarOrder;
}>();
</script>

<template>
  <div
    :class="`match-order ${props.size}`"
    :style="{
      color: props.configuration.color,
      'background-color':
        props.order === 1
          ? props.configuration.backgroundColorWinner
          : props.configuration.backgroundColorOther,
    }"
  >
    {{ props.order }}.
  </div>
</template>

<style scoped lang="scss">
.match-order {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-weight: var(--match-order-fw);
  font-family: var(--typography-body-family);
}

.small {
  width: var(--match-order-size-small);
  height: var(--match-order-size-small);

  font-size: var(--match-order-fs-small);
}

.medium {
  width: var(--match-order-size-medium);
  height: var(--match-order-size-medium);

  font-size: var(--match-order-fs-medium);
}

.large {
  width: var(--match-order-size-large);
  height: var(--match-order-size-large);

  font-size: var(--match-order-fs-large);
}
</style>
