<script setup lang="ts">
import ThemeProvider from '@/components/ThemeProvider.vue';

import HelloWorld from './components/HelloWorld.vue';
import { appRoutes } from './main';
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
    <router-link :to="{ name: appRoutes.index.name }">Go to Index</router-link
    ><br />
    <router-link
      :to="{
        name: appRoutes.districtSelection.name,
        params: { election: 'senatni-2022' },
      }"
      >Go to Calculator</router-link
    ><br />
  </header>

  <main>
    <Suspense>
      <ThemeProvider>
        <router-view></router-view>
      </ThemeProvider>
    </Suspense>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
