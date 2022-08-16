<script lang="ts">
import { defineComponent } from 'vue';

import OutlinedButton from '@/components/design-system/buttons/OutlinedButton.vue';

export default defineComponent({
  components: { OutlinedButton },
  extends: OutlinedButton,
});
</script>

<template>
  <OutlinedButton :tag="tag" :href="href">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </OutlinedButton>
</template>

<style scoped lang="scss">
* {
  background-color: rgb(var(--color-primary-bg-strong));
}
</style>
