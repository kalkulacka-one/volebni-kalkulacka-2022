<script setup lang="ts">
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';

export interface Props {
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  kind: 'title' | 'headline';
  size: 'small' | 'medium' | 'large';
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <component :is="tag" class="heading">
    {{ size }} {{ kind }}
    <HeadlineText :tag="'span'" :size="size">
      <slot />
    </HeadlineText>
    <HeadlineText :tag="'span'" :size="size">
      <slot name="secondary" />
    </HeadlineText>
  </component>
</template>
