<template>
  <div :class="['masonry-grid']">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: var(--responsive-spacing-medium);
}
</style>
