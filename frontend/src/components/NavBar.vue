<script setup lang="ts">
defineProps<{
  subtitle: string;
}>();
</script>

<template>
  <div class="wrapper">
    <div class="title">
      <h3>Volebni kalkulacka</h3>
      <p>{{ subtitle }}</p>
    </div>
    <div class="buttons">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 64px;

  position: relative;
  width: 100%;
  height: 72px;

  /* overlayBlur */

  backdrop-filter: blur(72px);
  /* Note: backdrop-filter has minimal browser support */
}
.title {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
}
</style>
