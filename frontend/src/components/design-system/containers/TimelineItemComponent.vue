<script setup lang="ts"></script>

<template>
  <li class="timeline-item">
    <slot />
  </li>
</template>

<style scoped lang="scss">
.timeline-item {
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: rgb(var(--palette-neutral-30));
  }

  &:before {
    top: var(--base-medium);
    left: calc(var(--base-small) * -1);
    width: var(--base-smaller);
    height: var(--base-smaller);
    border-radius: 50%;
  }

  &:after {
    top: var(--spacing-huge);
    left: calc(0.65rem * -1);
    height: calc(100% - var(--base-smaller));
    width: 1px;
  }
}
</style>
