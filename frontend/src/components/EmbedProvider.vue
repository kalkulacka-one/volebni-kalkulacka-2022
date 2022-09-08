<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue';
import { capitalize, camelize } from 'vue';

export interface Props {
  embed?: string;
}

const props = withDefaults(defineProps<Props>(), {
  embed: undefined,
});

let importWrapper = async () => await import(`./WebProvider.vue`);

if (props.embed) {
  importWrapper = async () =>
    await import(`./embeds/${capitalize(camelize(props.embed))}Embed.vue`);
}

const Wrapper = shallowRef((await importWrapper()).default);

watchEffect(async () => {
  Wrapper.value = (await importWrapper()).default;
});
</script>

<template>
  <component :is="Wrapper" class="embed-provider">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.embed-provider {
  display: contents;
}
</style>
