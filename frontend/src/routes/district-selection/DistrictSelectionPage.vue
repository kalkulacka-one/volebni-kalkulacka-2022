<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import DistrictSelection from './DistrictSelection.vue';
import { appRoutes } from '@/main';
const router = useRouter();
const route = useRoute();
const options = [
  {
    id: '1-karlovy-vary',
    label: '1 - Karlovy Vary',
  },
  {
    id: '4-most',
    label: '4 - Most',
  },
  {
    id: '7-plzen-mesto',
    label: '7 - Plzeň-město',
  },
];
const onSubmit = (district: string) => {
  console.debug(district);
  const guideRoute = {
    name: appRoutes.guide.name,
    params: { ...route.params, district: district, nr: 1 },
  };
  router.push(guideRoute);
};
</script>

<template>
  <NavBar :help="false" />
  <h1>This is district selection</h1>
  <DistrictSelection
    submit-label="Potvrdit a pokracovat"
    :on-confirm="onSubmit"
    :options="options"
  ></DistrictSelection>
</template>

<style lang="scss" scoped></style>
