<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import GuideBottomBar from './GuideBottomBar.vue';
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
    return { name: 'guide', params: { ...route.params, nr: '2' } };
  } else {
    return { name: 'question', params: { ...route.params, nr: '1' } };
  }
});
</script>

<template>
  <NavBar subtitle="Subtitle">
    <button>Napoveda</button>
    <button>Zpet na hlavni stranku</button>
  </NavBar>
  <h1>This is guide</h1>
  <GuideBottomBar
    :button-title="buttonTitle"
    :button-route="buttonRoute"
    :subtitle="subtitle"
  ></GuideBottomBar>
</template>

<style lang="scss" scoped></style>
