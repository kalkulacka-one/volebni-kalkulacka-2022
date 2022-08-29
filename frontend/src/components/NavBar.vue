<script setup lang="ts">
import { appRoutes } from '@/main';
import { useRoute, useRouter } from 'vue-router';

defineProps<{
  help?: boolean;
  fillAgain?: boolean;
  quit?: boolean;
}>();
const router = useRouter();
const route = useRoute();
const subtitle = (route.params.election as string).concat(
  route.params.district ? ` - ${route.params.district}` : ''
);
const handleHelpClicked = () => {
  alert('This is an excelent help.');
};
const handleFillAgainClicked = () => {
  const answer = window.confirm(
    'Do you really want to leave? you have unsaved changes!'
  );
  // cancel the navigation and stay on the same page
  if (answer) {
    router.push({
      name: appRoutes.districtSelection.name,
      params: { election: route.params.election },
    });
  }
};
const handleQuit = () => {
  //right now this does nothing, should redirect to landing page
  console.warn('My purpose is to pass butter.');
};
</script>

<template>
  <div class="wrapper">
    <div class="title">
      <h3>Volebni kalkulacka</h3>
      <p>{{ subtitle }}</p>
    </div>
    <div class="buttons">
      <button v-if="help" @click="handleHelpClicked">Napoveda</button>
      <button v-if="fillAgain === true" @click="handleFillAgainClicked">
        Vyplnit znovu
      </button>
      <button v-if="quit === true" @click="handleQuit">
        Zpet na hlavni stranku
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: relative;
  width: 100%;
  height: 72px;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
}
</style>
