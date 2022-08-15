<script lang="ts">
import { defineComponent } from 'vue';

import LinkButton from '@/components/design-system/buttons/LinkButton.vue';

export default defineComponent({
  components: { LinkButton },
  extends: LinkButton,
});
</script>

<template>
  <LinkButton :tag="tag" :href="href">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </LinkButton>
</template>

<style scoped lang="scss">
* {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--spacing-small) - var(--spacing-nano));

  border-width: var(--spacing-nano);
  border-radius: var(--radius-small);
  border-top-right-radius: 0;
  border-color: rgb(var(--color-neutral-border-strong));
  border-style: solid;

  background-color: transparent;
}
</style>
