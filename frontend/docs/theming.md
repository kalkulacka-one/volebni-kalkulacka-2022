# Theming

## How to use themes

To use a theme in your components, just use the CSS variables defined in the [theme](../src/components/themes/DefaultTheme.scss).

Be cautious to use the semantic variables when appropriate, not the hardcoded values.

## Themes

Themes are actually Vue components which define CSS variables. Themes live in `@/components/themes` folder. Each theme has to be named in TitleCase and end with Theme, e.g. `BlueExampleTheme.vue`.

## Theme provider

The app is wrapped in a [theme provider](../src/components/ThemeProvider.vue) component, which provides the currently selected theme (= CSS variables) to all other components nested within the provider.

To set the initial theme, you can provide it with an `initial-theme` prop.

### Theme switcher

The theme provider also provides a method to switch themes. To switch the theme, you need to inject the variable and call switch method provided with the snake-cased theme name:

```typescript
import { inject } from 'vue';
import { ThemeKey } from './ThemeKey';

const theme = inject(ThemeKey);

theme.switch('blue-example');
```
