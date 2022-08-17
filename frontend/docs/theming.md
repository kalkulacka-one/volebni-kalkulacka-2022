# Theming

## How to use themes

To use a theme in your components, just use the CSS variables defined in the [theme](../src/components/themes/DefaultTheme.scss):

- spacings
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

## Themes

Themes are actually Vue components which define CSS variables. Themes live in `@/components/themes` folder. Each theme has to be named in TitleCase and end with Theme, e.g. `BlueExampleTheme.vue`.

## Theme provider

The app is wrapped in a [theme provider](../src/components/ThemeProvider.vue) component, which provides the theme (= CSS variables) set by the `theme` prop to all other components nested within the provider.

### Theme provider wrapper & switcher

The [theme provider wrapper component](../src/components/ThemeProviderWrapper.vue) also manages a state and provides a method to switch themes. To set the initial theme, you can provide it with an `initial-theme` prop.

To switch the theme, you need to inject the variable and call switch method provided with the snake-cased theme name:

```typescript
import { inject } from 'vue';
import { ThemeKey } from './ThemeKey';

const theme = inject(ThemeKey);

theme.switch('blue-example');
```
