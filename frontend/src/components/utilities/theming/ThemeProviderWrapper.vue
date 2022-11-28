<script setup lang="ts">
import { ref, provide } from 'vue';

import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
import { ThemeKey } from '@/components/utilities/theming/ThemeKey';

export interface Props {
  initialTheme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialTheme: 'default',
});

const selectedTheme = ref(props.initialTheme);
const switchTheme = (theme: string): string => {
  selectedTheme.value = theme;
  return selectedTheme.value;
};

provide(ThemeKey, { selected: selectedTheme, switch: switchTheme });
</script>

<template>
  <ThemeProvider :theme="selectedTheme">
    <slot />
  </ThemeProvider>
</template>
