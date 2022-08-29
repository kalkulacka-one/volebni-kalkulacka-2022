<script setup lang="ts">
export interface Props {
  current: number;
}

const props = withDefaults(defineProps<Props>(), {
  current: undefined,
});

const totalSteps = 4;
</script>

<template>
  <div class="step-wrapper">
    <template v-for="n in totalSteps" :key="n">
      <div
        class="step-progress"
        :class="[n === props.current ? 'step-progress--active' : '']"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.step-wrapper {
  display: flex;

  div:nth-child(n + 2) {
    margin-left: 0.313rem;
  }
}
.step-progress {
  border-radius: var(--radius-large);
  background-color: rgb(var(--color-neutral-fg-disabled));
  width: var(--spacing-extra-small);
  height: var(--spacing-extra-small);

  &--active {
    background-color: rgb(var(--color-neutral-fg-strong));
    width: 1.188rem;
    height: var(--spacing-extra-small);
  }
}
</style>
