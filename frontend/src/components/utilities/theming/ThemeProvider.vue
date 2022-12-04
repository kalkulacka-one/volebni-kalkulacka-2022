<script setup lang="ts">
import {
  camelize,
  capitalize,
  computed,
  defineAsyncComponent,
  shallowRef,
  watch,
} from 'vue';

export interface Props {
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
});

const importTheme = (theme: string) =>
  import(`../../themes/${capitalize(camelize(theme))}Theme.vue`);

const Theme = shallowRef(defineAsyncComponent(() => importTheme(props.theme)));
const classes = computed(() => [`theme-provider--${props.theme}-theme`]);

watch(props, () => {
  Theme.value = defineAsyncComponent(() => importTheme(props.theme));
});
</script>

<template>
  <component :is="Theme" :class="['theme-provider', classes]">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.theme-provider {
  display: contents;
}
</style>
