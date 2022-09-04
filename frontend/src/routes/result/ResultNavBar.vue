<script setup lang="ts">
defineProps<{
  onBack: () => void;
}>();
</script>

<template>
  <div class="wrapper">
    <button class="button-back" @click="onBack">BACK</button>
    <h3 class="title">Moje shoda</h3>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  position: relative;
  width: 100%;
  height: 72px;
}
.title {
  flex: 10 1 100%;
}
.button-results {
  inline-size: min-content;
  white-space: nowrap;
}
.button-back {
  inline-size: min-content;
  white-space: nowrap;
}
</style>
