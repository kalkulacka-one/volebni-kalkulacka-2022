<script lang="ts">
import { defineComponent } from 'vue';

import SimpleText from './SimpleText.vue';

export default defineComponent({
  components: { SimpleText },
  extends: SimpleText,
});
</script>

<template>
  <SimpleText :tag="tag">
    <slot />
  </SimpleText>
</template>

<style lang="scss" scoped>
* {
  font-family: var(--typography-label-family);
  font-size: var(--typography-label-size);
  line-height: var(--typography-label-line-height);
  letter-spacing: var(--typography-label-letter-spacing);
  font-weight: 700;
  text-transform: uppercase;
}
</style>
