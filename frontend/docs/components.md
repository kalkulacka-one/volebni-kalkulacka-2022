# Components

## Design system functional components

Functional components are components with no state which are styled according to the design system and used to compose higher level components.

Those components live in `@/components/design-system/:category/ComponentName.vue` SFC files.

A minimal component may look like this:

```vue
<!-- Script setup section, using TypeScript -->
<script setup lang="ts">
// Imports
import { computed } from 'vue';

// Props (interface) definition
export interface Props {
  padding?: boolean;
  paddingSize?: 'small' | 'large';
  background?: string;
}

// Default props definition
const props = withDefaults(defineProps<Props>(), {
  padding: false,
  paddingSize: 'small',
  background: 'rgb(var(--color-neutral-bg-container))',
});

// Bind props to classes
const classes = computed(() => ({
  [`container--padding-${props.paddingSize}`]: props.padding,
}));
</script>

<!-- // Template -->
<template>
  <div :class="['container', classes]">
    <slot />
  </div>
</template>

<!-- // Scoped styles in SCSS -->
<style scoped lang="scss">
// Top-level element class
.container {
  background-color: v-bind(background);
  
  // BEM-like two hyphen, nested syntax for variants
  &--padding-small {
    padding: var(--spacing-small);
  }
  &--padding-large {
    padding: var(--spacing-large);
  }
}
</style>
```
