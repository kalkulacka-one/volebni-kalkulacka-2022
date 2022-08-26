<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import DistrictSelection, {
  type DistrictSelectionProps,
} from './DistrictSelection.vue';
import { appRoutes } from '@/main';
import { useElectionStore } from '@/stores/electionStore';
const router = useRouter();
const route = useRoute();
const store = useElectionStore();
const options: DistrictSelectionProps['options'] = store.districts.map((x) => {
  return { district_code: x.district_code, label: x.label };
});
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
