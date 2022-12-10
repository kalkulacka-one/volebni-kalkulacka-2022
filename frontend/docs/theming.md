# Theming

## How to use a theme in components

To use a theme in your components, just use the CSS variables defined in the theme ([`@/components/themes/DefaultTheme.scss`](../src/components/themes/DefaultTheme.scss)):

- sizings & spacings
- radiuses
- color palette, transparency tokens & semantic colors
- typography tokens (font family, size and line height)

Colors are defined as RGB values, therefore to use it in CSS, you have to wrap it in `rgb()`:

```css
color: rgb(var(--color-primary-fg));
```

You can easily combine it with transparency:

```css
color: rgba(var(--color-primary-fg), var(--transparency-10));
```

Always use tokens for sizing, colors and typography, never hardcoded values. Also be cautious to use the semantic variables when appropriate, not the palette values.

### Sizing & spacing tokens

Various sizing & spacing tokens are defined in the default theme ([`@/components/themes/DefaultTheme.scss`](../src/components/themes/DefaultTheme.scss)). Almost always use the semantic tokens, and the [responsive ones](./responsivity.md#using-responsive-css-variables), not the base values. Base values are derived from the base font size set in [`@/assets/main.css`](../src/assets/main.css).

To use a sizing token within a component, simply use the CSS variable:

```vue
<style lang="scss" scoped>
.my-awesome-container {
  padding: var(--responsive-gap-large);
}
</style>
```

The semantic variables have also types defined in [`@/components/design-system/configurations/sizing-and-spacing.ts`](../src/components/design-system/configurations/sizing-and-spacing.ts), which should be used when a variable is used as a prop in a component:

```vue
<script setup lang="ts">
import type { Gap } from '@/components/design-system/configurations/sizing-and-spacing';

export interface Props {
  padding: Gap;
}

defineProps<Props>();
</script>
```

In case you want to restrict the allowed values, simply list them as an intersection type:

```vue
<script setup lang="ts">
import type { Gap } from '@/components/design-system/configurations/sizing-and-spacing';

export interface Props {
  padding: Gap & ('medium' | 'large');
}

defineProps<Props>();
</script>
```

## Themes

Themes are actually Vue components which define CSS variables. Themes live in `@/components/themes` folder.

To create a new theme, simply create a new file in `@/components/themes/MyAwesomeTheme.vue` (filename always has to end with `Theme` and be CamelCased):

```vue
<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss" scoped src="@/components/themes/MyAwesomeTheme.scss" />
```

and `@/components/themes/MyAwesomeTheme.scss` file, then import the default theme and override any of the CSS variables you want, for example:

```scss
@import '@/components/themes/DefaultTheme.scss';

*:deep() {
  // Override any of the default theme variables here

  // Color palette
  // -------------
  // Primary colors
  --palette-primary-10: 0, 14, 30;
  --palette-primary-30: 1, 43, 93;
  --palette-primary-50: 8, 65, 133;
  --palette-primary-70: 44, 103, 174;
  --palette-primary-90: 141, 181, 228;
}
```

In case you also want to change the background color, it is unfortunately not possible to use the theme CSS variable here. You have to add the following definition on top of the `@/components/themes/MyAwesomeTheme.vue` file:

```vue
<script setup lang="ts">
const body = document.querySelector('body');
if (body != null) {
  body.style.backgroundColor = 'rgb(248, 247, 247)';
}
</script>
```

## Theme provider

The app is wrapped in a theme provider component ([`@/components/utilities/theming/ThemeProvider.vue`](../src/components/utilities/theming/ThemeProvider.vue)), which provides the theme (= CSS variables) set by the `theme` prop to all other components nested within the provider. It also adds `theme-provider` and `theme-provider--my-awesome-theme` classes to the renderless (`display: contents;`) wrapper.

### Theme provider wrapper & switcher

The theme provider wrapper component ([`@/components/utilities/theming/ThemeProviderWrapper.vue`](../src/components/utilities/theming/ThemeProviderWrapper.vue)) component also manages a state and provides a method to switch themes. To set the initial theme, you can provide it with an `initial-theme` prop.

To switch the theme, you need to inject the variable and call switch method provided with the snake-cased theme name:

```vue
<script setup lang="ts">
import { inject } from 'vue';

import { ThemeKey } from '@/components/utilities/theming/ThemeKey';

const theme = inject(ThemeKey);

theme.switch('my-awesome-theme');
</script>
```
