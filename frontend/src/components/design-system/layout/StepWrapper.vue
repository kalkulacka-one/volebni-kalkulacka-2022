<template>
  <div class="step-wrapper">
    <div class="before">
      <slot name="before" />
    </div>
    <div class="main">
      <slot />
    </div>
    <div class="after">
      <slot name="after" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-wrapper {
  display: grid;
  grid-template-columns: 1fr clamp(32rem, 50vw, 48rem) 1fr;
  grid-template-areas: 'before main after';
  gap: var(--spacing-large);
  height: 100%;
  align-items: center;
  padding: var(--spacing-small);

  .before {
    grid-area: before;
    justify-self: end;
  }

  .main {
    grid-area: main;
  }

  .after {
    grid-area: after;
  }

  /* TODO: update breakpoint */
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'main';

    .before,
    .after {
      display: none;
    }
  }
}
</style>
