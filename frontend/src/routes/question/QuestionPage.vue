<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const handleClick = () => {
  const newRoute = `/question/${parseInt(route.params.nr as string) + 1}`;
  console.debug(newRoute);
  router.push(newRoute);
};
</script>

<template>
  <h1>This is question nr. {{ $route.params.nr }}</h1>
  <button @click="handleClick">Next question</button>
</template>

<style lang="scss" scoped></style>
