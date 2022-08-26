<script setup lang="ts">
const props = defineProps<{
  size: 'small' | 'medium' | 'large';
  imageUrl: string;
  alt: string;
}>();
</script>

<template>
  <img :class="`avatar ${props.size}`" :src="props.imageUrl" :alt="props.alt" />
</template>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;

  background-color: rgb(var(--palette-neutral-70));
}

.small {
  width: var(--avatar-size-small);
  height: var(--avatar-size-small);
}

.medium {
  width: var(--avatar-size-medium);
  height: var(--avatar-size-medium);
}

.large {
  width: var(--avatar-size-large);
  height: var(--avatar-size-large);
}
</style>
