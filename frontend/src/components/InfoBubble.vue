<script setup lang="ts">
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import { computed } from 'vue';

interface Props {
  image: string;
}

const props = withDefaults(defineProps<Props>(), {});

const imageUrl = computed(() => `/images/${props.image}`);
</script>

<template>
  <div class="test">
    <img class="image" :src="imageUrl" />
    <CardComponent corner="top-left" padding="medium">
      <slot />
    </CardComponent>
  </div>
</template>

<style scoped lang="scss">
.test {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.image {
  position: relative;
  bottom: -8px;
  width: 82px;
  height: 82px;
}
</style>
