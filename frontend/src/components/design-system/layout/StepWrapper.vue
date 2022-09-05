<template>
  <div class="step-wrapper">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </div>
</template>

<style scoped lang="scss">
.step-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--spacing-small);
}
</style>
