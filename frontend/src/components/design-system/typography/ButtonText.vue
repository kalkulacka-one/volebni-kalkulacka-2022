<script lang="ts">
import { defineComponent } from 'vue';

import SimpleText from './SimpleText.vue';

export default defineComponent({
  components: { SimpleText },
  extends: SimpleText,
});
</script>

<script setup lang="ts">
export interface Props {
  size?: 'small' | 'medium';
  tag?: 'span';
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
  tag: 'span',
});
</script>

<template>
  <SimpleText :tag="tag" :class="[size]">
    <slot />
  </SimpleText>
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
