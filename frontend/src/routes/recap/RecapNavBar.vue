<script setup lang="ts">
defineProps<{
  onBack: () => void;
  onResults: () => void;
}>();
</script>

<template>
  <div class="wrapper">
    <button class="button-back" @click="onBack">BACK</button>
    <h3 class="title">Rekapitulace</h3>
    <button class="button-results" @click="onResults">Zobrazit vysledky</button>
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
