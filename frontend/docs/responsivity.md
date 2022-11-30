# Responsivity

## How to use responsivity

### Controlling what is rendered at which breakpoints

Use the responsive wrapper component ([`@/components/utilities/ResponsiveWrapper.vue`](../src/components/utilities/ResponsiveWrapper.vue)) to control which components are visible at which breakpoints.

By default, everything wrapped in the renderless (`display: contents;`) component is hidden at all breakpoints. To show it at the specific breakpoints, just add props:

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
