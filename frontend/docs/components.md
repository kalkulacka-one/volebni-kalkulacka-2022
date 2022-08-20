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
  padding?: 'small' | 'large';
  background?: string;
}

// Default props definition
const props = withDefaults(defineProps<Props>(), {
  padding: undefined,
  background: 'rgb(var(--color-neutral-bg-container))',
});

// Bind props to classes
const classes = computed(() => ({
  [`padding--${props.padding}`]: props.padding,
}));
</script>

<!-- // Template -->
<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<!-- // Scoped styles in SCSS -->
<style scoped lang="scss">
// No need for any special classes as we are using scoped CSS
div {
  background-color: v-bind(background);
}

// Class name should match prop name
.padding {
  // BEM-like two hyphen, nested syntax for variants
  &--small {
    padding: var(--spacing-small);
  }
  &--large {
    padding: var(--spacing-large);
  }
}
</style>
```
