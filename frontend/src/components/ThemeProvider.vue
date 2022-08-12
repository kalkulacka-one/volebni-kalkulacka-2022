<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue';
import { capitalize, camelize } from 'vue';

export interface Props {
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
});

const importTheme = async () =>
  await import(`./themes/${capitalize(camelize(props.theme))}Theme.vue`);

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
