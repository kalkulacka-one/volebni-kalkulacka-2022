<script setup lang="ts">
import { appRoutes } from '@/main';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export interface Props {
  case: 'not-found' | 'api-error-election' | 'api-error-calculator';
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
const pageInfo = computed(() => {
  let header = 'Unknown Error';
  let details = 'Unknown error occurred!';
  switch (props.case) {
    case 'not-found':
      header = 'Not Found';
      details = 'The requested page does not exist!';
      break;
    case 'api-error-election':
      header = 'Api Error';
      details = 'Could not load election information.';
      break;
    case 'api-error-calculator':
      header = 'Api Error';
      details = 'Could not load district information.';
      break;
    default:
      break;
  }
  console.debug(props.case);
  return {
    header: header,
    details: details,
  };
});
</script>
<template>
  <h1>Error</h1>
  <h3>{{ pageInfo.header }}</h3>
  <p>{{ pageInfo.details }}</p>
  <button @click="handleHomeClicked">Domu</button>
</template>
