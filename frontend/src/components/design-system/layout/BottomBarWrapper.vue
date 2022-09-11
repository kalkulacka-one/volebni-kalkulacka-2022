<template>
  <div class="bottom-bar-wrapper">
    <div class="main">
      <slot />
    </div>
    <div class="bottom-bar">
      <slot name="bottom-bar" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-bar-wrapper {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'main' 'bottom-bar';

  .main {
    grid-area: main;
    min-height: 100%;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .bottom-bar {
    grid-area: bottom-bar;
    position: sticky;
    bottom: 0;
  }
}
</style>
