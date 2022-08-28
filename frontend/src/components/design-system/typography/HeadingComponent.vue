<script setup lang="ts">
import HeadlineText from '@/components/design-system/typography/HeadlineText.vue';

export interface Props {
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  kind: 'title' | 'headline';
  size: 'extra-small' | 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  kind: 'headline',
  size: 'extra-small',
});
</script>

<template>
  <component :is="tag">
    <HeadlineText :tag="props.tag" :size="props.size">
      <slot />
    </HeadlineText>
    <HeadlineText
      :tag="props.tag"
      :size="props.size"
      :color="'rgb(var(--color-neutral-fg))'"
    >
      <slot name="secondary" />
    </HeadlineText>
  </component>
</template>
