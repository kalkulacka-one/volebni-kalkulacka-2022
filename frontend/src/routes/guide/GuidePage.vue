<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import BottomBar from './BottomBar.vue';
import { computed } from 'vue';
const route = useRoute();
const subtitle = computed(() => `navod ${route.params.nr}/2`);
const buttonTitle = computed(() => {
  if (route.params.nr === '1') {
    return 'Pokracovat';
  } else {
    return 'Prvni otazka';
  }
});
const buttonRoute = computed(() => {
  if (route.params.nr === '1') {
    return '/guide/2';
  } else {
    return '/question/1';
  }
});
</script>

<template>
  <NavBar subtitle="Subtitle">
    <button>Napoveda</button>
    <button>Zpet na hlavni stranku</button>
  </NavBar>
  <h1>This is guide</h1>
  <BottomBar
    :button-title="buttonTitle"
    :button-route="buttonRoute"
    :subtitle="subtitle"
  ></BottomBar>
</template>

<style lang="scss" scoped></style>
