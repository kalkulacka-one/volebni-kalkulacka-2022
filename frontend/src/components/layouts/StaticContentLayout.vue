<script setup lang="ts"></script>

<template>
  <div class="content">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
