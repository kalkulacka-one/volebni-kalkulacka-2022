<script setup lang="ts">
import { ref, shallowRef, provide, watchEffect } from 'vue';
import { capitalize, camelize } from 'vue';
import { ThemeKey } from '@/components/ThemeKey';

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

const importTheme = async () =>
  await import(
    `./themes/${capitalize(camelize(selectedTheme.value))}Theme.vue`
  );

const Theme = shallowRef((await importTheme()).default);

watchEffect(async () => {
  Theme.value = (await importTheme()).default;
});
</script>

<template>
  <component :is="Theme">
    <slot />
  </component>
</template>
