<script setup lang="ts">
import RootLayout from '@/components/layouts/RootLayout.vue';
</script>

<template>
  <RootLayout>
    <div class="sticky-header-layout">
      <header v-if="$slots.header" class="header">
        <slot name="header" />
      </header>
      <header v-if="$slots['sticky-header']" class="sticky-header">
        <slot name="sticky-header" />
      </header>
      <main class="main">
        <slot />
      </main>
    </div>
  </RootLayout>
</template>

<style lang="scss" scoped>
.sticky-header-layout {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas: 'header' 'sticky-header' 'main';

  .header {
    grid-area: header;
    max-width: 100vw;
    position: sticky;
    left: 0;
  }

  .sticky-header {
    grid-area: sticky-header;
    max-width: 100vw;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .main {
    display: grid;
    grid-area: main;
  }
}
</style>
