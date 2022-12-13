# Responsivity

Responsivity is implemented on three levels:

- CSS variables,
- conditionally-rendered components and
- media queries within pages.

Never use media queries within a (presententational) component (with the exception when the component is always screen-wide): the component itself doesn't know the context it is in. Sometimes you want the same component to behave differently in different places, altough on the same screen (and therefore the same media query).

## How to use responsivity

### Using responsive CSS variables

Semantic sizing & spacing CSS variables (see [sizing & spacing section](./theming.md#sizing--spacing) in theming docs) always have its responsive variant defined (prefixed with `responsive-`, e.g. `--responsive-gap-small`).

You should almost always use responsive variables. Those variables have defined different values for different breakpoints, therefore _magically_ make all components a little responsive. For example a large padding for a large screens automatically changes to small on mobile.

### Controlling what is rendered at which breakpoints

Use the responsive wrapper component ([`@/components/utilities/ResponsiveWrapper.vue`](../src/components/utilities/ResponsiveWrapper.vue)) to control which components are visible at which breakpoints.

By default, everything wrapped in the renderless (`display: contents;`) component is hidden at all breakpoints. To show it at the specific [breakpoints](#breakpoints), just add props:

```vue
<script setup lang="ts">
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
</script>

<template>
  <ResponsiveWrapper extra-small small>
    <p>I'm visible only up to small breakpoint (768 px).</p>
  </ResponsiveWrapper>
</template>
```

## Breakpoints

Breakpoints are defined in [`@/assets/breakpoints.scss`](../src/assets/breakpoints.scss) and imported via SCSS when needed:

```vue
<style lang="scss" scoped>
@import '@/assets/breakpoints.scss';
</style>
```

There are 5 horizontal breakpoints dividing the screen into 6 sections:

- extra small (• < 576 px)
- small (576 px <= • < 768 px)
- medium (768 px <= • < 992 px)
- large (992 px <= • < 1200 px)
- extra-large (1200 px <= • < 1400 px)
- huge (1400 px <= •)

However not all values/queries across all breakpoints have to differ.
