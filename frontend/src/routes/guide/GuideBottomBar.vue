<script setup lang="ts">
defineProps<{
  subtitle: string;
  buttonTitle: string;
  onContinue: () => void;
  onSkip: () => void;
}>();
</script>

<template>
  <div class="wrapper">
    <button @click="onContinue">{{ buttonTitle }}</button>
    <button @click="onSkip">Preskocit napovedu</button>
    <p>{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 24px;
  position: fixed;
  bottom: 25px;
  width: 100%;
}
</style>
