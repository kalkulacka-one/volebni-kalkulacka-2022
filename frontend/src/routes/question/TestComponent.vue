<script setup lang="ts">
import { inject } from 'vue';
import { ToggleKey } from '@/components/design-system/containers/AccordionKey';

const toggleAccordion = inject(ToggleKey);

console.log('toggle', toggleAccordion);
</script>

<template>
  <div>test</div>
</template>
