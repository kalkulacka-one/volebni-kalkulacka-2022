<script lang="ts">
import { defineComponent } from 'vue';

import OutlinedButton from '@/components/design-system/buttons/OutlinedButton.vue';

export default defineComponent({
  components: { OutlinedButton },
  extends: OutlinedButton,
});
</script>

<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  inFavour?: boolean;
  against?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  inFavour: undefined,
  against: undefined,
});

const type = computed(() => {
  if (props.inFavour) {
    return 'in-favour';
  } else if (props.against) {
    return 'against';
  } else {
    return 'neutral';
  }
});
</script>

<template>
  <OutlinedButton :tag="tag" :href="href" :class="[type]">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </OutlinedButton>
</template>

<style scoped lang="scss">
.neutral,
.in-favour,
.against {
  &:hover,
  &:active {
    color: rgb(var(--palette-neutral-100));
  }
}

.neutral {
  color: rgb(var(--color-neutral-fg));
  border-color: rgb(var(--color-neutral-border-strong));

  &:hover {
    background-color: rgb(var(--color-neutral-bg-hover));
    border-color: rgb(var(--color-neutral-bg-hover));
  }

  &:active {
    background-color: rgb(var(--color-neutral-bg-active));
    border-color: rgb(var(--color-neutral-bg-active));
  }

  .selected {
    background-color: rgb(var(--color-neutral-border-strong));
    border-color: rgb(var(--color-neutral-border-strong));
  }
}

.in-favour {
  color: rgb(var(--color-primary-fg));
  border-color: rgb(var(--color-primary-border-strong));

  &:hover {
    background-color: rgb(var(--color-primary-bg-hover));
    border-color: rgb(var(--color-primary-bg-hover));
  }

  &:active {
    background-color: rgb(var(--color-primary-bg-active));
    border-color: rgb(var(--color-primary-bg-active));
  }

  .selected {
    background-color: rgb(var(--color-primary-border-strong));
    border-color: rgb(var(--color-primary-border-strong));
  }
}

.against {
  color: rgb(var(--color-secondary-fg));
  border-color: rgb(var(--color-secondary-border-strong));

  &:hover {
    background-color: rgb(var(--color-secondary-bg-hover));
    border-color: rgb(var(--color-secondary-bg-hover));
  }

  &:active {
    background-color: rgb(var(--color-secondary-bg-active));
    border-color: rgb(var(--color-secondary-bg-active));
  }

  .selected {
    background-color: rgb(var(--color-secondary-border-strong));
    border-color: rgb(var(--color-secondary-border-strong));
  }
}
</style>
