# Embedding

Volební kalkulačka is optimized for embedding to other websites by design. Thanks to [theming](theming.md), it is possible to easily customize the design. This also means you have to be cautious about which elements should be visible in embeds.

## How to use embeds

To create an embed, create a new file in `@/components/embeds/MyAwesomeEmbed.vue` (filename always has to end with `Embed` and be CamelCased):

```vue
<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider>
    <router-view />
  </ThemeProvider>
</template>
```

Then add `?embed=my-awesome-embed` URL parameter.

### Embed theming

To theme an embed, simply create a new [theme](theming.md) in `@/themes` and submit it as an attribute to the theme provider in the embed component:

```vue
<script setup lang="ts">
import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';
</script>

<template>
  <ThemeProvider theme="my-awesome-embed">
    <slot />
  </ThemeProvider>
</template>
```

You can either use an existing or new theme, usually named the same as the embed.

### Controlling what is rendered in an embed

Use the embed wrapper component to control which components are visible either in embeds (or a specific one) or on the web. Everything not wrapped in the embed wrapper will be rendered on both.

To hide something from all embeds, simply wrap it in the embed wrapper:

```vue
<script setup lang="ts">
import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
</script>

<template>
  <EmbedWrapper>
    <p>I'm visible only on the web.</p>
  </EmbedWrapper>
</template>
```

To show something only in all embeds, add the `embed` attribute:

```vue
<script setup lang="ts">
import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
</script>

<template>
  <EmbedWrapper embed>
    <p>I'm visible only in all embeds.</p>
  </EmbedWrapper>
</template>
```

To show something only in a specific embed, add the embed snake-cased name as the `embed` attribute:

```vue
<script setup lang="ts">
import EmbedWrapper from '@/components/utilities/embedding/EmbedWrapper.vue';
</script>

<template>
  <EmbedWrapper embed="my-awesome-embed">
    <p>I'm visible only in a specific embed.</p>
  </EmbedWrapper>
</template>
```

For more advanced cases, you can inject the embed key and use it as a variable:

```vue
<script setup lang="ts">
import { inject } from 'vue';

import { EmbedKey } from '@/components/utilities/embedding/EmbedKey';

const currentEmbed = inject(EmbedKey);
</script>
```

## Embeds

Embeds work very similarly to the [theming](theming.md).

### Embed provider

Embed provider ([`@/components/utilities/embedding/EmbedProvider.vue`](../src/components/utilities/embedding/EmbedProvider.vue)) is a renderless (`display: contents;`) component which lazy-loads the wrapper component from `@/embeds` folder if provided by the `embed` prop or the ([`@/components/utilities/embedding/WebProvider.vue`](../src/components/utilities/embedding/WebProvider.vue) component if not. It also adds `embed-provider` and `embed-provider--web-provider` or `embed-provider--my-awesome-embed` classes to the wrapper.

### Embed provider wrapper

Embed provider wrapper ([`@/components/utilities/embedding/EmbedProviderWrapper.vue`](../src/components/utilities/embedding/EmbedProviderWrapper.vue)) loads the embed name from `embed` URL parameter and also sets the injection key, similar to the [theme provider wrapper](theming.md#theme-provider-wrapper--switcher) component.

### Embed wrapper

Embed wrapper ([`@/components/utilities/embedding/EmbedWrapper.vue`](../src/components/utilities/embedding/EmbedWrapper.vue)) loads whether embed is used (and which) or not and then shows or hides the content.

It also wraps the content with a div (also renderless) with `embed-wrapper` and `embed-wrapper--snake-cased-name` classes.
