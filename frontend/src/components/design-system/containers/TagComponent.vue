<script setup lang="ts">
import LabelText from '@/components/design-system/typography/LabelText.vue';
</script>

<template>
  <div class="tag">
    <LabelText>
      <slot />
    </LabelText>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  background-color: rgb(var(--color-secondary-bg));
  color: rgb(var(--color-secondary-fg-strong));
  padding: var(--spacing-tiny) var(--spacing-extra-small);
  border-radius: var(--radius-extra-small);
}
</style>
