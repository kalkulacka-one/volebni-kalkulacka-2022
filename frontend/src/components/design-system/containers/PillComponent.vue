<script setup lang="ts">
import LabelText from '@/components/design-system/typography/LabelText.vue';

export interface Props {
  active?: boolean;
}

withDefaults(defineProps<Props>(), {
  active: false,
});
</script>

<template>
  <LabelText>
    <slot />
  </LabelText>
</template>
