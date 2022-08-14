<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
defineProps<{
  subtitle: string;
  buttonTitle: string;
  buttonRoute: string;
}>();
</script>

<template>
  <div class="wrapper">
    <button @click="router.push(buttonRoute)">{{ buttonTitle }}</button>
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
