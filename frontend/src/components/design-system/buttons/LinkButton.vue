<script lang="ts">
import { defineComponent } from 'vue';

import SimpleButton from '@/components/design-system/buttons/SimpleButton.vue';

export default defineComponent({
  components: { SimpleButton },
  extends: SimpleButton,
});
</script>

<script setup lang="ts">
import ButtonText from '@/components/design-system/typography/ButtonText.vue';
</script>

<template>
  <SimpleButton :tag="tag" :href="href">
    <span
      v-if="$slots.icon"
      :class="['icon', $slots.default ? 'icon--before' : null]"
    >
      <slot name="icon" />
    </span>
    <ButtonText v-if="$slots.default">
      <slot />
    </ButtonText>
    <span v-if="$slots.iconAfter" :class="['icon', 'icon--after']">
      <slot name="iconAfter" />
    </span>
  </SimpleButton>
</template>

<style scoped lang="scss">
.icon--before {
  margin-right: var(--spacing-extra-small);
}
.icon--after {
  margin-left: var(--spacing-extra-small);
}
</style>
