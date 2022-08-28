<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  current: number;
}

const props = withDefaults(defineProps<Props>(), {
  current: 1,
});

const classes = computed(() => ({
  'step-progress--active': props.current,
}));

const totalSteps = 4;
</script>

<template>
  <div class="step-wrapper">
    <template v-for="n in totalSteps" :key="n">
      <div
        class="step-progress"
        :class="[n === props.current ? classes : '']"
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
