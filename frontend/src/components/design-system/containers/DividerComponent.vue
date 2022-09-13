<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  weight?: 'light' | 'normal' | 'bold';
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  weight: 'normal',
  lineStyle: 'solid',
  color: 'rgb(var(--color-neutral-border))',
  vertical: false,
});

const classes = computed(() => ({
  [`divider--weight-${props.weight}`]: props.weight,
  'divider--vertical': props.vertical,
}));

const tag = computed(() => (props.vertical ? 'div' : 'hr'));
</script>

<template>
  <component :is="tag" :class="['divider', classes]" />
</template>

<style lang="scss" scoped>
.divider {
  margin: 0;
  height: 0;
  border-style: v-bind(lineStyle);
  border-color: v-bind(color);

  &--weight {
    &-light {
      border-width: var(--spacing-pico);
      border-radius: var(--spacing-pico);
    }

    &-normal {
      border-width: var(--spacing-nano);
      border-radius: var(--spacing-nano);
    }

    &-bold {
      border-width: var(--spacing-tiny);
      border-radius: var(--spacing-tiny);
    }
  }

  &--vertical {
    width: 0;
    height: 100%;
    border-top-width: 0 !important;
    border-bottom-width: 0 !important;
    border-left-width: 0 !important;
    border-radius: initial;
  }

  &:not(.divider--vertical) {
    border-right-width: 0 !important;
    border-bottom-width: 0 !important;
    border-left-width: 0 !important;
  }
}
</style>
