<script setup lang="ts"></script>

<template>
  <ul class="pill-group">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.pill-group {
  display: flex;
  gap: var(--gap-small);
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
