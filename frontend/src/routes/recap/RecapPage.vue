<script setup lang="ts">
import { appRoutes } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import RecapNavBar from './RecapNavBar.vue';
const router = useRouter();
const route = useRoute();
const handleBackClicked = () => {
  router.push({
    name: appRoutes.question.name,
    params: { ...route.params, nr: 10 },
  });
};
const handleResultsClicked = () => {
  router.push({
    name: appRoutes.result.name,
    params: { ...route.params },
  });
};
</script>
<template>
  <NavBar :help="true" :quit="true" :fill-again="true" />
  <RecapNavBar
    :on-back="handleBackClicked"
    :on-results="handleResultsClicked"
  />
  <p>This is summary page</p>
</template>
