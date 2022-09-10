<script setup lang="ts">
import { mdiLoading } from '@mdi/js';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
</script>

<template>
  <div class="loader">
    <IconComponent
      :icon="mdiLoading"
      :load-animation="true"
      size="large"
      color="rgb(var(--color-secondary-fg))"
      class="loader-icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  background-color: rgba(var(--color-neutral-bg-strong));
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
