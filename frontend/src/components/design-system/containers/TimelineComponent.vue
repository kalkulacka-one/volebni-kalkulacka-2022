<script setup lang="ts"></script>

<template>
  <ul class="timeline">
    <slot />
  </ul>
</template>

<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--base-medium);
  padding-left: var(--base-small);
  margin: 0;
  list-style-type: none;
}
</style>
