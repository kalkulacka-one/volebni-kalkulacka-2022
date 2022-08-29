<script setup lang="ts">
import HeadlineText from './design-system/typography/HeadlineText.vue';
import BodyText from './design-system/typography/BodyText.vue';
</script>

<template>
  <HeadlineText color="rgb(var(--palette-neutral-30))" tag="p" size="xx-small">
    <span class="content-title">Více o tématu</span>
  </HeadlineText>
  <BodyText tag="p" size="medium">
    <slot />
  </BodyText>
</template>

<style scoped lang="scss">
.content-title {
  font-family: var(--typography-family-inter);
  padding-bottom: var(--accordion-content-spacing);
}
</style>
