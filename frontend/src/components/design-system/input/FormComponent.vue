<script setup lang="ts">
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';

export interface Props {
  success?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  success: null,
});
</script>

<template>
  <form>
    <CardComponent
      corner="top-left"
      spacing="medium"
      border
      border-radius="medium"
      shadow
    >
      <StackComponent spacing="medium" centered>
        <slot />

        <BodyText
          v-if="success"
          size="medium"
          color="rgb(var(--palette-green-50))"
        >
          {{ success }}
        </BodyText>
      </StackComponent>
    </CardComponent>
  </form>
</template>

<style scoped lang="scss"></style>
