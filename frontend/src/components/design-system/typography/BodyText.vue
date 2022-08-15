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
  font-family: var(--typography-body-family);
}

.small {
  font-size: var(--typography-body-small-size);
  line-height: var(--typography-body-small-line-height);
  letter-spacing: var(--typography-body-small-letter-spacing);
}

.medium {
  font-size: var(--typography-body-medium-size);
  line-height: var(--typography-body-medium-line-height);
  letter-spacing: var(--typography-body-medium-letter-spacing);
}

.large {
  font-size: var(--typography-body-large-size);
  line-height: var(--typography-body-large-line-height);
  letter-spacing: var(--typography-body-large-letter-spacing);
}
</style>
