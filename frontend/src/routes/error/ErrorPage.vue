<script setup lang="ts">
import { appRoutes } from '@/main';
import { useRouter, useRoute } from 'vue-router';

export interface Props {
  case: 'api-error-election' | 'api-error-district';
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();
const handleHomeClicked = () => {
  router.push({
    name: appRoutes.index.name,
    query: { ...route.query },
  });
};
let header = 'Unknown Error';
let details = 'Unknown error occurred!';
switch (props.case) {
  case 'api-error-election':
    header = 'Api Error';
    details = 'Could not load election information.';
    break;
  case 'api-error-district':
    header = 'Api Error';
    details = 'Could not load district information.';
    break;
  default:
    break;
}
</script>
<template>
  <h1>Error</h1>
  <h3>{{ header }}</h3>
  <p>{{ details }}</p>
  <button @click="handleHomeClicked">Domu</button>
</template>
