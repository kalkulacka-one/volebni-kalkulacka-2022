<script lang="ts">
import SimpleText from './SimpleText.vue';

export default {
  extends: SimpleText,
};
</script>

<script setup lang="ts">
export interface Props {
  size?: 'small' | 'medium';
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
});
</script>

<template>
  <component :is="tag" :class="[size]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-button-family);
  font-weight: 700;
  text-transform: uppercase;
}

.small {
  font-size: var(--typography-button-small-size);
  line-height: var(--typography-button-small-line-height);
  letter-spacing: var(--typography-button-small-letter-spacing);
}

.medium {
  font-size: var(--typography-button-medium-size);
  line-height: var(--typography-button-medium-line-height);
  letter-spacing: var(--typography-button-medium-letter-spacing);
}
</style>
