<script lang="ts">
import { defineComponent } from 'vue';

import SimpleText from './SimpleText.vue';

import { ESize } from '@/components/enums';

export default defineComponent({
  components: { SimpleText },
  extends: SimpleText,
});
</script>

<script setup lang="ts">
export interface Props {
  size?: ESize;
}

withDefaults(defineProps<Props>(), {
  size: ESize.MEDIUM,
});
</script>

<template>
  <SimpleText :tag="tag" :class="[size]">
    <slot />
  </SimpleText>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-headline-family);
  font-weight: 700;
}

.small {
  font-size: var(--typography-headline-small-size);
  line-height: var(--typography-headline-small-line-height);
  letter-spacing: var(--typography-headline-small-letter-spacing);
}

.medium {
  font-size: var(--typography-headline-medium-size);
  line-height: var(--typography-headline-medium-line-height);
  letter-spacing: var(--typography-headline-medium-letter-spacing);
}

.large {
  font-size: var(--typography-headline-large-size);
  line-height: var(--typography-headline-large-line-height);
  letter-spacing: var(--typography-headline-large-letter-spacing);
}
</style>
