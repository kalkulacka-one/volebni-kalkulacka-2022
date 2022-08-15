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
  size?: 'extra-small' | 'small' | 'medium' | 'large';
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
});
</script>

<template>
  <SimpleText :tag="tag" :class="[size]">
    <slot />
  </SimpleText>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-title-family);
  font-weight: 700;
}

.medium {
  font-size: var(--typography-title-medium-size);
  line-height: var(--typography-title-medium-line-height);
  letter-spacing: var(--typography-title-medium-letter-spacing);
}

.large {
  font-size: var(--typography-title-large-size);
  line-height: var(--typography-title-large-line-height);
  letter-spacing: var(--typography-title-large-letter-spacing);
}
</style>
