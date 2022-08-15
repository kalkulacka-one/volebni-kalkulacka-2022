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
    <ButtonText>
      <slot />
    </ButtonText>
  </SimpleButton>
</template>
