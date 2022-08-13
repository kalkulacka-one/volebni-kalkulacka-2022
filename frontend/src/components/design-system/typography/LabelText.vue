<script lang="ts">
import SimpleText from './SimpleText.vue';

export default {
  extends: SimpleText,
};
</script>

<template>
  <component :is="tag">
    <slot />
  </component>
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
