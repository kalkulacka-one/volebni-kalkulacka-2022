<template>
  <div :class="['masonry-grid']">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(24rem, calc(100% - 2 * var(--responsive-spacing-medium))), 1fr)
  );
  gap: var(--responsive-spacing-medium);
}
</style>
