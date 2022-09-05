<script setup lang="ts">
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';
import IconButton from '../../components/design-system/input/IconButton.vue';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import { mdiArrowLeft } from '@mdi/js';
import TitleText from '../../components/design-system/typography/TitleText.vue';
defineProps<{
  onBack: () => void;
}>();
</script>

<template>
  <ContainerComponent class="navigation-bar" padding="medium">
    <div class="grid">
      <IconButton class="back-btn" @click="onBack">
        <IconComponent
          :icon="mdiArrowLeft"
          color="rgb(var(--color-neutral-fg))"
          size="medium"
          title="back"
        ></IconComponent>
      </IconButton>
      <TitleText class="title" tag="h2" size="large">Moje shoda</TitleText>
    </div>
  </ContainerComponent>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 1fr;
}
.back-btn {
  justify-self: left;
}
.title {
  justify-self: left;
  margin-left: var(--spacing-medium);
  margin-right: var(--spacing-medium);
}
</style>
